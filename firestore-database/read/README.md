# Firebase DB Read

Use case: Read data from a firebase db

## Setting up on the console

No console setup, but you can check the console for the data under the user.

## The Source Code for testing

Notes on reading data:
When you get data with firebase you get a querySnapshot as a response. This snapshot is a list of documents in the collection you requested. 

Reading data: 

```
export const readSongsFromFirestore = () => {
	firebase.auth().onAuthStateChanged((user) => {
		if (user) {
			const songsCollection = firestoreDb.collection(`users/${user.uid}/songs`);

			// Get all song documents for the song collection
			songsCollection.get()
				.then((querySnapshot) => {
                    querySnapshot.foreEach((doc) => {
                        console.log('Song document: ', doc.data());
                    });
				});
		}
	});
}
```

Using a promise to return data, update the above code with a promise that will resolve with the songs data:

```
export const readSongsFromFirestore = () => {
	return new Promise((resolve) => {
		firebase.auth().onAuthStateChanged((user) => {
			if (user) {
				const songs = [];

				const songsCollection = firestoreDb.collection(`users/${user.uid}/songs`);

				// Get all song documents for the song collection
				songsCollection.get()
					.then((querySnapshot) => {
						querySnapshot.foreEach((doc) => {
							songs.push(doc.data());
						});
						resolve(songs);
					})
                    .catch(error => console.error('unable to retrieve document));
			]
		}
	});
}
```

Manipulating the dom:

firebaseRepository.js

```
const mySongsComponent = document.getElementById('my-songs-component');
// make sure the dom element exists before retrieving data
if (mySongsComponent) {
	readSongsFromFirestore()
		.then((songs) => {
			songs.forEach(song) => {
				addSongToMySongs(mySongsComponent, song);
			});
		});
}
```

utilities.js

```
export const addSongToMySongs = (mySongsComponent, song) => {
	const songContainer = document.createElement('div');
	songContainer.setAttribute('class', 'song-container');
	
	songContainer.innerHTML = `
		<h3>${song.songTitle} by ${song.songArtist}</h3>
		<div>
			<button>Edit</button>
			<button>Delete</button>
		</div>
	`;
	
	mySongsComponent.append(songContainer);
}
```

## Extra 

Code snippet:

```
songsCollection.get()
    .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            console.log(doc.data())
        });
    });
```


