import * as vscode from 'vscode';
import PolicBuild from './PolicyBuild';
import XmlHelper from './services/XmlHelper';

export default class CompletionProvider implements vscode.CompletionItemProvider {
    provideCompletionItems(document: vscode.TextDocument, position: vscode.Position, token: vscode.CancellationToken, context: vscode.CompletionContext): vscode.ProviderResult<vscode.CompletionItem[] | vscode.CompletionList> {

        return this.GetItems(document, position);

    }

    async GetItems(document: vscode.TextDocument, position: vscode.Position) {
        let linePrefix = document.lineAt(position).text.substr(0, position.character);
        // if (!linePrefix.endsWith('{')) {
        //     return undefined;
        // }

        let startsWithCurlyBrackets: boolean = linePrefix.endsWith('{');

        let list: string[] = [];
        let addSettings: boolean = true;

        if (XmlHelper.IsCloseToAttribute("DefaultValue", linePrefix, position)) {
            // Add the caims resolvers
            list = ['{Culture:LanguageName}', '{Culture:LCID}', '{Culture:RegionName}', '{Culture:RFC5646}',
                '{Policy:PolicyId}', '{Policy:RelyingPartyTenantId}', '{Policy:TenantObjectId}',
                '{Policy:TrustFrameworkTenantId}', '{OIDC:AuthenticationContextReferences}', '{OIDC:ClientId}',
                '{OIDC:DomainHint}', '{OIDC:LoginHint}', '{OIDC:MaxAge}', '{OIDC:Nonce}', '{OIDC:Prompt}', '{OIDC:Resource}',
                '{OIDC:scope}', '{Context:BuildNumber}', '{Context:CorrelationId}', '{Context:DateTimeInUtc}', '{Context:DeploymentMode}',
                '{Context:IPAddress}', '{OAUTH-KV:campaignId}', '{OAUTH-KV:app_session}', '{oauth2:access_token}'];
        }
        // Get claims list
        else if (XmlHelper.IsCloseToAttribute("ClaimTypeReferenceId", linePrefix, position)) {
            addSettings = false;
            list = await XmlHelper.GetXmlFilesWithCurrentFile(document).then((files) => {
                return list.concat(XmlHelper.GetElementIDsByNodeName('ClaimType', files));
            }).then(items => { return items });
        }

        // Get the list of technical profiles
        else if ( XmlHelper.IsCloseToAttribute("TechnicalProfileReferenceId", linePrefix, position) || 
                XmlHelper.IsInNodeAndCloseToAttribute("ReferenceId", "ValidationTechnicalProfile", linePrefix, position)  ||
                XmlHelper.IsInNodeAndCloseToAttribute("ReferenceId", "IncludeTechnicalProfile", linePrefix, position) ||
                XmlHelper.IsInNodeAndCloseToAttribute("ReferenceId", "UseTechnicalProfileForSessionManagement", linePrefix, position)) {
            addSettings = false;
            list = await XmlHelper.GetXmlFilesWithCurrentFile(document).then((files) => {
                return list.concat(XmlHelper.GetElementIDsByNodeName('TechnicalProfile', files));
            }).then(items => { return items });
        }
        
        // Get the list of claims transformation
        else if (XmlHelper.IsInNodeAndCloseToAttribute("ReferenceId", "InputClaimsTransformation", linePrefix, position) ||
                 XmlHelper.IsInNodeAndCloseToAttribute("ReferenceId", "OutputClaimsTransformation", linePrefix, position)) {
            addSettings = false;
            list = await XmlHelper.GetXmlFilesWithCurrentFile(document).then((files) => {
                return list.concat(XmlHelper.GetElementIDsByNodeName('ClaimsTransformation', files));
            }).then(items => { return items });
        }
        
        // Add the app settigs keys
        if (addSettings) {
            list = list.concat(PolicBuild.GetAllSettings());
        }

        // Sort the array
        list.sort();




        let completionItems: vscode.CompletionItem[] = [];

        list.forEach(function (value) {
            completionItems.push(new vscode.CompletionItem(startsWithCurlyBrackets ? value.substr(1) : value, vscode.CompletionItemKind.Field));
        });

        return completionItems;
    }

}