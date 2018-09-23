import * as vscode from 'vscode';

class AppInsightsItem{
	Id: String;
	Tenant: String;
	UserJourney: String;
	OrchestrationStep: String;
	CorrelationId: String;
	Data: String;
	
	constructor(id: String, tenant: String, userJourney: String, orchestrationStep: String, correlationId: String, data: String) {
		this.Id = id;	
		this.Tenant = tenant;	
		this.UserJourney = userJourney;	
		this.OrchestrationStep = orchestrationStep;	
		this.CorrelationId = correlationId;	
		this.Data = data;	
	}
}

export default class ApplicationInsightsExplorerExplorerProvider implements vscode.TreeDataProvider<String> {

	_onDidChangeTreeData: vscode.EventEmitter<String | null> = new vscode.EventEmitter<String | null>();
	readonly onDidChangeTreeData: vscode.Event<String | null> = this._onDidChangeTreeData.event;

	editor: vscode.TextEditor;
	autoRefresh: boolean = false;
	AppInsightsItems: AppInsightsItem[] = [];
	panel;

	constructor(/*private context: vscode.ExtensionContext*/) {

		this.editor = vscode.window.activeTextEditor as vscode.TextEditor;
		vscode.window.onDidChangeActiveTextEditor(() => this.onActiveEditorChanged());
		this.parseTree();
		this.onActiveEditorChanged();
	}

	refresh(elementKey?: String): void {
		this.parseTree();
	}

	onActiveEditorChanged(): void {
		if (this.panel && this.panel.visible)
		{
			vscode.commands.executeCommand('setContext', 'CustomPolicyExplorerEnabled', true);
			this.refresh();
			return;
		}

		if (vscode.window.activeTextEditor) {
			if (vscode.window.activeTextEditor.document.uri.scheme === 'file') {
				const enabled = vscode.window.activeTextEditor.document.languageId === 'xml';
				vscode.commands.executeCommand('setContext', 'CustomPolicyExplorerEnabled', enabled);
				if (enabled) {
					this.refresh();
				}
			}
		} else {
			vscode.commands.executeCommand('setContext', 'CustomPolicyExplorerEnabled', false);
		}
	}

	parseTree(): void {
		this.editor = vscode.window.activeTextEditor as vscode.TextEditor;

		if (this.editor && this.editor.document) {
			var request = require('request');
			
			var config = vscode.workspace.getConfiguration('aadb2c.ai');
			var rowsLimit = config.get('rawsLimit');

			if (!rowsLimit)
			rowsLimit =10;

			var options = {
			  url: 'https://api.applicationinsights.io/v1/apps/' +  config.get('id') + '/events/traces?$top=' + rowsLimit + '&$orderby=timestamp desc&$select=id,trace/message,customDimensions',
			  headers: {
				'X-API-Key': config.get('key')
			  }
			};
			
			function callback(this: ApplicationInsightsExplorerExplorerProvider, error, response, body) {
			  if (!error && response.statusCode == 200) {
				body = body.replace('""','"');
				var info = JSON.parse(body);
				console.log("Application Insights returned: " + info.value.length);
				
				this.AppInsightsItems = [];
				for (var i = 0; i < info.value.length; i++) {
					var element  = info.value[i];
	
					var currentStepIndex =  element.trace.message.indexOf('CurrentStep');
					var currentStep = 'Not specified';
					if (currentStepIndex > 0)
					{
						currentStepIndex = element.trace.message.indexOf(':', currentStepIndex);
						var endOfRaw = element.trace.message.indexOf('\r\n', currentStepIndex);
						currentStep = "Step " + element.trace.message.substring(currentStepIndex + 1, endOfRaw).trim();
					}
	
					this.AppInsightsItems.push(new AppInsightsItem(
						info.value[i].id,
						info.value[i].customDimensions.Tenant,
						info.value[i].customDimensions.UserJourney,
						currentStep,
						info.value[i].customDimensions.CorrelationId,
						element.trace.message
					));
				}
	
				this._onDidChangeTreeData.fire(null)
			  }
			}
			
			request(options, callback.bind(this));
		}


	}
	

	getChildren(parentElementKey?: String): Thenable<String[]> {
		const keys: String[] = [];

		if (!parentElementKey) {
			// Load the root elements (user journeys)
			var distinct: String[] = [];
			for (var i = 0; i < this.AppInsightsItems.length; i++)
			{
				var userJourney = this.AppInsightsItems[i].UserJourney;
				if( distinct.indexOf(userJourney) > (-1)) continue;
				{
					distinct.push(userJourney);
					keys.push("UserJourney|" + userJourney);
				}
			}
		}
		else {
			const elementValues: String[] = parentElementKey.split("|");

			// Load the root elements' (user journeys) children
			if (elementValues[0] == "UserJourney") {

				// Load the list of correction IDs
				var distinct: String[] = [];
				for (var i = 0; i < this.AppInsightsItems.length; i++)
				{
					var correlationId = this.AppInsightsItems[i].CorrelationId;
					if( elementValues[1] != this.AppInsightsItems[i].UserJourney || 
						distinct.indexOf(correlationId) > (-1)) continue;
					{
						distinct.push(correlationId);
						keys.push("CorrelationId|" + correlationId);
					}
				}
			}
			else if (elementValues[0] == "CorrelationId") {
				// Load the list of orchestration steps
				for (var i = 0; i < this.AppInsightsItems.length; i++)
				{
					var correlationId = this.AppInsightsItems[i].CorrelationId;
					if( elementValues[1] != correlationId) continue;
					{
						keys.push("OrchestrationStep|" + this.AppInsightsItems[i].OrchestrationStep + "|" + this.AppInsightsItems[i].Id);
					}
				}
			}

			keys.sort();
		}

		return Promise.resolve(keys);
	}

	getTreeItem(elementKey: String): vscode.TreeItem {

		let treeItem: vscode.TreeItem;
		const elementValues: String[] = elementKey.split("|");

		if (elementValues[0] == "UserJourney") {
			treeItem = new vscode.TreeItem(elementValues[1] as string, vscode.TreeItemCollapsibleState.Expanded);
		}
		else if (elementValues[0] == "CorrelationId") {
			treeItem = new vscode.TreeItem(elementValues[1] as string, vscode.TreeItemCollapsibleState.Collapsed);
		}
		else {

			treeItem = new vscode.TreeItem(elementValues[1] as string, vscode.TreeItemCollapsibleState.None);

			treeItem.command = {
				command: 'ApplicationInsightsExplorer.show',
				title: '',
				arguments: [elementValues[2]]
			};
		}

		return treeItem;
	}

	show(id: String) {

		for (var i = 0; i < this.AppInsightsItems.length; i++)
		{
			if( id != this.AppInsightsItems[i].Id ) continue;
			{
				if (!this.panel)
					this.panel = vscode.window.createWebviewPanel('ApplicationInsightsData', "Application Insights Explorer", vscode.ViewColumn.One, { });

				// And set its HTML content
				this.panel.webview.html = this.getWebviewContent(this.AppInsightsItems[i]);
				

				break;
			}
		}


	}

	getWebviewContent(item: AppInsightsItem) {
		return `<!DOCTYPE html>
	<html lang="en">
	<head>
		<meta charset="UTF-8">
		<meta name="viewport" content="width=device-width, initial-scale=1.0">
		<title>Application Insights Explorer</title>
	<style>
		body.vscode-light {
			color: black;
		}
		
		body.vscode-dark {
			color: white;
		}
		
		body.vscode-high-contrast {
			color: red;
		}
	</style>
	</head>
	<body>
		<h3>User Journey: ` + item.UserJourney + `</h3>
		<h3>Correlation Id :` + item.CorrelationId + `</h3>
		<h3>Orchestration Step: ` + item.OrchestrationStep + `</h3>
		<h3>Id: ` + item.Id + `</h3>
		<textarea type="text"  name="txtarea" style="width:100%;height:100vw">
		` + item.Data + `
		</textarea>
		
	</body>
	</html>`;
	}
}