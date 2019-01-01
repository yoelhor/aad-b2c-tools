import * as vscode from 'vscode';
import { Hover } from 'vscode';
import GoDefinitionProvider from './GoDefinitionProvider';
import path = require('path');
import { ReferenceProvider } from './ReferenceProvider';

export default class HoverProvider {

    readonly Keys: KeywordData[] = [
        new KeywordData("BuildingBlocks", "ClaimsSchema", "Defines the claim types that can be referenced as part of the policy. Claims schema is the place where you declare your claims, such as first name, last name, display name, phone number and more.\r\n\r\n `ClaimsSchema` element contains list of `ClaimType` elements", null),
        new KeywordData("ClaimsSchema", "ClaimType", "Define the claim, its display name, the user input type and other properties", "https://docs.microsoft.com/en-us/azure/active-directory-b2c/claimsschema"),
        new KeywordData("ClaimType", "DisplayName", "The value which is displayed to the end users on various screens. \r\n\r\nNote: you can use localization to override this value", "https://docs.microsoft.com/en-us/azure/active-directory-b2c/claimsschema"),
        new KeywordData("ClaimType", "DataType", "[Required] One the following supported data types: boolean, date, int, long, string, stringCollection", "https://docs.microsoft.com/en-us/azure/active-directory-b2c/claimsschema"),
        new KeywordData("ClaimType", "DefaultPartnerClaimTypes", "Enable to specify the partner default claim types to use for a specified protocol.", "https://docs.microsoft.com/en-us/azure/active-directory-b2c/claimsschema"),
        new KeywordData("ClaimType", "Mask", "Specify an optional string of masking characters that can be applied to the claim when displaying the claim. For example, the phone number 324-232-4343 masked as XXX-XXX-4343", "https://docs.microsoft.com/en-us/azure/active-directory-b2c/claimsschema"),
        new KeywordData("ClaimType", "UserHelpText", "Specify a description of the claim type that can be helpful for the end users to understand the purpose and/or usage of the claim type. \r\n\r\nNote: you can use localization to override this value.", "https://docs.microsoft.com/en-us/azure/active-directory-b2c/claimsschema"),
        new KeywordData("ClaimType", "AdminHelpText", "Specify a description of the claim type that can be helpful for administrators to understand the purpose and/or usage of the claim type. \r\n\r\nNote: you can use localization to override this value.", "https://docs.microsoft.com/en-us/azure/active-directory-b2c/claimsschema"),
        new KeywordData("ClaimType", "UserInputType", "Specify the type of input control that should be available to the end user, when manually entering claim data for this claim type. One of the following supported type of input controls: TextBox, DateTimeDropdown, DropdownSingleSelect, CheckboxMultiSelect, Password, Readonly. \r\n\r\nNote: if you declare a claim type for internal use, without end-user interactions. For example, you declare a claim type to send or receive values from custom Rest API. In this case, you don't need to specify UserInputType.", "https://docs.microsoft.com/en-us/azure/active-directory-b2c/claimsschema"),
        new KeywordData("ClaimType", "Restriction", "Provide The value restrictions for this claim, such as a regular expression (Regex) or a list of acceptable values.", "https://docs.microsoft.com/en-us/azure/active-directory-b2c/claimsschema"),
        new KeywordData("BuildingBlocks", "ClaimsTransformations", "Contains a list of claims transformations that can be used in the user journeys as part of the policy\r\n\r\n `ClaimsTransformations` element contains list of `ClaimsTransformation` elements", "https://docs.microsoft.com/en-us/azure/active-directory-b2c/claimstransformations"),
        new KeywordData("ClaimsTransformations", "ClaimsTransformation", "Function essentially converts a given claim into another one. In the claims transformation, you specify the suitable transform method, such as: \r\n* Adding item to string collection \r\n* Change the case of the provided string claim to the one specified (to lower or upper) \r\n* Compares two claims and returns a claim with true indicating that the claims match, false otherwise \r\n* Creates a JSON representation of the user’s alternativeSecurityId property that can be used in calls to Graph API. This string is consumed by the Azure AD claims provider when PartnerClaimType is alternativeSecurityId \r\n* Creates a string claim from the provided parameter in the policy \r\n* Creates a random string using the random number generator used. \r\n* Format a given claim according to the provided format string.", "https://docs.microsoft.com/en-us/azure/active-directory-b2c/claimstransformations"),
        new KeywordData("ClaimsTransformation", "InputClaims", "", "https://docs.microsoft.com/en-us/azure/active-directory-b2c/claimstransformations"),
        new KeywordData("ClaimsTransformation", "OutputClaims", "", "https://docs.microsoft.com/en-us/azure/active-directory-b2c/claimstransformations"),
        new KeywordData("BuildingBlocks", "ContentDefinitions", "Contain URLs to external content, for example, URLs to pages used in claims providers as part of the policy.\r\n\r\n `ContentDefinitions` element contains list of `ContentDefinition` elements", "https://docs.microsoft.com/en-us/azure/active-directory-b2c/contentdefinitions"),
        new KeywordData("ContentDefinitions", "ContentDefinition", "In a custom policy, a content definition defines the HTML5 page URI that is used for a specified UI step. For example, the sign-in or sign-up, password reset, or error pages. You can modify the look and feel by overriding the LoadUri for the HTML5 file. Or create new content definitions according to your needs. `ContentDefinition` element may contain a localized resources reference, to the localization ID specify in the next section.", "https://docs.microsoft.com/en-us/azure/active-directory-b2c/contentdefinitions"),
        new KeywordData("ContentDefinition", "LoadUri", "Specify the URL of the CSHTML page (i.e. an ASP.NET Razor Web page) or an HTML5/CSS page for the content definition.\r\n\r\nNote: Make sure you enable CORS on your web server. And your HTML page is public available ", "https://docs.microsoft.com/en-us/azure/active-directory-b2c/contentdefinitions"),
        new KeywordData("ContentDefinition", "LocalizedResourcesReferences", "List of localized resources references for this page.\r\n\r\n `LocalizedResourcesReferences` element contains list of `LocalizedResourcesReference` elements", "https://docs.microsoft.com/en-us/azure/active-directory-b2c/contentdefinitions"),
    ]

    provideHover(
        document: vscode.TextDocument,
        position: vscode.Position,
        token: vscode.CancellationToken): Thenable<Hover> {

        // Get the selected word
        const wordPosition = document.getWordRangeAtPosition(position);
        
        // If no selected word found, return
        if (!wordPosition) return new Promise((resolve) => resolve());
        
        // Get the correct selected word. This fixes issues with words that contain hyphen, minus or dash. (-) or words inside parenthesis 
        const word = ReferenceProvider.getSelectedWord(document, position);
        
        var key: KeywordData = new KeywordData("", "", "", null);

        try {
            // Get parent element
            if (word != null && word != "") {

                var DOMParser = require('xmldom').DOMParser;

                var xmlDoc = new DOMParser().parseFromString(document.getText().toLowerCase());

                var nsAttr = xmlDoc.getElementsByTagName(word.toLowerCase());

                var i: number;
                for (i = 0; i < nsAttr.length; i++) {
                    if (nsAttr[i].lineNumber == position.line || nsAttr[i].lineNumber == (position.line - 1) || nsAttr[i].lineNumber == (position.line + 1)) {

                        var keyArray = this.Keys.filter(x => x.KeywordLowerCase == word.toLowerCase() &&
                            x.ParentKeywordLowerCase == nsAttr[i].parentNode.tagName);

                        if (keyArray != null && keyArray.length > 0) {
                            key = keyArray[0];
                        }

                        break;
                    }
                }
            }
        }
        catch (e) {
            console.log(e.message)
        }


        if (key && key.Keyword) {
            return new Promise(resolve => {

                // Add element title and description
                var message: string = key.ParentKeyword + " >> **" + key.Keyword + "**\r\n\r\n" + key.Text;

                // Add element link to more information
                if (key.Url)
                    message += "\r\n\r\nFor more infromation [click here](" + key.Url + ")";

                resolve(new Hover(message));
            });
        }
        else {
            var goDefinitionProvider: GoDefinitionProvider = new GoDefinitionProvider();

            var promise = goDefinitionProvider.provideDefinitionExt(document, position, token, true)
                .then((locations) => {
                    var message: String = "**" + word + "**\r\n\r\n";

                    var locs: vscode.Location[] = locations as vscode.Location[];

                    for (var i = 0; i < locs.length; i++) {
                        message += "[" + path.basename(locations[i].uri.toString()) + "](" + locations[i].uri._formatted + "#" + locations[i].range.start.line + ")\r\n\r\n";
                    }

                    if (locs.length > 0)
                        return new Hover(message.toString());
                    else
                        return new Hover("");
                })
                .then((hover) => {
                    return hover;
                });

            return promise;

        }
    }
}

export class KeywordData {
    public Keyword: string;
    public KeywordLowerCase: string;

    public ParentKeyword: string;
    public ParentKeywordLowerCase: string;

    public Text: string;
    public Url: string | null;

    constructor(parentKeyword: string, keyword: string, text: string, url: string | null) {
        this.Keyword = keyword;
        this.KeywordLowerCase = this.Keyword.toLowerCase();

        this.ParentKeyword = parentKeyword;
        this.ParentKeywordLowerCase = this.ParentKeyword.toLowerCase();

        this.Text = text;
        this.Url = url;
    }
}