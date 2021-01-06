# Firebase Facebook Authentication



## Setting up on the console

enable facebook
- you will need some details:
    - app id
    - app secret

https://developers.facebook.com/

Sign in 
Create app
- copy app id
- click on settings, select basic
- copy secret 

In firebase console you have a oauth redirect url to provide facebook with
- go back to your facebook dashboard - select facebook login - click setup
- click on settings - paste oauth redirect uri into the "valid oath redirect uris" textbox

## The Source Code for testing

To the source code of google-auth add a facebookSignIjn method

Use: FacebookAuthProvider()

That's it. Firebase will handle the rest.

```
export const facebookSignin = () => {
	const provider = new firebase.auth.FacebookAuthProvider();
	firebase.auth().signInWithPopup(provider) 
		.then((result) => console.log('successfully logged in', result.user.displayName))
		.catch((error) => console.error('There was an error when signing in with Facebook: ', error));
}
```

## Extra 

Link multiple auth to the same account

https://firebase.google.com/docs/auth/web/account-linking
