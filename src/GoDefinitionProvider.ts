
import * as vscode from 'vscode';
import { ReferenceProvider } from './ReferenceProvider';
import { FileData } from './ReferenceProvider';

export default class GoDefinitionProvider implements vscode.DefinitionProvider {

	public provideDefinition(
		document: vscode.TextDocument,
		position: vscode.Position,
		token: vscode.CancellationToken): Thenable<vscode.Location> {

		// Load the ativated XML file and replace the element Id with id
		var DOMParser = require('xmldom').DOMParser;

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

		// Iterate through files array
		for (const file of files) {

			var xmlDoc = new DOMParser().parseFromString(file.Data.toLowerCase());

			// Search for element with such ID
			var nsAttr = xmlDoc.getElementById(word.toLowerCase());

			// If element found and it's not the same element the user pointing (same file and same line)
			if (nsAttr != null && 
				!(file.Uri === document.uri && (nsAttr.lineNumber == position.line || nsAttr.lineNumber - 1 == position.line))) {
				
					// Return the selected element
				return new Promise(resolve => {
					resolve(new vscode.Location(
						file.Uri,
						new vscode.Position(nsAttr.lineNumber - 1, nsAttr.columnNumber)));;
				});
			}
		}

		// Return no found (null)
		return new Promise((resolve) => resolve());
	}
}
