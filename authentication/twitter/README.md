# Firebase Twitter Authentication



## Setting up on the console

enable twitter
- you will need some details:
    - app key
    - app secret

https://developer.twitter.com

From the top right menu click on apps
Create an app
- you will need a website url (eg like your firebae hosting url - or wherever your app is going to sit)
- from firebase console get your firebasehosting url - extention url
- select callback url from firebase console sign in method (twitter)
- fill in twitter app info (url decription etc)
- copy api key and secret key (you wont get a chance to copy them again)
- paste info into firebase console twitter auth settings

## The Source Code for testing

To the source code of google-auth add a xxx method

Use: TwitterAuthProvider()

That's it. Firebase will handle the rest.

```
export const twitterSigning = () => {
	const provider = new firebase.auth.TwitterAuthProvider();
	firebase.auth().signInWithPopup(provider) 
		.then((result) => console.log('successfully logged in', result.user.displayName))
		.catch((error) => console.error('There was an error when signing in with Twitter: ', error));
}
```

## Extra 

Link multiple auth to the same account

https://firebase.google.com/docs/auth/web/account-linking
