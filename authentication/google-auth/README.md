# Firebase Google Authentication

https://firebase.google.com/docs/web/setup

Note: signInWithRedirect is recommended for mobile phones

This is using signInWithPopup

## Setting up on the console

You're going to need a firebase project, a firebase web app and the configuration information to connect to firebase using a web based application.

Create a new test project (or select an existing project) on the firebase console https://console.firebase.google.com

Create a new app (or select existing):
- Go to Project Overview section:
- Create a new app (or select an existing app by selecting the app settings - cogwheel icon)
- Note: Get the app's config by selecting the General and scrolling down to the Firebase SDK snippet section - select Config

Enable google authentication:
- select the authentication tab:
- select "getting started" button (if you see one, else continue to next step)
- you will see tabs, select "Sign-in" method tab
- enable google by clicking on the toggle icon next to the google option

## The Source Code for testing

We'll setup an html5 project, with some npm packages.

Setup some dependencies:

Run npm init with the default settings:

    $ npm init -y 
    $ npm install --save-dev parcel-bundler
    $ npm install --save firebase
    $ npm install --save firebase-admin

Install globally:

    $ npm install -g firebase-tools
    $ firebase login
    $ firebase projects:list

Update package.json with a script for start:

    "scripts": {
        ...
        "start": "parcel ./src/index.html."
    },

For more information on parcel:

https://parceljs.org/

Setting up the project:

You would need an html5 index.html file (see the files in the src folder as an example).

For firebase we need to setup:
- get the app config (get this from the firebase console) (save as ./src/firebase/firebaseConfig.js)
- initialise the firebase app with the config you save (see ./src/firebase/firebaseInitialize.js)
- use the GoogleAuthProvider with signInWithPopup (see ./src/firebase/firebaseAuthentication.js)

Review the ./src folder for the files you need to setup
- Note: Don't forget to add your own ./src/firebase/firebaseConfig.js
- firebaseConfig.js is added to gitignore so it won't be in the repo, you have to create it manually

Example contents for firebaseConfig.js:

```
export const firebaseConfig = {
    apiKey: "xxx",
    authDomain: "xxx.firebaseapp.com",
    projectId: "xxx",
    storageBucket: "xxx.appspot.com",
    messagingSenderId: "xxx",
    appId: "xxx"
};
````

In your index.html file reference the ./src/index.js file.

    <script src="index.js"></script>

Now run your app:

    $ npm run start

Visit in your browser:

    http://localhost:1234

Click on the "Sign in" button and you should see a screen popup asking you to sign in with a google account.


## Main code

```
export const googleSignin = () => {
	const provider = new firebase.auth.GoogleAuthProvider();
	firebase.auth().signInWithPopup(provider) 
		.then((result) => console.log('successfully logged in', result.user.displayName))
		.catch((error) => console.error('There was an error when signing in with Google: ', error));
}
```
