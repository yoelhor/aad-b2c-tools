
import * as vscode from 'vscode';
import { ReferenceProvider } from './ReferenceProvider';

export default class GoDefinitionProvider implements vscode.DefinitionProvider {

	public provideDefinition(
		document: vscode.TextDocument,
		position: vscode.Position,
		token: vscode.CancellationToken): Thenable<vscode.Location> {

		// Load the ativated XML file and replace the element Id with id
		var DOMParser = require('xmldom').DOMParser;
		var xmlText = document.getText().replace(/( )(Id=|Id =|Id  =)/gi, " id=");
		var doc = new DOMParser().parseFromString(xmlText.toLowerCase());

		// Get the selected word
		const word = ReferenceProvider.getSelectedWord(document, position);

		if (word.length == 0)
			return new Promise((resolve) => resolve());

		// Search for element with such ID
		var nsAttr = doc.getElementById(word.toLowerCase());

		if (nsAttr != null) {
			// Return the selected element
			return new Promise(resolve => {
				resolve(new vscode.Location(
					document.uri,
					new vscode.Position(nsAttr.lineNumber - 1, nsAttr.columnNumber)));;
			});
		}
		else {
			// Return no found (null)
			return new Promise((resolve) => resolve());
		}
	}
}
