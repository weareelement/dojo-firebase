import firebase from "firebase/app";
import "firebase/auth";

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
