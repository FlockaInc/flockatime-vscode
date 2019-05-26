// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require('vscode');
const flockatime = require('./flockatime');

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension "flockatime" is now active!');
	vscode.window.setStatusBarMessage('Flockatime Active!');
	// The command has been defined in the package.json file
	// Now provide the implementation of the command with  registerCommand
	// The commandId parameter must match the command field in package.json
	let disposable = vscode.commands.registerCommand('extension.flockatime', function () {
		// The code you place here will be executed every time your command is executed

		// Display a message box to the user
		vscode.window.showInformationMessage('Flocka Flocka!');
	});

	context.subscriptions.push(
		vscode.commands.registerCommand('extension.enterApiKey', function () {
			vscode.window.showInputBox({
				prompt: 'Flockatime API key',
				placeHolder: 'Enter your API key from website',
				value: '',
				ignoreFocusOut: true
			}).then(val => {
				if (val !== '') {
					console.log(val);
					flockatime.setApiKey(val);
				}
			});
		})
	);

	var subscriptions;
	vscode.workspace.onDidSaveTextDocument(flockatime.onSave, this, subscriptions);
	context.subscriptions.push(subscriptions);

	context.subscriptions.push(disposable);

	flockatime.getApiKey().catch(err => {
		console.log('error getting cfg file - likely doesn\'t exist');
	});
}



exports.activate = activate;

// this method is called when your extension is deactivated
function deactivate() { }

module.exports = {
	activate,
	deactivate
}
