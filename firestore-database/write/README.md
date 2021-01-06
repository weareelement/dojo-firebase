# Firebase DB Write

Use case: Write data from a firebase db

## Setting up on the console

No console setup, but you can check the console for the written data under the user.

## The Source Code for testing

## Code

Remember to import firestore so your firebase app object has access to firestore.

Your initialize would need to now include firestore:

```
import firebase from 'firebase/app';
import 'firebase/firestore';

const firebaseConfig =  {
    ...
}

export const firebaseApp = firebase.initializeApp(firebaseConfig);

export const firestoreDb = firebase.firestore();
```

You would add data:

```
import firebase from 'firebase';
import 'firebase/auth';
import 'firebase/firestore';
import { firestoreDb } from './firebaseConfiguration';

export const writeSongToFirestore = (songArtist, songTitle) => {
	const song = {
		songArtist,
		songTitle
	};

	firebase.auth().onAuthStateChanged((user) => {
		if (user) {
			const songsCollection = firestoreDb.collection('users/${user.uid}/songs');
			
			// Add the song to a document in the songs collection and log the document id.
			songsCollection.add(song)
				.then((docRef) => console.log('Song document Id: ', docRef.id)
				.catch((error) => console.error('There was an error while writing a song to firestore.', error);
		}
	});
}

```

Notes:

For

```
const songsCollection = firestoreDb.collection('users/${user.uid}/songs');
```

users/${user.uid}/songs follows the structure of "collection/document/collection"
users = collection, user uid = a document, songs = another collection

You can then use CRUD on that collection you've referenced:

```
collection.add(entry).then((docRef => ...)).catch((error) => ...)
```

## Extra 



