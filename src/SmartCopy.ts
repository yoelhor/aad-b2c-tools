import * as vscode from 'vscode';
const clipboardy = require('clipboardy');

export default class SmartCopy {
    static Copy() {

        let editor = vscode.window.activeTextEditor;

        if (!editor) {
            vscode.window.showErrorMessage("Can't insert text because no document is open.");
            return;
        }

        let selection = editor.selection;

        let range = new vscode.Range(selection.start, selection.end);

        var DOMParser = require('xmldom').DOMParser;
        var xmlDoc = new DOMParser().parseFromString(editor.document.getText());

        var nodeList = xmlDoc.getElementsByTagName("*");

        for (var i = 0; i < nodeList.length; i++) {
            var node = nodeList[i];

            // Try to find the element in the same line.
            // TBD: check the column as well
            if (node.lineNumber == (range.start.line + 1)) {

                let nodeToBeAdded = node;
                let nodeListToBeAdded: any[] = [];

                // Add the element with its parents elements, up to the root element
                while (nodeToBeAdded) {
                    nodeListToBeAdded.push(nodeToBeAdded);
                    nodeToBeAdded = nodeToBeAdded.parentNode;

                    // Don't add the Azure AD B2C root element
                    if (nodeToBeAdded.tagName === "TrustFrameworkPolicy")
                        break;
                }

                // Change the oreder of the new XML from top to bottom
                nodeListToBeAdded.reverse();

                // Create new empty XML document
                var docToBeAdded = new DOMParser().parseFromString("<TrustFrameworkPolicy />");

                // Iterate through the elements and add them in a parent child hierarchy   
                var rootElement = docToBeAdded.documentElement;
                for (var iNode = 0; iNode < nodeListToBeAdded.length; iNode++) {

                    if (iNode == (nodeListToBeAdded.length - 1)) {

                        // Add the last element with its children 
                        var newElement = docToBeAdded.importNode(nodeListToBeAdded[iNode], true);
                        rootElement = SmartCopy.AddXMLElement(docToBeAdded, rootElement, newElement, iNode);
                    }
                    else {

                        // Add the element to the new XML document
                        var newElement = docToBeAdded.createElement(nodeListToBeAdded[iNode].tagName);

                        // Add the element's attributes
                        for (var iAtt = 0; iAtt < nodeListToBeAdded[iNode].attributes.length; iAtt++) {
                            newElement.setAttribute(
                                nodeListToBeAdded[iNode].attributes[iAtt].nodeName,
                                nodeListToBeAdded[iNode].attributes[iAtt].nodeValue);
                        }

                        // For ClaimsProvider, add the dispaly name element
                        if (nodeListToBeAdded[iNode].tagName === "ClaimsProvider" && nodeListToBeAdded[iNode].getElementsByTagName("DisplayName").length >= 1) {
                            for (var iDisplayNameElement = 0; iDisplayNameElement < nodeListToBeAdded[iNode].childNodes.length; iDisplayNameElement++) {

                                // Find the DisplayName child node
                                if (nodeListToBeAdded[iNode].childNodes[iDisplayNameElement].nodeName == "DisplayName") {
                                    var displayNameElementToBeAdded = docToBeAdded.createElement("DisplayName");
                                    displayNameElementToBeAdded.textContent = nodeListToBeAdded[iNode].childNodes[iDisplayNameElement].textContent

                                    // Add the DisplayName element
                                    var ident: string = "  ";
                                    var newLineStr: string = "\n" + ident.repeat(iNode);
                                    var textNode1 = docToBeAdded.createTextNode(newLineStr + ident);

                                    newElement.appendChild(textNode1);
                                    newElement.appendChild(displayNameElementToBeAdded);

                                    break;
                                }
                            }
                        }

                        // Add the node to the new XML document 
                        rootElement = SmartCopy.AddXMLElement(docToBeAdded, rootElement, newElement, iNode);

                    }
                }

                // Get the output XML string
                var xmlString: string = docToBeAdded.documentElement.childNodes[1].toString();

                // Remove the namespace from the imported last XML element
                xmlString = xmlString.replace(' xmlns="http://schemas.microsoft.com/online/cpim/schemas/2013/06"', '');

                // Copy the new formatted XML document to the clipboard 
                console.log(xmlString);
                clipboardy.writeSync(xmlString);
                break;
            }
        }
    }

    static AddXMLElement(xmlDoc, parentNode, newNode, newNodeIndex) {
        var ident: string = "  ";
        var newLineStr: string = "\n" + ident.repeat(newNodeIndex);
        var textNode1 = xmlDoc.createTextNode(newLineStr);
        var textNode2 = xmlDoc.createTextNode(newLineStr);
        parentNode.appendChild(textNode1);
        var newRootElement = parentNode.appendChild(newNode);
        parentNode.appendChild(textNode2);
        return newRootElement;
    }
}