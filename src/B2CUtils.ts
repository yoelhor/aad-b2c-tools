// Adding ADAL for Policy Upload
import * as adal from 'adal-node';
import { window } from 'vscode';
import * as vscode from 'vscode';
import Consts from './Consts';

interface PolicyInfoObj {
    PolicyId: string,
    TenantId: string;
}

export default class B2CUtils {


    // Gets the Tenant ID and Policy ID from the Open Document
    static getPolicyInfo() : PolicyInfoObj
    {
        var DOMParser = require('xmldom').DOMParser;
        let editor = window.activeTextEditor;
        var xmldata = "";
        if (editor) {
            let doc = editor.document;
            xmldata = doc.getText();
        }

        try {
            
        var xmlDoc = new DOMParser().parseFromString(xmldata);
        var Polid = xmlDoc.getElementsByTagName("TrustFrameworkPolicy")[0].getAttribute("PolicyId")
        var tenantID = xmlDoc.getElementsByTagName("TrustFrameworkPolicy")[0].getAttribute("TenantId")
        } catch (error) {
                vscode.window.showErrorMessage("Error retrieveing PolicyId and TenantId from Policy File. Please ensure the file being uploaded is a valid B2C Policy file.");
                throw Error;
        }

        var rtnobj = {
            PolicyId: Polid ,
            TenantId: tenantID
        };

        return rtnobj;
    }


    static getB2CAPIClientID(context: vscode.ExtensionContext ) {

        var clientID  = "";
        if(!context.globalState.get("ClientId"))
        {
            vscode.window.showInputBox({ prompt: "You do not have a clientID set Please enter one:" })
                .then(result => {
                    if (!result)
                        return Promise.reject('user cancelled');
        
                        clientID = result;
                        context.globalState.update("ClientId",clientID)
                });
        }
        else{
            clientID =  "" + context.globalState.get("ClientId");
        }
        return clientID;
    }

    static async uploadpolicy(tokenResponse: adal.TokenResponse, PolicyId: string) {
        var tr = tokenResponse as adal.TokenResponse;
        var at = tr.accessToken;
        console.log(tr.accessToken);
    
        var docContent = "";
        console.log(" upload policy");
        let editor = window.activeTextEditor;
        if (editor) {
            let doc = editor.document;
            docContent = doc.getText();
    
        }
    
             
        var rp = require('request-promise');
    
        var bearertoken = "Bearer " + at;
    
        const options = {
          method: "PUT",
          uri: Consts.B2CGraphEndpoint + PolicyId + "/$value",
          headers: {
            "Authorization": bearertoken,
            "Content-Type": "application/xml"
          },
          body: docContent ,
          json: false
        };
        
                               
         vscode.window.withProgress({
            location: vscode.ProgressLocation.Notification,
            title: "Uploading Policy (" + PolicyId + ")...",
            cancellable: true
        },
        async (progress) => {await rp(options)
          .then((r: any) => {
                console.error("Upload success.")
                vscode.window.showInformationMessage("Upload success",)
            })
           .catch((err: any) => {
                var respErr  = JSON.parse(err.error);
                console.error(err);
                console.error("Upload failed: " + respErr.error.message)
                vscode.window.showErrorMessage(respErr.error.message);
           })
           
        });
    }
    

}