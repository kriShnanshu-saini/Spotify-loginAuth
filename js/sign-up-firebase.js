//   Insert this script at the bottom of the HTML, but before you use any Firebase services
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-app.js";

// If you enabled Analytics in your project, add the Firebase SDK for Google Analytics
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-analytics.js";

// Add Firebase products that you want to use
import {
    getAuth,
    onAuthStateChanged,
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    GoogleAuthProvider,
    FacebookAuthProvider,
    signInWithRedirect,
    getRedirectResult,
    signInWithPopup,
} from "https://www.gstatic.com/firebasejs/10.1.0/firebase-auth.js";

const firebaseConfig = {
    apiKey: "AIzaSyBx0bSFTQwB7-kp7KNnqdZ3PuYsOawwbD8",
    authDomain: "spotify-loginauth.firebaseapp.com",
    databaseURL: "https://spotify-loginauth-default-rtdb.firebaseio.com",
    projectId: "spotify-loginauth",
    storageBucket: "spotify-loginauth.appspot.com",
    messagingSenderId: "725717846358",
    appId: "1:725717846358:web:a61a9b686c5c33114deef7",
    measurementId: "G-P39CGK77P7",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth();
const Gprovider = new GoogleAuthProvider();
const FBprovider = new FacebookAuthProvider();

// * SIGN UP functionality
document.querySelector("[data-sign-up]").addEventListener("click", () => {
    const email = document.querySelector("#email").value;
    const password = document.querySelector("#password").value;

    createUserWithEmailAndPassword(auth, email, password)
        .then(() => {
            window.location.href = 'home.html';
        })
        .catch((err) => {
            alert(err.message);
        });
});

// * sign up using google
document.querySelector(".sign-up-w-google").addEventListener("click", async() => {
    signInWithPopup(auth, Gprovider)
        .then((result) => {
            // This gives you a Google Access Token. You can use it to access the Google API.
            const credential = GoogleAuthProvider.credentialFromResult(result);
            const token = credential.accessToken;
            // The signed-in user info.
            const user = result.user;
            // IdP data available using getAdditionalUserInfo(result)
            // ...
            window.location.href = 'home.html';
        })
        .catch((error) => {
            // Handle Errors here.
            const errorCode = error.code;
            const errorMessage = error.message;
            // The email of the user's account used.
            const email = error.customData.email;
            // The AuthCredential type that was used.
            const credential = GoogleAuthProvider.credentialFromError(error);
            // ...
        });
});

// * sing up using facebook
const fbUserSignIn = async () => {
    signInWithPopup(auth, FBprovider)
        .then((result) => {
            // The signed-in user info.
            const user = result.user;

            // This gives you a Facebook Access Token. You can use it to access the Facebook API.
            const credential =
                FacebookAuthProvider.credentialFromResult(result);
            const accessToken = credential.accessToken;
            window.location.href = 'home.html';
        })
        .catch((error) => {
            // Handle Errors here.
            const errorCode = error.code;
            const errorMessage = error.message;
            // The email of the user's account used.
            const email = error.customData.email;
            // The AuthCredential type that was used.
            const credential = FacebookAuthProvider.credentialFromError(error);

            alert(errorCode, errorMessage, email, credential);
            // ...
        });
};

document.querySelector(".sign-up-w-fb").addEventListener("click", fbUserSignIn);

