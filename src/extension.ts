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

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

    // Use the console to output diagnostic information (console.log) and errors (console.error)
    // This line of code will only be executed once when your extension is activated
    console.log('Congratulations, your extension "aadb2c" is now active!');

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


    let insertClaimTypeCommand = vscode.commands.registerCommand('extension.insertClaimType', () => {

        vscode.window.showInformationMessage("Not implemented yet :(")
            .then(result => {

            });
    });

    context.subscriptions.push(insertClaimTypeCommand);

    // Demo: register the add identity provider technical profile
    let insertTechnicalProfileIdpCommand = vscode.commands.registerCommand('extension.insertTechnicalProfileIdp', () => {
        let linkTypeList = ['Microsoft', 'Facebook', 'Azure AD', 'Azure AD Multi tenant', 'Google+'
            , 'LinkedIn', 'Twitter', 'AD-FS', 'Salesforce', 'Amazon'];

        vscode.window.showQuickPick(linkTypeList.sort(), { placeHolder: 'Select an identity provider' })
            .then(result => {

                switch (result) {
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
            });
    });

    context.subscriptions.push(insertTechnicalProfileIdpCommand);

    // Demo: register the add identity provider technical profile
    let insertTechnicalProfileRESTAPICommand = vscode.commands.registerCommand('extension.insertTechnicalProfileRESTAPI', () => {
        let linkTypeList = ['None', 'Basic', 'Client CertificateD'];
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
                return vscode.window.showQuickPick(linkTypeList, { placeHolder: 'Select Authentication Type' })
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
                    case "ClientCertificate": SnippetProvider.insertText(Costs.TP_REST_ClientCertificate.replace("{name}", name as string).replace("{serviceUri}", serviceUri as string));;
                }
            });
    });

    context.subscriptions.push(insertTechnicalProfileRESTAPICommand);
}

// this method is called when your extension is deactivated
export function deactivate() {
}