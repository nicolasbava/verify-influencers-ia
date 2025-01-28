import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyDYKuUJTD75ej_qzpyYDiyz64PuB8436oA",
    authDomain: "verify-influencers-ia.firebaseapp.com",
    databaseURL: "https://verify-influencers-ia-default-rtdb.firebaseio.com",
    projectId: "verify-influencers-ia",
    storageBucket: "verify-influencers-ia.firebasestorage.app",
    messagingSenderId: "644992018096",
    appId: "1:644992018096:web:713b50dc45eb326bab3d75",
    measurementId: "G-GLB3C7F90G"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
