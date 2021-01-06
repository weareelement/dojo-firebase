# Firebase Email and Password Authentication



## Setting up on the console

enable email
- you will then need to setup a register and a login journey



## The Source Code for testing

To the source code of google-auth add a emailSignin method

Use: no need for a provider

Using signInWithEmailAndPassword as an auth method

```
export const emailSignin = (email, password) => {
	firebase.auth.signInWithEmailAndPassword(email, password)
		.then(() => console.log('User successfully signed in with email and password.')
		.catch((error) => console.error('There was an error while signing in with email and password'))
}
```

To register new email accounts use createUserWithEmailAndPassword:

```
export const createEmailSigninAccount = (email, password) => {
	firebase.auth().createUserWithEmailAndPassword(email, password)
		.then(() => console.log('User successfully created an account with email and password'))
		.catch((error) => console.error('There was an error while creating a new user with email and password: ', error)
}
```

## Extra 

Link multiple auth to the same account

https://firebase.google.com/docs/auth/web/account-linking

A more refs for more functionality you can use:

https://firebase.google.com/docs/auth/web/manage-users
