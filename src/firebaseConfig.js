import firebase from "firebase"

export let firebaseConfig = {
  apiKey: "AIzaSyBZdsVkvqDeSKno32gzWJmavICrOd7510U",
  authDomain: "messenger-64a49.firebaseapp.com",
  databaseURL: "https://messenger-64a49.firebaseio.com",
  projectId: "messenger-64a49",
  storageBucket: "messenger-64a49.appspot.com",
  messagingSenderId: "52924694019",
  appId: "1:52924694019:web:3a9ea693b271a719395836"
}

firebase.initializeApp(firebaseConfig)
const firestore = firebase.firestore()
export { firebase, firestore }

export let uiConfig = {
  signInFlow: "popup",
  signInOptions: [
    firebase.auth.GoogleAuthProvider.PROVIDER_ID,
    firebase.auth.PhoneAuthProvider.PROVIDER_ID,
  ],
  callbacks: {
    signInSuccessWithAuthResult: () => false,
  },
}
