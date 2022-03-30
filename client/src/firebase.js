import firebase from "firebase"
const firebaseConfig = {
    apiKey: "AIzaSyBr88dllUZL1La8QhBpbCeP1InSXse6JSs",
    authDomain: "feasti.firebaseapp.com",
    projectId: "feasti",
    storageBucket: "feasti.appspot.com",
    messagingSenderId: "358750292102",
    appId: "1:358750292102:web:33e9a8cfa74de8e050a907",
    measurementId: "G-YVPQE3VQW4"
}
firebase.initializeApp(firebaseConfig)
var auth = firebase.auth()
export default auth;