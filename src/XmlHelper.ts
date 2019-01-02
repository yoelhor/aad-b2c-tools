import { SelectedWord } from "./models/SelectedWord";
import { SelectedWordXmlElement } from "./models/SelectedWordXmlElement";
import * as vscode from 'vscode';
const DOMParser = require('xmldom').DOMParser;

export default class XmlHelper {
    static GetSelectedWordData(
        selectedWord: SelectedWord,
        position: vscode.Position,
        document: vscode.TextDocument) {

        // Load the XML file    
        var xmlDoc = new DOMParser().parseFromString(document.getText().toLowerCase());

        // Get all XML nodes
        var nodeList = xmlDoc.getElementsByTagName("*");

        // var nsAttr = xmlDoc.getElementsByTagName(word.toLowerCase());

        // var i: number;
        // for (i = 0; i < nsAttr.length; i++) {
        //     if (nsAttr[i].lineNumber == position.line || nsAttr[i].lineNumber == (position.line - 1) || nsAttr[i].lineNumber == (position.line + 1)) {

        //         break;
        //     }
        // }


        // Try to get the XML element in the selected range
        for (var i = 0; i < nodeList.length; i++) {
            var node = nodeList[i];

            // TBD: check the column as well
            if (node.lineNumber == (position.line + 1)) {


                let tempNode = node;
                while (tempNode) {
                    selectedWord.Parents.push(XmlHelper.getElementData(tempNode));

                    if (tempNode.parentNode)
                        tempNode = tempNode.parentNode;

                    if (tempNode.nodeName === "#document" || tempNode.nodeName === "trustframeworkpolicy")
                        break;
                }

                break;
            }


        }

        return selectedWord;
    }

    static getElementData(node) {

        var selectedWordXmlElement: SelectedWordXmlElement = new SelectedWordXmlElement();

        // Get information regarding the element
        selectedWordXmlElement.ElementNodeName = node.nodeName;

        if (node.hasAttribute("id"))
            selectedWordXmlElement.ElementID = node.getAttribute("id");

        // Get more element info
        if (selectedWordXmlElement.ElementNodeName === "claimstransformation" && node.hasAttribute("transformationmethod"))
            selectedWordXmlElement.ElementType = node.getAttribute("transformationmethod");

        else if (selectedWordXmlElement.ElementNodeName === "technicalprofile") {

            var docLookupList = node.getElementsByTagName("protocol");
            if (docLookupList.length == 1) {
                if (docLookupList[0].hasAttribute("name") && docLookupList[0].getAttribute("name") === "proprietary" && docLookupList[0].hasAttribute("handler") && docLookupList[0].getAttribute("handler").length > 60 && docLookupList[0].getAttribute("handler").indexOf(",") > 25) {
                    // Extract the provider name
                    selectedWordXmlElement.ElementType = docLookupList[0].getAttribute("handler").substring(0, docLookupList[0].getAttribute("handler").indexOf(","));
                }
                else if (docLookupList[0].hasAttribute("name")) {
                    // Get the protocol name
                    selectedWordXmlElement.ElementType = docLookupList[0].getAttribute("name");
                }
            }
        }

        return selectedWordXmlElement;
    }
}



