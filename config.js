import * as firebase from "firebase";
require("@firebase/firestore");
const firebaseConfig = {
    apiKey: "AIzaSyBEnYOojANjvz_sRleGHW5riNj2gs62hM4",
    authDomain: "society-manage-674f7.firebaseapp.com",
    projectId: "society-manage-674f7",
    storageBucket: "society-manage-674f7.appspot.com",
    messagingSenderId: "18112316592",
    appId: "1:18112316592:web:2f2233e5f66db3530ea775",
    measurementId: "G-15EP6YF40S"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
export default firebase.firestore();