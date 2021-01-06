# Firebase Anonymous Authentication

Use case: Comments section

## Setting up on the console

enable anonymous authentication

## The Source Code for testing

To the source code of google-auth add a emailSignin method

Use: no need for a provider

Using signInAnonymously as an auth method

```
export const anonymousSignin = () => {
	firebase.auth().onAuthStateChanged((user) => {
        if (!user) {
            firebase.auth().signInAnonymously()
                .then(() => console.log('User successfully signed in anonymously'))
                .catch((error) => console.error('There was an error while signing in anonymously: ', error));
        }
	}
}
```

A note on this,the firebase user object will now also have a user.isAnonymous value.
So you can check if a user is not logged in or anonymous.

Example:

```
// Observable - will trigger whenever the state changes
export const handleOnAuthStateChange = () => {
    firebase.auth().onAuthStateChanged((user) => {
        console.log("On Auth State Changed: ", user);
        if (user && !user.isAnonymous) {
            // trigger logged in things
            console.log("User is logged in");
        }
    });
}
```

## Extra 

Link multiple auth to the same account

https://firebase.google.com/docs/auth/web/account-linking


