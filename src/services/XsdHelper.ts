import Consts from "../Consts";
import { Suggestion } from "../models/Suggestion";
import xmldom = require('xmldom')
const DOMParser = require('xmldom').DOMParser;

export default class XsdHelper {

    static staticXsdDod = null;
    static GetSelectedElements(xPathArray: string[], xsdDoc) {

        if ((!xPathArray) || xPathArray.length == 0) {
            return;
        }

        let xpath = require('xpath')
        let select = xpath.useNamespaces({ "xs": "http://www.w3.org/2001/XMLSchema" });
        let currentNode;

        for (let i = 0; i < xPathArray.length; i++) {
            var nodes;

            if (i == 0) {
                // Get the TrustFrameworkPolicy element
                currentNode = select("//xs:schema/xs:element[@name='TrustFrameworkPolicy']", xsdDoc)[0];
                continue;
            }

            if (currentNode) {
                // Find the child node
                nodes = select(".//xs:element[@name='" + xPathArray[i] + "']", currentNode);
                if (nodes.length == 1) currentNode = nodes[0];
            }

            // Check if an xml element found. If yes, check whether it has a reference to complex type
            if (currentNode && currentNode.getAttribute("type").startsWith("tfp:")) {

                let complexTypeName = currentNode.getAttribute("type").substring(4)

                // Find the complex type in the XSD document
                nodes = select("//xs:schema/xs:complexType[@name='" + complexTypeName + "']", xsdDoc);

                if (nodes.length == 1) currentNode = nodes[0];
            }

        }

        return currentNode;
    }
    static GetSubElements(xPathArray: string[]): Suggestion[] | any {

        // Load the XML file    
        var xsdDoc = XsdHelper.getXsdDocument();

        if ((!xPathArray) || xPathArray.length == 0) {
            return;
        }

        let xpath = require('xpath')
        let select = xpath.useNamespaces({ "xs": "http://www.w3.org/2001/XMLSchema" });

        let currentNode = XsdHelper.GetSelectedElements(xPathArray, xsdDoc);
        let xpathQuery = currentNode.localName === 'complexType' ? "./xs:sequence/xs:element" : "./xs:complexType/xs:sequence/xs:element";


        let nodes = select(xpathQuery, currentNode);


        if ((!nodes) || nodes.length == 0) return;

        let elements: Suggestion[] = [];
        for (var i = 0; i < nodes.length; i++) {
            let suggestion: Suggestion = new Suggestion();
            suggestion.InsertText = nodes[i].getAttribute("name");

            // Check if an xml element found. If yes, check whether it has a reference to complex type
            let documentationLookupList, childrenLookupList;

            if (nodes[i] && nodes[i].getAttribute("type").startsWith("xs:")) {
                suggestion.HasContent = true;
            }

            if (nodes[i] && nodes[i].getAttribute("type").startsWith("tfp:")) {

                let complexTypeName = nodes[i].getAttribute("type").substring(4)

                // Find the complex type documentation and children in the XSD document 
                documentationLookupList = select("//xs:schema/xs:complexType[@name='" + complexTypeName + "']/xs:annotation/xs:documentation[text()]|//xs:schema/xs:simpleType[@name='" + complexTypeName + "']/xs:annotation/xs:documentation[text()]", xsdDoc);
                childrenLookupList = select("//xs:schema/xs:complexType[@name='" + complexTypeName + "']/xs:sequence/xs:element", xsdDoc);

                suggestion.HasContent = ((select("//xs:schema/xs:simpleType[@name='" + complexTypeName + "']|//xs:schema/xs:complexType[@name='" + complexTypeName + "']/xs:simpleContent", nodes[i]).length == 1));

            }
            else if (nodes[i]) {
                // Find the complex type documentation and children inside the element 
                documentationLookupList = select("./xs:annotation/xs:documentation[text()]|./xs:complexType/xs:annotation/xs:documentation[text()]", nodes[i]);
                childrenLookupList = select("./xs:complexType/xs:sequence/xs:element", nodes[i]);
            }

            // If documentation found (inside the element or in a complex type), add the documentation 
            if (documentationLookupList.length == 1) {
                suggestion.Help = documentationLookupList[0].textContent.replace(/\s{2,}/g, '');
            }

            // If documentation found (inside the element or in a complex type), check whether the element has children 
            suggestion.HasChildren = childrenLookupList && childrenLookupList.length > 0;

            elements.push(suggestion)
        }

        return elements;
    }


    static GetAttributes(xPathArray: string[]): Suggestion[] | any {

        // Load the XML file    
        var xsdDoc = XsdHelper.getXsdDocument();

        if ((!xPathArray) || xPathArray.length == 0) {
            return;
        }

        let xpath = require('xpath')
        let select = xpath.useNamespaces({ "xs": "http://www.w3.org/2001/XMLSchema" });

        let currentNode = XsdHelper.GetSelectedElements(xPathArray, xsdDoc);
        let nodes = select("./xs:attribute|./xs:complexType/xs:attribute|./xs:simpleContent/xs:extension/xs:attribute", currentNode);


        if ((!nodes) || nodes.length == 0) return;

        let attributes: Suggestion[] = [];
        for (var i = 0; i < nodes.length; i++) {
            let suggestion: Suggestion = new Suggestion();
            suggestion.InsertText = nodes[i].getAttribute("name");

            // Find the attribute documentation inside the element 
            let documentationLookupList;

            if (nodes[i] && nodes[i].getAttribute("type").startsWith("tfp:")) {

                let complexTypeName = nodes[i].getAttribute("type").substring(4)

                // Find the simple type documentation and children in the XSD document 
                documentationLookupList = select("//xs:schema/xs:simpleType[@name='" + complexTypeName + "']/xs:annotation/xs:documentation[text()]|//xs:schema/xs:simpleType[@name='" + complexTypeName + "']/xs:annotation/xs:documentation[text()]", xsdDoc);

            }
            else if (nodes[i]) {
                // Find the simple type documentation and children inside the element 
                documentationLookupList = select("./xs:annotation/xs:documentation[text()]", nodes[i]);
            }

            // If documentation found, add the documentation 
            if (documentationLookupList.length == 1) {
                suggestion.Help = documentationLookupList[0].textContent.replace(/\s{2,}/g, '');
            }

            attributes.push(suggestion)
        }

        return attributes;
    }

    public static GetAttributeValues(xPathArray: string[], attributeName: string): Suggestion[] | any {

        // Load the XML file    
        var xsdDoc = XsdHelper.getXsdDocument();

        if ((!xPathArray) || xPathArray.length == 0) {
            return;
        }

        let xpath = require('xpath')
        let select = xpath.useNamespaces({ "xs": "http://www.w3.org/2001/XMLSchema" });

        let currentNode = XsdHelper.GetSelectedElements(xPathArray, xsdDoc);
        let nodes = select("./xs:complexType/xs:attribute[@name='" + attributeName + "']|./xs:simpleContent/xs:extension/xs:attribute[@name='" + attributeName + "']", currentNode);


        if ((!nodes) || nodes.length == 0) return;

        var node = nodes[0];

        let attributes: Suggestion[] = [];

        if (node && node.getAttribute("type") === "xs:boolean") {
            // Add true or false options
            let suggestionFalse: Suggestion = new Suggestion();
            suggestionFalse.InsertText = 'false';
            attributes.push(suggestionFalse);

            let suggestionTrue: Suggestion = new Suggestion();
            suggestionTrue.InsertText = 'true';
            attributes.push(suggestionTrue);

        }
        else if (node && node.getAttribute("type").startsWith("tfp:")) {
            let complexTypeName = node.getAttribute("type").substring(4)

            // Find the complex type in the XSD document
            nodes = select("//xs:schema/xs:simpleType[@name='" + complexTypeName + "']/xs:restriction/xs:enumeration", xsdDoc);

            for (var i = 0; i < nodes.length; i++) {
                let suggestion: Suggestion = new Suggestion();
                suggestion.InsertText = nodes[i].getAttribute("value");
                attributes.push(suggestion);
            }
        }

        return attributes;
    }


    private static getXsdDocument(): xmldom.Document {

        if (!XsdHelper.staticXsdDod)
        {
            var c = new DOMParser().parseFromString(Consts.IEF_Schema);
            XsdHelper.staticXsdDod = c
        }

        return XsdHelper.staticXsdDod;
    }
}