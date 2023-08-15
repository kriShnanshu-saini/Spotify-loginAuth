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

// Adding firestore database
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-firestore.js";

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
const provider = new GoogleAuthProvider();
const FBprovider = new FacebookAuthProvider();

document.querySelector("[data-logIn-form]").addEventListener("submit", (e) => {
    e.preventDefault();
});

// onAuthStateChanged(auth, (user) => {
//     if (user) {
//         location.replace("sign-up.html");
//     }
// });

// * LOG IN functionality
document.querySelector("[data-log-in]").addEventListener("click", () => {
    const email = document.querySelector("#email-username").value;
    const password = document.querySelector("#password").value;

    signInWithEmailAndPassword(auth, email, password)
        .then(() => {
            window.location.href = 'home.html';
        })
        .catch((err) => {
            document.querySelector(".error-msg").style.display = "flex";

            // TODO: check the email and password value => add error class to the parent of target
        });
});

// * SIGN UP functionality
// document.querySelector("[data-sign-up]").addEventListener("click", () => {
//     const email = document.querySelector("#email-username").value;
//     const password = document.querySelector("#password").value;

//     createUserWithEmailAndPassword(auth, email, password)
//         .then(() => {
//             alert("signed UP");
//         })
//         .catch((err) => {
//             document.querySelector(".error-display").classList.remove("hide");
//         });
// });

// * Google authentication
const signInGoogle = async () => {
    signInWithPopup(auth, provider)
        .then((result) => {
            const user = result.user;
            window.location.href = 'home.html';
        })
        .catch((err) => {
            const errorMessage = err.message;
            alert(errorMessage);
        });
};

document
    .querySelector(".sign-in-w-google")
    .addEventListener("click", signInGoogle);

// * facebook authentication
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

            // IdP data available using getAdditionalUserInfo(result)
            // ...
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

document.querySelector(".sign-in-w-fb").addEventListener("click", fbUserSignIn);

// * github authentication

// * Phone number authentication

// * onAuthStateChanged => redirect to home page

// * show password feature

// * forgot password feature

// * store data in database
// => username
// => email id
// => userId
// => lastLogin
// => created on
