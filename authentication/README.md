# Firebase Authentication

Official docs: https://firebase.google.com/docs/auth/

## Console 

On the firebase console, you can click the Authentication section
- enable the signin methods of your choice

# Auths

## Email / Password

Make sure you have the singin method of email and password enabled.

You can then manually create a user by clicking the Add User option with an email and password

An important piece of information for mapping data against a user is the user id value

To add custom behaviour click on the templates tab. You can select behaviours like 

- Send an email to a user once they have registered

## Auth with google 

View the README.md in the google-auth folder

One of the easiest signins to setup with firebase

- enable google auth if not yet enabled

The example in the google-auth folder

## Auth with facebook 



## Auth with twitter 


## Auth with email 

# Extra 

Link multiple auth to the same account

https://firebase.google.com/docs/auth/web/account-linking


# Notes

onAuthStateChanged will pass you a user object 

```
firebase.auth().onAuthStateChanged((user) => {
    if (user) {
        ...
    }
});
```