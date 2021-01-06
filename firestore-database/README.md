# Firebase Hosting


## Console 

On the firebase console, you can click the database
- Real timedatabase was the original db
- Firestore database is the new improved db
    - by default locked mode (no read or write allowed)
    - if you select start in test mode you have an open db for all users (read & write allowed)
        - to start with select test mode

Rules
- if you inspect the rules tab you'll see the rules again that were created when you created the db - you can update these

Indexes
- if you inspect the indexes tab of the db you can manage your indexes

## NoSql Data

A quick note: On the code side you use one big firebase object

Documents are organized into collections
Each document can be referenced or connected to many other documents

This structure can be nested, but always as documents into collections with contain documents as collections which contain documents as collections etc. 

"A good rule of thumb is that each document should only contain data for one item or thing,
and each collection connected to that document should contain data related to that document.
Remember that a document can only have fields of data and a sub-collection.

The sub-collection can then contain more documents. A document can never contain another document directly. "

    
## CRUD

As a start let's take a look at the basic CRUD features:

- write
- read
- delete
- update


## Code

Remember to import firestore so your firebase app object has access to firestore.

```
import firebase from 'firebase/app';
import 'firebase/firestore';

const firebaseConfig =  {
    ...
}

export const firebaseApp = firebase.initializeApp(firebaseConfig);

export const firestoreDb = firebase.firestore();
```

### Notes on db code


Retrieving collections you use this syntax:

```
const collection = firestoreDb.collection(`users/${user.uid}/songs`);
```

users/${user.uid}/songs follows the structure of "collection/document/collection"
users = collection, user uid = a document, songs = another collection

You can then use CRUD on that collection you've referenced:

```
collection.add(entry).then((docRef => ...)).catch((error) => ...)
```

Firestore will also automatically create the docs and data structures if they dont exist yet.


## Parcel updates

Updates to parcel:

After adding new html files you need to tell parcel to bundle all html files not just index.html

```
"scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "start": "parcel ./src/*.html --no-cache",
    "build": "parcel build ./src/*.html --out-dir build"
},
```

There is a gotcha though, you now need to explicitly state html pages:

http://localhost:1234/index.html

