import * as vscode from 'vscode';
import { Hover } from 'vscode';

export default class HoverProvider {
    
    provideHover(
        document: vscode.TextDocument, 
        position: vscode.Position, 
        token: vscode.CancellationToken): Promise<Hover> {

            
            const wordPosition = document.getWordRangeAtPosition(position);
		    if (!wordPosition) return new Promise((resolve) => resolve());
		    const word = document.getText(wordPosition);

              return new Promise(resolve => {
            resolve(new Hover("word: **" + word + "**"));
            });
 
            //return new Hover('For documents inside `test`-folders only');

            // return FlowLib.getTypeAtPos(
            //     document.getText(), document.uri.fsPath, position).then((typeAtPos:any) => {
            //         const beautifiedData = beautify(typeAtPos.type, { indent_size: 4 });
            //         return new vscode.Hover([
            //             'Flow-IDE',
            //             { language: 'javascriptreact', value: `${word}: ${beautifiedData}` }
            //         ]);
            // }).catch((e) => {
                
            // });
    }
}