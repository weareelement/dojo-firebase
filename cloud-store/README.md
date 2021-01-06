# Cloud Store

Cloud file system - store files - eg audio files, videos

## Console 

On the firebase console, you can click the Storage option
- 

If you dont have cloud storage setup yet you can click get started
- set your security rules
- to start off with, you can leave as is with allowing any authenticated users to view their files

Once your file storage is initiliazed you can view
- files
- rules - update the security rules
- usage - stored, requests, bandwidth etc
    
## Upload files

source code

input:

```
<input id="song-file" type="file" />
```

retrieve input value in js:

```
const songFile = event.target['song-file'].files[0];
```

Update the writeSongToFireStore to also use songFile:

```
writeSongToFireStore(songArtist, songTitle, songFile);
```

Using the firebase cloud storage service:

```
import fireabse from 'firebase';
...
import 'firebase/storage';
...
export cloudStorage = firebase.storage();
```

Then import cloudStorage in your app, example:

```
...
import { firestoreDb, cloudStorage } from './firebaseConfiguration'
...
```

You can retrieve the song file name using: songFile.name

Save this in the db:

```
const song = {
    songArtist,
    songTitle,
    songFileName: songFile.name
}
```

In the success then of the writeSongToFireStore songCollection.add(...) method trigger the saveSongFile(docRef.id, songFile);

```
...
import { ..., cloudStorage } from './firebaseConfiguration';
...
const saveSongFile = (docRefId, songFile) => {
    // Create a reference to the file path in Cloud Storage.
    // This will create the path if it does not already exist.
    const fileRef = cloudStorage.ref(`songs/${docRefId}-${songFile.name}`)
    
    // Upload the file to Cloud Storage
    const uploadTask = fileRef.put(songFile);

    // You now have some observers to work with
    // 3 observers in this case

    uploadTask.on('state_changed', 
        // The progress funciton can indicate how many bytes have been transferred
        function progress(snapshot) {
            console.log('Bytes transferred: ', snapshot.bytesTransferred);
            console.log('Total bytes: ', snapshot.totalBytes);
        }

        // The error function will be called if there is an error while the file is uploading
        function error(error) {
            console.error('There was an error while saving to Cloud Storage: ', error);
        }

        // The complete function will be called once the upload has completed
        function complete() {
            console.log('File successfully saved to Cloud Storage');
        }
    )
}
```

You can now test this in an html form passing the songFile from the input type fiole. And test the file is saved on the firebase storage side.

A note: Referencing cloud storage files:

```
const fileRef = cloudStorage.ref('songs/mysong.mp3');
```

Bonus:

Check upload progress with:

```
const uploadTask = fileRef.put(songFile);
```


## Downloading from Cloud Storage

Fetch file from firestore:

```
export const getAudioFromStorage = (fileName) => {
    return new Promise((resolve) => {
        // Get the reference to the file in Cloud Storage
        const fileRef = cloudStorage.ref(`songs/${fileName}`);

        // Get the URL for the song file in Cloud Storage
        fileRef.getDownloadURL()
            .then((url) => resolve(url))
            .catch((error) => console.error('There was an error while retrieving a file from Cloud Storage', error))
    })
}
```

import this constant into the index.js, or where you want to use the function

Use the fileurl in the dom:

html - listen.html

```
<audio id="audio-component" controls></audio>
```

js

```
const audioElement = document.getElementById('audio-component');
if (audioElement) {
    const searchParams = new URLSearchParams(location.search);
    const fileName = searchParams.get('filename');
    getAudioFromStorage(fileNames)
        .then((fileUrl) => {
            audioElement.setAttribute('src', fileUrl);
        })
}
```

On the firestore side, make sure you have a song file uploaded, manually copy the file and then test it by using this full urr:

    localhost:1234/listen.html?filename=xxx

Replacing the xx with your filename


## Security rules

If you look at this default security rules under storate on the firebase console:

```
service firebase.storage {
    match /b/{bucket}/o {
        match /{allPaths=**} {
            allow read, write: if request.auth!=null;
        }
    }
}
```

This gives any logged in user the ability to do anything with anyone's data

You can test the rules using the rules playground.
- you can select authenticated or not authenticated

A way to identify files for users is to make sure their files are saved in a folder using the user id as the folder name.

Edit our code:

```
// Inside writeSongToFireStore function:
...
saveSongFile(user.uuid, docRef.id, songFile);
...
// Inside saveSongFile function:

const saveSongFile = (userId, docRefId, songFile) => {
    ...
    const fileRef = cloudStorage.ref(`songs/${userId}/${docRefId}-$(songFile.name}`)
    ...
}

// Inside index.js of where you edit the dom:
...
    const userId = searchParams.get('userid');
    getAudioFromStorage(userId, fileName);
    ...

// Inside getAudioFromStorage function:
export const getAudioFromStorage = (userId, fileName) => {
    ...
    const fileRef = cloudStorage.ref(`songs/${userId}/${fileName}`)
    ...
}

```

Now that we have our files in a user named folder, we can update our security rules:

```
service firebase.storage {
    match /b/{bucket}/o {
        match /songs/{allPaths=**} {
            allow read, write: if request.auth!=null;
        }

        match /songs/{userId}/{allPaths=**} {
            allow write: if request.auth.uid == userId; 
        }
    }
}
```


Docs:

https://firebase.google.com/docs/firestore/security/rules-structure