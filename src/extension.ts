'use strict';
// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';

//Demo: Import classes
//import HoverProvider from './HoverProvider';
import SnippetProvider from './SnippetProvider';
import GoDefinitionProvider from './GoDefinitionProvider';
import CustomPolicyExplorerProvider from './CustomPolicyExplorerProvider';
import { ReferenceProvider } from './ReferenceProvider';
import Costs from './Consts';
import * as path from 'path';

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

    // Use the console to output diagnostic information (console.log) and errors (console.error)
    // This line of code will only be executed once when your extension is activated
    console.log('Congratulations, your extension "aadb2c" is now active!');

    if (vscode.workspace.rootPath) {
        let pattern = path.join(vscode.workspace.rootPath as string, '*.xml');
        console.log("File system watcher started: "+ pattern);
        let fileWatcher = vscode.workspace.createFileSystemWatcher(pattern);

        context.subscriptions.push(fileWatcher.onDidCreate((filePath) => {
            console.log(filePath + " created!");
                //do something
        }));
        context.subscriptions.push(fileWatcher.onDidChange((filePath) => {
            console.log(filePath + " changed!");
                //do something
        }));
        context.subscriptions.push(fileWatcher.onDidDelete((filePath) => {
            console.log(filePath + " deleted!");
                //do something
        }));
    }

    //Demo: Custom Policy Explorer
    const customPolicyExplorerProvider = new CustomPolicyExplorerProvider();
    vscode.window.registerTreeDataProvider('CustomPolicyExplorer', customPolicyExplorerProvider);

    vscode.commands.registerCommand('jsonOutline.refresh', () => customPolicyExplorerProvider.refresh());
    vscode.commands.registerCommand('jsonOutline.refreshNode', offset => customPolicyExplorerProvider.refresh(offset));
    vscode.commands.registerCommand('extension.openJsonSelection', range => customPolicyExplorerProvider.select(range));

    // Demo: Find all reference
    context.subscriptions.push(
        vscode.languages.registerReferenceProvider(
            "xml", new ReferenceProvider()));

    // Demo: register go to definiton provider
    context.subscriptions.push(
        vscode.languages.registerDefinitionProvider([
            { language: 'xml', scheme: 'file', pattern: '**/*xml*' }
        ],
            new GoDefinitionProvider()));


    // Demo: register the hover provider
    // context.subscriptions.push(
    //     vscode.languages.registerHoverProvider([
    //         { language: 'xml', scheme: 'file', pattern: '**/*xml*' }
    //     ],
    //         new HoverProvider()));


    // Add Claim Type command
    let insertClaimTypeCommand = vscode.commands.registerCommand('extension.insertClaimType', () => {
        let UserInputTypeList = ['TextBox', 'Radio Single Select', 'Dropdown Single Select', 'Checkbox Multi Select', 'DateTime Dropdown', 'Read only', 'Paragraph','String collection' , 'Integer', 'Long', 'Boolean'];
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
                    case "TextBox": SnippetProvider.insertText(Costs.CLAIM_TextBox.replace("{name}", name as string).replace("{displayName}", displayName as string));
                    case "Radio Single Select": SnippetProvider.insertText(Costs.CLAIM_RadioSingleSelect.replace("{name}", name as string).replace("{displayName}", displayName as string));
                    case "Dropdown Single Select": SnippetProvider.insertText(Costs.CLAIM_DropdownSingleSelect.replace("{name}", name as string).replace("{displayName}", displayName as string));;
                    case "Checkbox Multi Select": SnippetProvider.insertText(Costs.CLAIM_CheckboxMultiSelect.replace("{name}", name as string).replace("{displayName}", displayName as string));;
                    case "DateTime Dropdown": SnippetProvider.insertText(Costs.CLAIM_DateTimeDropdown.replace("{name}", name as string).replace("{displayName}", displayName as string));;
                    case "Read only": SnippetProvider.insertText(Costs.CLAIM_Readonly.replace("{name}", name as string).replace("{displayName}", displayName as string));;
                    case "Paragraph": SnippetProvider.insertText(Costs.CLAIM_Paragraph.replace("{name}", name as string).replace("{displayName}", displayName as string));;
                    case "String collection": SnippetProvider.insertText(Costs.CLAIM_stringCollection.replace("{name}", name as string).replace("{displayName}", displayName as string));;
                    case "Integer": SnippetProvider.insertText(Costs.CLAIM_Integer.replace("{name}", name as string).replace("{displayName}", displayName as string));;
                    case "Long": SnippetProvider.insertText(Costs.CLAIM_Long.replace("{name}", name as string).replace("{displayName}", displayName as string));;
                    case "Boolean": SnippetProvider.insertText(Costs.CLAIM_Boolean.replace("{name}", name as string).replace("{displayName}", displayName as string));;
                } 
            })
            .then(() => {
                return vscode.window.showInformationMessage("For more information, see: [Modify sign up to add new claims and configure user input.](https://docs.microsoft.com/en-us/azure/active-directory-b2c/active-directory-b2c-configure-signup-self-asserted-custom). To store a custom attributes in Azure AD directory, you need also to change the Claim type name to 'extension_" + name + "' and set the application. For more information, see [Creating and using custom attributes in a custom profile edit policy](https://docs.microsoft.com/en-us/azure/active-directory-b2c/active-directory-b2c-create-custom-attributes-profile-edit-custom) ")
            });
    });

    context.subscriptions.push(insertClaimTypeCommand);

    // Add Identity provider technical profile command
    let insertTechnicalProfileIdpCommand = vscode.commands.registerCommand('extension.insertTechnicalProfileIdp', () => {
        let IdentityProviderList = ['Microsoft', 'Facebook', 'Azure AD', 'Azure AD Multi tenant', 'Google+'
            , 'LinkedIn', 'Twitter', 'AD-FS', 'Salesforce', 'Amazon'];
        let idp: string | undefined = 'default';

        vscode.window.showQuickPick(IdentityProviderList.sort(), { placeHolder: 'Select an identity provider' })
            .then(result => {
                idp = result;

                if (!result)
                    return Promise.reject('user cancelled');

                switch (idp) {
                    case "Microsoft": SnippetProvider.insertText(Costs.TP_IDP_Microsoft);;
                    case "Facebook": SnippetProvider.insertText(Costs.TP_IDP_Facebook);;
                    case "Azure AD": SnippetProvider.insertText(Costs.TP_IDP_AzureAD);;
                    case "Azure AD Multi tenant": SnippetProvider.insertText(Costs.TP_IDP_AzueADMulti);;
                    case "Google+": SnippetProvider.insertText(Costs.TP_IDP_Google);;
                    case "LinkedIn": SnippetProvider.insertText(Costs.TP_IDP_LinkeIn);;
                    case "Twitter": SnippetProvider.insertText(Costs.TP_IDP_Twitter);;
                    case "AD-FS": SnippetProvider.insertText(Costs.TP_IDP_ADFS);;
                    case "Salesforce": SnippetProvider.insertText(Costs.TP_IDP_Saleforce);;
                    case "VK": SnippetProvider.insertText(Costs.TP_IDP_VK);;
                    case "Amazon": SnippetProvider.insertText(Costs.TP_IDP_Amazon);;
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
    });

    context.subscriptions.push(insertTechnicalProfileIdpCommand);

    // Add REST API technical profile command
    let insertTechnicalProfileRESTAPICommand = vscode.commands.registerCommand('extension.insertTechnicalProfileRESTAPI', () => {
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
                    case "None": SnippetProvider.insertText(Costs.TP_REST_None.replace("{name}", name as string).replace("{serviceUri}", serviceUri as string));
                    case "Basic": SnippetProvider.insertText(Costs.TP_REST_Basic.replace("{name}", name as string).replace("{serviceUri}", serviceUri as string));
                    case "Client Certificate": SnippetProvider.insertText(Costs.TP_REST_ClientCertificate.replace("{name}", name as string).replace("{serviceUri}", serviceUri as string));;
                }
            })
            .then(() => {
                return vscode.window.showInformationMessage("For more information, see: [Integrate REST API claims exchanges in your Azure AD B2C user journey as validation of user input](https://docs.microsoft.com/en-us/azure/active-directory-b2c/active-directory-b2c-custom-rest-api-netfw)")
            });
    });

    context.subscriptions.push(insertTechnicalProfileRESTAPICommand);


    // Add application insights command
    let insertApplicationInsightsConommand = vscode.commands.registerCommand('extension.insertApplicationInsights', () => {
        let instrumentationKey: string | undefined = 'Default';

        vscode.window.showInputBox({ prompt: "Type your instrumentation key" })
            .then(result => {
                if (!result)
                    return Promise.reject('user cancelled');

                instrumentationKey = result;
            })
            .then(() => {
                SnippetProvider.insertText(Costs.ApplicationInsightsDebugMode.replace("{instrumentationKey}", instrumentationKey as string));
            })
            .then(() => {
                return vscode.window.showInformationMessage("See the commets how to set the policy deployment mode to debug, and user journey recorder endpoint.  " +
                    "For more information, see: [Azure Active Directory B2C: Collecting Logs](https://docs.microsoft.com/en-us/azure/active-directory-b2c/active-directory-b2c-troubleshoot-custom)")
            });
    });

    context.subscriptions.push(insertApplicationInsightsConommand);
}

// this method is called when your extension is deactivated
export function deactivate() {
}