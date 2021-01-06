# Firebase DB Update

Use case: Update data from a firebase db

## Setting up on the console

No console setup, but you can check the console for the data under the user.

## The Source Code for testing

Getting the doc for existing information (just need to pass the doc.id):

```
export const getSongFromFirestore = (songId) => {
	return new Promise((resolve) => {
		firebase.auth().onAuthStateChanged((user) => {
			if (user) {
				const songDocument = firestoreDb.doc(`users/${user.uid}/songs/${songId}`);
	
				songDocument.get()
					.then((doc) => {
						if ( doc.exists ) {
							const songData = { ...doc.data(), id: doc.id };
							resolve(songData);
						}
					})
					.catch((error) => {
						console.error('There was an error while trying to get song with id ${singId}',
						error);
						resolve();
					})
			}
		}	
	});
}
```

Plain js getting query params:

```
const editSongForm = document.getElementById('edit-tune-form');
if (editSongForm) {
	const searchParams = new URLSearchParams(location.search);
	const songId = searchParams.get('id');
	getSongFromFirestore(songId)
		.then((song) => {
			editSongForm.elements['song-id'].value = song.id;
			editSongForm.elements['artist-input-edit'].value = song.songArtist;
			editSongForm.elements['song-title-input-edit'].value = song.songTitle;
		});
}
```

Updating doc example:

```
export const updateSongInFirebase = (song) => {
	firebase.auth().onAuthStateChanged((user) => {
		if (user) {
			// Assign the reference to the song document using songId
			const songDocument = firestoreDb.doc(`users/${user.uid}/songs/${song.id}`);

			// Create a new song object
			const updateSong = {
				songArtist: song.songArtists,
				songTitle: song.songTitle
			}

			// Update the song with the new song object including songArtist and songTitle
			songDocument.update(updateSong)
				.then(() => console.('Your song was updated successfully: ', song))
				.catch((error) => console.error('There was an error while updating your song: ', song, error);
		}
	}
}
```

DOM - using onSubmit to submit updates to firebase:

```
const editSongForm = document.getElementById('edit-tune-form');
if (editSongForm) {
	const searchParams = new URLSearchParams(location.search);
	const songId = searchParams.get('id');
	getSongFromFirestore(songId)
		.then((song) => {
			// Populate the form with song artist, song title and song id
			editSongForm.elements['song-id'].value = song.id;
			editSongForm.elements['artist-input-edit'].value = song.songArtist;
			editSongForm.elements['song-title-input-edit'].value = song.songTitle;
		});

	// Create on submit function
	editSongForm.onsubmit = (event) => {
		event.preventDefault();
		const id = event.target['song-id'].value;
		const songArtist = event.target['artist-input-edit'].value;
		const songTitle = event.target['song-title-input-edit'].value;
		const song = { id, songArtist, songTitle };
		updateSongInFirebase(song);
	}
}
```

Notes:

When updating data make sure the fields match the fields in firebase else firebase will create new fields. 

Another note:

The update in firestore will only update the fields you pass it. If you pass it only one field, it will only update one field and leave the rest as is.

## Extra 



