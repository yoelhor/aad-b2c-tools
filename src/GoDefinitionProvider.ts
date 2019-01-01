
import * as vscode from 'vscode';
import { ReferenceProvider } from './ReferenceProvider';
import { FileData } from './ReferenceProvider';
import fs = require('fs');
const DOMParser = require('xmldom').DOMParser;

export default class GoDefinitionProvider implements vscode.DefinitionProvider {

	public provideDefinition(
		document: vscode.TextDocument,
		position: vscode.Position,
		token: vscode.CancellationToken): Thenable<vscode.Definition> {

		return this.provideDefinitionExt(document, position, token, false);
	}

	public provideDefinitionExt(
		document: vscode.TextDocument,
		position: vscode.Position,
		token: vscode.CancellationToken,
		showAll: boolean): Thenable<vscode.Definition> {

		// Get the selected word
		var selectedWord: SelectedWord = new SelectedWord();
		selectedWord.Value = ReferenceProvider.getSelectedWord(document, position).toLowerCase();

		if (selectedWord.Value.length == 0)
			return new Promise((resolve) => resolve());

		var xmlDoc = new DOMParser().parseFromString(document.getText());
		var nodeList = xmlDoc.getElementsByTagName("*");

		// Try to get the XML element in the selected range
		for (var i = 0; i < nodeList.length; i++) {
			var node = nodeList[i];

			// TBD: check the column as well
			if (node.lineNumber == (position.line + 1)) {
				selectedWord.ElementType = node.nodeName;

				let parentNode = node;
				// If the element is ClaimsProviderSelection try to find its parent Id
				if (selectedWord.ElementType === "ClaimsProviderSelection") {
					while (parentNode) {
						if (parentNode.hasAttribute("Id")) {
							selectedWord.ParentID = parentNode.getAttribute("Id");
							selectedWord.ParentElementType = parentNode.nodeName;

							break;
						}

						if (parentNode && parentNode.parentNode)
							parentNode = parentNode.parentNode;
					}
				}
				break;
			}
		}


		var files: FileData[] = [];

		// Add the selected file while skipping the deployment output environments files 
		if (document.uri.fsPath.toLowerCase().indexOf("/environments/") == (-1)) {
			files.push(new FileData(document.uri, document.getText().replace(/( )(Id=|Id =|Id  =)/gi, " id=")));
		}

		// Add the rest of open files
		for (const doc of vscode.workspace.textDocuments) {

			// Skip deployment output environments files 
			if (doc.uri.fsPath.toLowerCase().indexOf("/environments/")) continue;

			// Skip selected file
			if (doc.uri != document.uri && doc.uri.scheme != "git")
				files.push(new FileData(doc.uri, doc.getText().replace(/( )(Id=|Id =|Id  =)/gi, " id=")))
		}

		// Run this code only if user open a directory workspace
		if (vscode.workspace.rootPath) {

			var promise = vscode.workspace.findFiles(new vscode.RelativePattern(vscode.workspace.rootPath as string, '*.{xml}'))
				.then((uris) => {
					uris.forEach((uri) => {
						if (uri.fsPath.indexOf("?") <= 0) {
							// Check if the file is open. If yes, take precedence over the saved version
							var openedFile = files.filter(x => x.Uri.fsPath == uri.fsPath)

							if (openedFile == null || openedFile.length == 0) {
								var data = fs.readFileSync(uri.fsPath, 'utf8');
								files.push(new FileData(uri, data.toString().replace(/( )(Id=|Id =|Id  =)/gi, " id=")));
							}
						}
					});
				}).then(() => {
					return this.processSearch(selectedWord, document, files, position, showAll);
				});

			return promise;
		}
		else {
			return this.processSearch(selectedWord, document, files, position, showAll);
		}
	}

	private processSearch(
		selectedWord: SelectedWord,
		document: vscode.TextDocument,
		files: FileData[],
		position: vscode.Position,
		showAll: boolean): Thenable<vscode.Location[]> {

		// Load the ativated XML file and replace the element Id with id
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
		var locations: vscode.Location[] = [];

		if (!showAll)
			hierarchyFiles = this.getHierarchy(files, files[0], hierarchyFiles, 1);
		else
			hierarchyFiles = files;

		// Iterate through files array
		for (const file of hierarchyFiles) {
			var xmlDoc = new DOMParser().parseFromString(file.Data.toLowerCase());

			// Search for TrustFrameworkPolicy with PolicyId equals to the selected word
			if (selectedWord.ElementType == "PolicyId") {

				var docLookupList = xmlDoc.getElementsByTagName("trustframeworkpolicy");
				if (docLookupList.length == 1 && docLookupList[0].getAttribute("policyid") == selectedWord.Value) {
					var location = new vscode.Location(file.Uri, new vscode.Position(docLookupList[0].lineNumber, docLookupList[0].columnNumber));

					// Return the selected element
					locations.push(location);
					if (!showAll) { return new Promise(resolve => { resolve(locations);; }); }
				}
			}
			// Search for ClaimsProviderSelection we need to search for ClaimsExchange with the same Id within the scope of the UserJourney  
			else if (selectedWord.ElementType == "ClaimsProviderSelection") {

				// The ClaimsExchange is always in the same document
				if (file.Uri != document.uri)
					continue;

				var docLookupList = xmlDoc.getElementsByTagName("userjourney");

				for (var i = 0; i < docLookupList.length; i++) {
					if (docLookupList[i].getAttribute("id") === selectedWord.ParentID.toLowerCase()) {


						var nodeList = docLookupList[i].getElementsByTagName("*");

						for (var i2 = 0; i2 < nodeList.length; i2++) {
							if (nodeList[i2].getAttribute("id") === selectedWord.Value.toLowerCase()) {

								// Return the selected element
								var location = new vscode.Location(file.Uri, new vscode.Position(nodeList[i2].lineNumber, nodeList[i2].columnNumber));
								locations.push(location);
								if (!showAll) { return new Promise(resolve => { resolve(locations);; }); }

								break;
							}
						}

						break;
					}
				}


			}
			// Search for element with such ID
			else {

				var nsAttr = xmlDoc.getElementById(selectedWord.Value.toLowerCase());

				// If element found and it's not the same element the user pointing (same file and same line)
				if (nsAttr != null &&
					!(file.Uri === document.uri && (nsAttr.lineNumber == position.line || nsAttr.lineNumber - 1 == position.line)) &&
					!(showAll && nsAttr.tagName == "claimsexchange")) // this element has multiple instances under different user journeys 
				{

					var location = new vscode.Location(file.Uri, new vscode.Position(nsAttr.lineNumber, nsAttr.columnNumber));

					// Return the selected element
					locations.push(location);
					if (!showAll) { return new Promise(resolve => { resolve(locations);; }); }
				}
			}
		}

		if (showAll) {
			return new Promise(resolve => {
				resolve(locations);;
			});
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

export class SelectedWord {
	public Value: string;
	public ElementType: string;
	public ParentID: string;
	public ParentElementType: string;
}