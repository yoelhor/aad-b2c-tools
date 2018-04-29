
import * as vscode from 'vscode';

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
		const wordPosition = document.getWordRangeAtPosition(position);
		if (!wordPosition) return new Promise((resolve) => resolve());
		const word = document.getText(wordPosition);

		var nsAttr = doc.getElementById(word.toLowerCase());

		// Workaround for separated word with dash (-)
		if (nsAttr == null) {
			const line = document.lineAt(position.line).text;

			const startWord = line.lastIndexOf('"', wordPosition.start.character);

			if (startWord >= 0) {
				const endWord = line.indexOf('"', wordPosition.end.character);
				const newWord = line.substring(startWord + 1, endWord);

				nsAttr = doc.getElementById(newWord.toLowerCase());
			}
		}

		if (nsAttr != null) {
			return new Promise(resolve => {
				resolve(new vscode.Location(
					document.uri,
					new vscode.Position(nsAttr.lineNumber - 1, nsAttr.columnNumber)));;
			});
		}
		else {
			return new Promise((resolve) => resolve());

			/*return new Promise(resolve => {
				null;
				});
			
				return new Promise(resolve => {
					resolve(new vscode.Location(
						null, 
						null));;
				});*/
		}
	}
}
