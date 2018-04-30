# Azure AD B2C extension

The Azure AD B2C extension for VS Code lets you quickly navigate through Azure AD B2C custom policy. Create new elements, such as: technical profiles and claim definition

## Azure AD B2C Custom policy Features
### Custom policy navigator
From the **Custom policy explorer** click on the XML element type and select the element you want to open. Note: custom policy explorer shows elements from  selected file only.
![Custom policy navigator](media/explorer.png)

### Go to definition and find all references
To go any XML element definition. Clt-Click, click F12 or right-click and select **Go to definition** or **Peak definition**. Note: Go to definition navigates you to the source element in the selected file only.

To search for any references in your **Open folder**, select **Find all references** or click Shift+F12.

![Go to definition and find all references](media/goto.png)

### Adding XML elements
You can add following elements to your policy. Note: make sure your cursor is located in the right place.
* B2C Add Identity provider technical profile (shift+ctrl+1)
* B2C Add REST API technical profile (shift+ctrl+2)
* B2C Add Claim Type (shift+ctrl+3)
* B2C Add Application Insights (debug mode) (shift+ctrl+4)

![Adding XML elements](media/commands.png)

### Help and more information
After you run the commends, B2C extension shows you information message with a link to relevant article
![InformationMessage](media/moreinfo.png)

## Disclaimer
The extension is open-source project, published in GitHub. The extension is not part of Azure AD B2C product and it's not supported under any Microsoft standard support program or service. The extension is provided AS IS without warranty of any kind. 
