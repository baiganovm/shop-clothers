import firebase from "firebase/app";
import 'firebase/firestore';
import 'firebase/auth'

const config = {
    apiKey: "AIzaSyAHGYDuDn6uAj2ginxQWQvFvOXajNf_5fk",
    authDomain: "clothes-shop-5b6d9.firebaseapp.com",
    databaseURL: "https://clothes-shop-5b6d9.firebaseio.com",
    projectId: "clothes-shop-5b6d9",
    storageBucket: "clothes-shop-5b6d9.appspot.com",
    messagingSenderId: "862838606979",
    appId: "1:862838606979:web:ddbacbba1c22a064b8dfb6",
    measurementId: "G-JZWM0H2QHS"
};

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({prompt: 'select_account'});
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;

export const createUserProfileDocument = async (userAuth, additionalData) => {
    if (!userAuth) return;

    const userRef = firestore.doc(`users/${userAuth.uid}`);

    const snapshot = await userRef.get();

    if (!snapshot.exists) {
        const {displayName, email} = userAuth;
        const createdAt = new Date();

        try {
            await userRef.set({
                displayName,
                email,
                createdAt,
                ...additionalData
            })
        } catch (error) {
            console.log('error creating user', error.message);
        }
    }

    return userRef;
};
