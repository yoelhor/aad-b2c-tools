
import * as vscode from 'vscode';
import { ReferenceProvider } from './ReferenceProvider';
import { FileData } from './ReferenceProvider';
import fs = require('fs');

export default class GoDefinitionProvider implements vscode.DefinitionProvider {

	public provideDefinition(
		document: vscode.TextDocument,
		position: vscode.Position,
		token: vscode.CancellationToken): Thenable<vscode.Definition> {

		// Get the selected word
		const word = ReferenceProvider.getSelectedWord(document, position);

		if (word.length == 0)
			return new Promise((resolve) => resolve());


		var files: FileData[] = [];

		// Add the selected file
		files.push(new FileData(document.uri, document.getText().replace(/( )(Id=|Id =|Id  =)/gi, " id=")));

		// Add the rest of open files
		for (const doc of vscode.workspace.textDocuments) {

			// Skip selected file
			if (doc.uri != document.uri)
				files.push(new FileData(doc.uri, doc.getText().replace(/( )(Id=|Id =|Id  =)/gi, " id=")))
		}

		// Run this code only if user open a directory workspace
		if (vscode.workspace.rootPath) {

			var promise = vscode.workspace.findFiles(new vscode.RelativePattern(vscode.workspace.rootPath as string, '{**/*.xml}'))
				.then((uris) => {
					uris.forEach((uri) => {

						// Check if the file is open. If yes, take precedence over unsaved version
						var openedFile = files.filter(x => x.Uri.fsPath == uri.fsPath)

						if (openedFile == null || openedFile.length == 0) {
							var data = fs.readFileSync(uri.fsPath, 'utf8');
							files.push(new FileData(uri, data.toString().replace(/( )(Id=|Id =|Id  =)/gi, " id=")));
						}
					});
				}).then(() => {
					return this.processSearch(word, document, files, position);
				});

			return promise;
		}
		else {
			return this.processSearch(word, document, files, position);
		}
	}

	private processSearch(
		word: String,
		document: vscode.TextDocument,
		files: FileData[],
		position: vscode.Position): Thenable<vscode.Location[]> {

		// Load the ativated XML file and replace the element Id with id
		var DOMParser = require('xmldom').DOMParser;
		var hierarchyFiles: FileData[] = [];

		for (var i = 0; i < files.length; i++) {
			var xmlDoc = new DOMParser().parseFromString(files[i].Data.toLowerCase());
			var trustFrameworkPolicyElement = xmlDoc.getElementsByTagName("TrustFrameworkPolicy".toLowerCase());

			if (trustFrameworkPolicyElement.length == 1) {
				files[i].Policy = trustFrameworkPolicyElement[0].getAttribute("policyid");
			}

			var basePolicyElement = xmlDoc.getElementsByTagName("BasePolicy".toLowerCase());
			if (basePolicyElement.length == 1) {

				var policyid = basePolicyElement[0].getElementsByTagName("policyid");
				if (policyid.length == 1) {

					files[i].ParentPolicy = policyid[0].textContent;
				}
			}
		}

		hierarchyFiles = this.getHierarchy(files, files[0], hierarchyFiles, 1);

		// Iterate through files array
		for (const file of hierarchyFiles) {

			var xmlDoc = new DOMParser().parseFromString(file.Data.toLowerCase());

			// Search for element with such ID
			var nsAttr = xmlDoc.getElementById(word.toLowerCase());

			// If element found and it's not the same element the user pointing (same file and same line)
			if (nsAttr != null &&
				!(file.Uri === document.uri && (nsAttr.lineNumber == position.line || nsAttr.lineNumber - 1 == position.line))) {

				var location = new vscode.Location(
					file.Uri,
					new vscode.Position(nsAttr.lineNumber - 1, nsAttr.columnNumber));
				
				var locations: vscode.Location[] = [];
				locations.push(location);

				// Return the selected element
				return new Promise(resolve => {
					resolve(locations);;
				});
			}
		}


		// Return no found (null)
		return new Promise((resolve) => resolve());
	}

	private getHierarchy(files: FileData[], file: FileData, hierarchyFiles: FileData[], level: number): FileData[] {

		if (level == 1) {
			file.Level = level;
			hierarchyFiles.push(file);
		}

		var paretnPolicy: FileData[] = files.filter(x => x.Policy == file.ParentPolicy);

		if (paretnPolicy != null && paretnPolicy.length > 0) {
			level++;
			paretnPolicy[0].Level = level;
			hierarchyFiles.push(paretnPolicy[0]);

			hierarchyFiles = this.getHierarchy(files, paretnPolicy[0], hierarchyFiles, level);
		}

		return hierarchyFiles.sort(x => x.Level).reverse();
	}
}
