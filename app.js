const fs = require('fs');
const childProcess = require('child_process');
const express = require('express');
const xml2js = require('xml2js');
const expressApp = express();
const axios = require('axios');
var parser = new xml2js.Parser();
const PORT = '8080';
const path = require('path');
// const bodyParser = require('body')

expressApp.use(express.static('public'));




expressApp.get('/test', (req, res) => {
  var jsonobj = [];
  // console.log(req, 'req');
  fs.readFile(__dirname+ '/subscription_manager.xml',  (err, data) => {
  
    parser.parseString(data, (err, result) => {
      var nodes = result.opml.body[0].outline[0].outline;
      // console.log(nodes);
      
      nodes.forEach( (node, index) => {
        var url = node['$'].xmlUrl;
        url = url.substring(url.indexOf('=') + 1, url.length);
        // console.log(url)
        var channel = 'https://www.youtube.come/channel/' + url;
        var obj = {url, channel};
        // console.log(obj);
        jsonobj.push(obj);
        // console.log(jsonobj.length);
        // console.log(channel)
        // if (index == 1) {
        //   childProcess.exec('open -a "Google Chrome"' + channel);
        // }
  
      });




    });

    console.log(jsonobj[1], jsonobj[10]);
    res.json(jsonobj);
  });



});

expressApp.get('/hello', (req, res) => {
  
  res.sendFile(path.join(__dirname + '/public/index.html'));
});


expressApp.listen(PORT, () => {
  console.log(`The server is running on port ${PORT}`);
});







// The client ID is obtained from the {{ Google Cloud Console }}
// at {{ https://cloud.google.com/console }}.
// If you run this code from a server other than http://localhost,
// you need to register your own client ID.
var OAUTH2_CLIENT_ID = '169253781386-hl4qbggedpm0flfl0h42gcvamej7nns4.apps.googleusercontent.com';
var OAUTH2_SCOPES = [
  'https://www.googleapis.com/auth/youtube'
];

// Upon loading, the Google APIs JS client automatically invokes this callback.
googleApiClientReady = function() {
  gapi.auth.init(function() {
    window.setTimeout(checkAuth, 1);
  });
}

// Attempt the immediate OAuth 2.0 client flow as soon as the page loads.
// If the currently logged-in Google Account has previously authorized
// the client specified as the OAUTH2_CLIENT_ID, then the authorization
// succeeds with no user intervention. Otherwise, it fails and the
// user interface that prompts for authorization needs to display.
function checkAuth() {
  gapi.auth.authorize({
    client_id: OAUTH2_CLIENT_ID,
    scope: OAUTH2_SCOPES,
    immediate: true
  }, handleAuthResult);
}

// Handle the result of a gapi.auth.authorize() call.
function handleAuthResult(authResult) {
  if (authResult && !authResult.error) {
    // Authorization was successful. Hide authorization prompts and show
    // content that should be visible after authorization succeeds.
    $('.pre-auth').hide();
    $('.post-auth').show();
    loadAPIClientInterfaces();
  } else {
    // Make the #login-link clickable. Attempt a non-immediate OAuth 2.0
    // client flow. The current function is called when that flow completes.
    $('#login-link').click(function() {
      gapi.auth.authorize({
        client_id: OAUTH2_CLIENT_ID,
        scope: OAUTH2_SCOPES,
        immediate: false
        }, handleAuthResult);
    });
  }
}

// Load the client interfaces for the YouTube Analytics and Data APIs, which
// are required to use the Google APIs JS client. More info is available at
// https://developers.google.com/api-client-library/javascript/dev/dev_jscript#loading-the-client-library-and-the-api
function loadAPIClientInterfaces() {
  gapi.client.load('youtube', 'v3', function() {
    handleAPILoaded();
  });
}


//Download credentials
 
//Client ID	
//169253781386-hl4qbggedpm0flfl0h42gcvamej7nns4.apps.googleusercontent.com