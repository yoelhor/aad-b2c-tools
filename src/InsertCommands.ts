import SnippetProvider from "./SnippetProvider";
import Consts from './Consts';
import * as vscode from 'vscode';

export default class InsertCommands {
    static InsertClaimType() {
        let UserInputTypeList = ['TextBox', 'Radio Single Select', 'Dropdown Single Select', 'Checkbox Multi Select', 'DateTime Dropdown', 'Read only', 'Paragraph', 'String collection', 'Integer', 'Long', 'Boolean'];
        let name: string | undefined = 'Default';
        let displayName: string | undefined = 'Default';
        let userInputType: string | undefined = 'none';


        vscode.window.showQuickPick(UserInputTypeList, { placeHolder: 'Select user input type' })
            .then(result => {
                if (!result)
                    return Promise.reject('user cancelled');

                userInputType = result
            }).then(() => {
                return vscode.window.showInputBox({ prompt: "Provide a name" })
                    .then(result => {
                        if (!result)
                            return Promise.reject('user cancelled');

                        name = result;
                    });
            })
            .then(() => {
                return vscode.window.showInputBox({ prompt: "Provide a dispaly name that describe the claim type" })
                    .then(result => {
                        if (!result)
                            return Promise.reject('user cancelled');

                        displayName = result;
                    });
            })
            .then(() => {
                switch (userInputType) {
                    case "TextBox": SnippetProvider.insertText(Consts.CLAIM_TextBox.replace("{name}", name as string).replace("{displayName}", displayName as string));
                    case "Radio Single Select": SnippetProvider.insertText(Consts.CLAIM_RadioSingleSelect.replace("{name}", name as string).replace("{displayName}", displayName as string));
                    case "Dropdown Single Select": SnippetProvider.insertText(Consts.CLAIM_DropdownSingleSelect.replace("{name}", name as string).replace("{displayName}", displayName as string));;
                    case "Checkbox Multi Select": SnippetProvider.insertText(Consts.CLAIM_CheckboxMultiSelect.replace("{name}", name as string).replace("{displayName}", displayName as string));;
                    case "DateTime Dropdown": SnippetProvider.insertText(Consts.CLAIM_DateTimeDropdown.replace("{name}", name as string).replace("{displayName}", displayName as string));;
                    case "Read only": SnippetProvider.insertText(Consts.CLAIM_Readonly.replace("{name}", name as string).replace("{displayName}", displayName as string));;
                    case "Paragraph": SnippetProvider.insertText(Consts.CLAIM_Paragraph.replace("{name}", name as string).replace("{displayName}", displayName as string));;
                    case "String collection": SnippetProvider.insertText(Consts.CLAIM_stringCollection.replace("{name}", name as string).replace("{displayName}", displayName as string));;
                    case "Integer": SnippetProvider.insertText(Consts.CLAIM_Integer.replace("{name}", name as string).replace("{displayName}", displayName as string));;
                    case "Long": SnippetProvider.insertText(Consts.CLAIM_Long.replace("{name}", name as string).replace("{displayName}", displayName as string));;
                    case "Boolean": SnippetProvider.insertText(Consts.CLAIM_Boolean.replace("{name}", name as string).replace("{displayName}", displayName as string));;
                }
            })
            .then(() => {
                return vscode.window.showInformationMessage("For more information, see: [Modify sign up to add new claims and configure user input.](https://docs.microsoft.com/en-us/azure/active-directory-b2c/active-directory-b2c-configure-signup-self-asserted-custom). To store a custom attributes in Azure AD directory, you need also to change the Claim type name to 'extension_" + name + "' and set the application. For more information, see [Creating and using custom attributes in a custom profile edit policy](https://docs.microsoft.com/en-us/azure/active-directory-b2c/active-directory-b2c-create-custom-attributes-profile-edit-custom) ")
            });

    }

    static InsertTechnicalProfileIdp() {
        let IdentityProviderList = ['Microsoft', 'Facebook', 'Azure AD', 'Azure AD Multi tenant', 'Google+'
            , 'LinkedIn', 'Twitter', 'AD-FS', 'Salesforce', 'Amazon'];
        let idp: string | undefined = 'default';

        vscode.window.showQuickPick(IdentityProviderList.sort(), { placeHolder: 'Select an identity provider' })
            .then(result => {
                idp = result;

                if (!result)
                    return Promise.reject('user cancelled');

                switch (idp) {
                    case "Microsoft": SnippetProvider.insertText(Consts.TP_IDP_Microsoft);;
                    case "Facebook": SnippetProvider.insertText(Consts.TP_IDP_Facebook);;
                    case "Azure AD": SnippetProvider.insertText(Consts.TP_IDP_AzureAD);;
                    case "Azure AD Multi tenant": SnippetProvider.insertText(Consts.TP_IDP_AzueADMulti);;
                    case "Google+": SnippetProvider.insertText(Consts.TP_IDP_Google);;
                    case "LinkedIn": SnippetProvider.insertText(Consts.TP_IDP_LinkeIn);;
                    case "Twitter": SnippetProvider.insertText(Consts.TP_IDP_Twitter);;
                    case "AD-FS": SnippetProvider.insertText(Consts.TP_IDP_ADFS);;
                    case "Salesforce": SnippetProvider.insertText(Consts.TP_IDP_Saleforce);;
                    case "VK": SnippetProvider.insertText(Consts.TP_IDP_VK);;
                    case "Amazon": SnippetProvider.insertText(Consts.TP_IDP_Amazon);;
                }
            })
            .then(() => {
                let title: string = '';
                let url: string = '';

                switch (idp) {
                    case "Microsoft": title = 'Add Microsoft Account (MSA) as an identity provider using custom policies'; url = 'https://docs.microsoft.com/en-us/azure/active-directory-b2c/active-directory-b2c-custom-setup-msa-idp'; break;
                    case "Facebook": title = ''; url = ''; break;
                    case "Azure AD": title = 'Sign in by using Azure AD accounts'; url = 'https://docs.microsoft.com/en-us/azure/active-directory-b2c/active-directory-b2c-setup-aad-custom'; break;
                    case "Azure AD Multi tenant": title = 'Allow users to sign in to a multi-tenant Azure AD identity provider using custom policies'; url = 'https://docs.microsoft.com/en-us/azure/active-directory-b2c/active-directory-b2c-setup-commonaad-custom'; break;
                    case "Google+": title = 'Add Google+ as an OAuth2 identity provider using custom policies'; url = 'https://docs.microsoft.com/en-us/azure/active-directory-b2c/active-directory-b2c-custom-setup-goog-idp'; break;
                    case "LinkedIn": title = 'Add LinkedIn as an identity provider by using custom policies'; url = 'https://docs.microsoft.com/en-us/azure/active-directory-b2c/active-directory-b2c-custom-setup-li-idp'; break;
                    case "Twitter": title = 'Add Twitter as an OAuth1 identity provider by using custom policies'; url = 'https://docs.microsoft.com/en-us/azure/active-directory-b2c/active-directory-b2c-custom-setup-twitter-idp'; break;
                    case "AD-FS": title = 'Add ADFS as a SAML identity provider using custom policies'; url = 'https://docs.microsoft.com/en-us/azure/active-directory-b2c/active-directory-b2c-custom-setup-adfs2016-idp'; break;
                    case "Salesforce": title = 'Sign in by using Salesforce accounts via SAML'; url = 'https://docs.microsoft.com/en-us/azure/active-directory-b2c/active-directory-b2c-setup-sf-app-custom'; break;
                    case "VK": title = ''; url = ''; break;
                    case "Amazon": title = ''; url = ''; break;
                }

                if (title != '')
                    return vscode.window.showInformationMessage("For more information, see: [" + title + "](" + url + ")");
            });

    }

    static InsertTechnicalProfileRESTAPI()
    {
        let authenticationTypeList = ['None', 'Basic', 'Client Certificate'];
        let name: string | undefined = 'Default';
        let serviceUri: string | undefined = 'https://server-name/api/sign-up';
        let authenticationType: string | undefined = 'none';

        vscode.window.showInputBox({ prompt: "Provide a name" })
            .then(result => {
                if (!result)
                    return Promise.reject('user cancelled');

                name = result;
            })
            .then(() => {
                return vscode.window.showInputBox({ prompt: "Service URL" })
                    .then(result => {
                        if (!result)
                            return Promise.reject('user cancelled');

                        serviceUri = result;
                    });
            })
            .then(() => {
                return vscode.window.showQuickPick(authenticationTypeList, { placeHolder: 'Select Authentication Type' })
                    .then(result => {
                        if (!result)
                            return Promise.reject('user cancelled');

                        authenticationType = result
                    });
            })
            .then(() => {
                switch (authenticationType) {
                    case "None": SnippetProvider.insertText(Consts.TP_REST_None.replace("{name}", name as string).replace("{serviceUri}", serviceUri as string));
                    case "Basic": SnippetProvider.insertText(Consts.TP_REST_Basic.replace("{name}", name as string).replace("{serviceUri}", serviceUri as string));
                    case "Client Certificate": SnippetProvider.insertText(Consts.TP_REST_ClientCertificate.replace("{name}", name as string).replace("{serviceUri}", serviceUri as string));;
                }
            })
            .then(() => {
                return vscode.window.showInformationMessage("For more information, see: [Integrate REST API claims exchanges in your Azure AD B2C user journey as validation of user input](https://docs.microsoft.com/en-us/azure/active-directory-b2c/active-directory-b2c-custom-rest-api-netfw)")
            });

    }

    static InsertApplicationInsights()
    {
        let instrumentationKey: string | undefined = 'Default';


        try {
            var editor: vscode.TextEditor = vscode.window.activeTextEditor as vscode.TextEditor;
            var DOMParser = require('xmldom').DOMParser; //https://www.npmjs.com/package/xmldom
            var xmlDoc = new DOMParser().parseFromString(editor.document.getText(), "application/xml");

            // Check if policy is a relying party
            var xmlRelyingParty = xmlDoc.getElementsByTagName("RelyingParty");
            if (xmlRelyingParty.length == 0) {
                vscode.window.showWarningMessage("Application insights trace can not be added to this policy. You can add Application insights trace only to relying party policy.");
                return;
            }

            vscode.window.showInputBox({ prompt: "Type your instrumentation key" })
                .then(result => {
                    if (!result)
                        return Promise.reject('user cancelled');

                    instrumentationKey = result;
                })
                .then(() => {
                    SnippetProvider.insertText(Consts.ApplicationInsightsDebugMode.replace("{instrumentationKey}", instrumentationKey as string));
                })
                .then(() => {
                    return vscode.window.showInformationMessage("See the commets how to set the policy deployment mode to debug, and user journey recorder endpoint.  " +
                        "For more information, see: [Azure Active Directory B2C: Collecting Logs](https://docs.microsoft.com/en-us/azure/active-directory-b2c/active-directory-b2c-troubleshoot-custom)")
                });
        }
        catch (e) {
            console.log(e.message)
        }

    }
}