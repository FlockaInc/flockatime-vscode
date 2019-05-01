const vscode = require('vscode');
var firebase = require("firebase/app");
const fs = require('fs');

// Add the Firebase products that you want to use
require("firebase/auth");
require("firebase/database");

var config = {
  apiKey: "AIzaSyDHAQNOMMsN4OfyE3V14tdcXZczWHMAahc",
  authDomain: "flocka-time.firebaseapp.com",
  databaseURL: "https://flocka-time.firebaseio.com",
  projectId: "flocka-time",
  storageBucket: "flocka-time.appspot.com",
  messagingSenderId: "176647479098"
};
firebase.initializeApp(config);

var apiKey = '';

function onSave() {
  var saveObj = {
    timestamp: firebase.database.ServerValue.TIMESTAMP
  };

  if (apiKey !== undefined && apiKey !== null && apiKey !== '' && apiKey !== '\n') {
    console.log('logging to db');
    console.log(apiKey);
    firebase.database().ref('/flockalogs/users/' + apiKey).push(saveObj);
    vscode.window.showInformationMessage('Flockalog');
  } else {
    getApiKey().then(key => {
      if (key !== undefined && key !== null && key !== '' && key !== '\n') {
        firebase.database().ref('/flockalogs/users/' + key).push(saveObj);
        vscode.window.showInformationMessage('Flockalog');
      } else {
        vscode.window.showErrorMessage('Please enter an API key using the command "Flockatime: API Key');
      }
    }).catch(err => {
      vscode.window.showErrorMessage('Please enter an API key using the command "Flockatime: API Key');
      console.log('error getting cfg file - likely doesn\'t exist');
    });
  }
}

function setApiKey(key) {
  var home = getHomeDir();
  console.log(home);
  fs.writeFile(home + '/.flockatime.cfg', key, function (err) {
    if (err) {
      throw err;
    }
  });
}

function getHomeDir() {
  return process.env.HOME || process.env.HOMEPATH || process.env.USERPROFILE;
}

function getApiKey() {
  return new Promise((resolve, reject) => {
    var home = getHomeDir();
    fs.readFile(home + '/.flockatime.cfg', 'utf-8', (err, key) => {
      if (err) {
        reject(err);
      }
      apiKey = key;

      resolve(key);
    });
  })

}

module.exports = {
  onSave,
  setApiKey,
  getApiKey
}