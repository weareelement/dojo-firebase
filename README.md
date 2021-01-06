# dojo-firebase
A dojo project for running through firebase examples

# Creating a firebase project

To start with, creat a new firebase project in the firebase console:

    https://console.firebase.google.com

You don't need to Enable Google Analytics for this project for these dojo exercises - it's your choice if you'd like to have this or not.

# Creating a firebase project with plain html & javascript

mkdir soundchat
npm -v
npm init -y // using default values
code .
mkdir src
touch index.html
- add boilderplate html code
Using parcel
npm install -- save-dev parcel-bundler

In the scripts of your package.json add parcel script for "start"

...
"scripts": {
    "start": "parcel ./src/index.html --no-cache"
}

Should be running on http://localhost:123

Basic layout:

setup styles and scripts (test script with a console.log)
add html pages
Setup a main html structure
- Copy index.html and then make a template with a navigation, the styles and scripts
- copy this page over to all the html pages

Installing the firebase cli:
- npm install -g firebase-tools
- firebase --version

Some commands you can use:

- firebase login
- firebase projects:list

On console creat a new app - Select the web app option
- firebase will give you the javascript to add to your html pages
- go to app settings and change the public facing name
- you can go to your apps information after creating and view "config"
    - going to use config to connect to an app
- $ npm install firebase
- $ mkdir firebase
- $ touch firebaseConfiguration.js
import firebase from "firebase";

const firebaseConfig = {
	apiKey: "asdfasd",
	....
};



export const firebaseApp = firebase.initialiseApp(firebaseConfig);


Preparing for hosting:

...
"scripts": {
    "start": "parcel ./src/index.html --no-cache"
    "build": "parcel build ./src/index.html --out-dir build"
}

$ npm run build

$ firebase init

Select:
- Firebase
- Hosting
- Storage
Select use an existing project. Select your project you created for this.
Leave rules file as firestore.rules
Leave indexes as firestore.indexes
Select "build" as the hosting file
Select "N" for single page app, this is not a single page app

We now have files: firebaserc, firebase.json, firebase.indexes.json, firebase.rules, and storage.rules. 

Run:
$ firebase deploy

The output will give you a hosting url.
Copy hosting url and show in web browser



# Creating a firebase project with react



# Creating a firebase project with teact-native


