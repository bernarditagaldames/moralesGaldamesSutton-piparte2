import app from "firebase/app";
import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyAxQ1hps8QVOdjGIAtQGbu_ZRlAAY18GhM",
  authDomain: "proyectointegrador2-11266.firebaseapp.com",
  projectId: "proyectointegrador2-11266",
  storageBucket: "proyectointegrador2-11266.firebasestorage.app",
  messagingSenderId: "849719999819",
  appId: "1:849719999819:web:e0a32720698ed8378fbcce"
};

app.initializeApp(firebaseConfig);

export const auth = firebase.auth();
export const db = app.firestore();