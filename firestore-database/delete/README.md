# Firebase DB Delete

Use case: Delete data from a firebase db

## Setting up on the console

No console setup, but you can check the console for the deleted data under the user.

## The Source Code for testing

Note: in order to delete firestore data, you need to have the document's id. This id is not part of the doc.data() though and will need to be added when you retrieve the doc.data().

Example:

```
songsCollection.get()
    .then((querySnapshot) => {
        querySnapshot.foreEach((doc) => {
            const songData = { ...doc.data(), id: doc.id };
            songs.push(songData);
        });
        resolve(songs);
    });
```

Delete example:

```
export const deleteSongFromFirestore = (songId) => {
	return new Promise((resolve) => {
		firebase.auth().onAuthStateChanged((user) => {
			if (user) {
				const songDocument = firestoreDb.doc(`users/${user.uid}/songs/${songId}`);
				songDocument.delete()
					.then(() => {
						console.log('The song with an id of $songId} has been deleted successfully');
						resolve();
					})
					.catch(() => {
						console.error('There was an error with deleting this document', error);
						resolve();
					});	
			}
		});
	});
}
```

Global window function (because we're directly manipulating dom with js):

```
window.deleteSong = function(id) {
	deleteSongFromFirestore(id)
		.then(() => window.location.reload());
}
```


Having a delete button:

```
<button onclick="window.deleteSong('${song.id}')">Delete</button>
```

When testing this in your console tools, make sure preserve logs is set, so you don't loose your logs after the screen refreshes.

Delete code snippet:

Code snippet:

```
const songDocument = firestoreDb.doc(`users/${user.uid}/songs/${songId}`);
songDocument.delete();
```

## Extra 



