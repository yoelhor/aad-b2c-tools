import * as vscode from 'vscode';

export class ReferenceProvider implements vscode.ReferenceProvider {
    private files: vscode.Uri[] =[];

    public provideReferences(
        document: vscode.TextDocument, position: vscode.Position,
        options: { includeDeclaration: boolean }, token: vscode.CancellationToken):
        Thenable<vscode.Location[] | null> {

        var promise = vscode.workspace.findFiles(new vscode.RelativePattern(vscode.workspace.rootPath as string, '{**/*.xml}')).then((res) => {
            this.files = res;
            return this.processSearch(document, position);
        });

        return promise;
    }

    private processSearch(
        document: vscode.TextDocument,
        position: vscode.Position): Thenable<vscode.Location[] | null> {

        var DOMParser = require('xmldom').DOMParser;
        let promises_array: Array<any> = [];
        let list: vscode.Location[] = [];
        var fs = require('fs');

        for (const file of this.files) {
            promises_array.push(new Promise((resolve: any) => fs.readFile(file.fsPath, 'utf8', function (err: any, data: any) {
                resolve(new FileData(file, data));
            })));

        }

        // Get the selected word
        const wordPosition = document.getWordRangeAtPosition(position);
        if (!wordPosition) return new Promise((resolve) => resolve());
        const word = document.getText(wordPosition).toLowerCase();


        // Workaround for separated word with dash (-)
        const line = document.lineAt(position.line).text;
        const startWord = line.lastIndexOf('"', wordPosition.start.character);
        const endWord = line.indexOf('"', wordPosition.end.character);
        const newWord = line.substring(startWord + 1, endWord).toLowerCase();

        return Promise.all(promises_array)
            .then((files: any) => {

                for (let file of files) {
                    var data = file.Data.replace(/( )(Id=|Id =|Id  =)/gi, " id=");
                    var doc = new DOMParser().parseFromString(data.toLowerCase());

                    this.searchElement(doc, list, file.Uri, "TechnicalProfile", "Id", word, newWord);
                    this.searchElement(doc, list, file.Uri, "ValidationTechnicalProfile", "ReferenceId", word, newWord);
                    this.searchElement(doc, list, file.Uri, "ClaimsExchange", "TechnicalProfileReferenceId", word, newWord);
                    this.searchElement(doc, list, file.Uri, "UseTechnicalProfileForSessionManagement", "ReferenceId", word, newWord);
                    this.searchElement(doc, list, file.Uri, "IncludeTechnicalProfile", "ReferenceId", word, newWord);

                    this.searchElement(doc, list, file.Uri, "OutputClaim", "ClaimTypeReferenceId", word, newWord);
                    this.searchElement(doc, list, file.Uri, "InputClaim", "ClaimTypeReferenceId", word, newWord);
                    this.searchElement(doc, list, file.Uri, "Value", null, word, newWord);
                }

                if (list.length > 0)
                    return Promise.resolve(list);
                else
                    return Promise.resolve(null);
            });
    }

    private searchElement(
        doc: any,
        list: vscode.Location[],
        uri: vscode.Uri,
        elementTagName: string,
        elementAttribute: string | null,
        word1: string,
        word2: string) {

        elementTagName = elementTagName.toLowerCase();

        if (elementAttribute != null)
            elementAttribute = elementAttribute.toLowerCase();

        var elements = doc.getElementsByTagName(elementTagName);

        var i: number;
        for (i = 0; i < elements.length; i++) {

            const element = elements[i];
            // If search returns items, add the items to the location arry
            if (element != null &&
                ((elementAttribute != null && (element.getAttribute(elementAttribute) === word1 || element.getAttribute(elementAttribute) === word2)) ||
                (elementAttribute === null && (element.textContent === word1 || element.textContent === word2)))) {
                let start: vscode.Position = new vscode.Position(element.lineNumber - 1, element.columnNumber - 1);
                let end: vscode.Position = new vscode.Position(element.lineNumber, 0);

                let loc = new vscode.Location(uri, new vscode.Range(start, end));

                list.push(loc);
            }
        }
    }

}

export class FileData {
    public Uri: vscode.Uri;
    public Data: string;

    constructor(uri: vscode.Uri, data: string) {
        this.Uri = uri;
        this.Data = data;
    }
}