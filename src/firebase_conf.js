import firebase from "firebase";
import "firebase/auth"
const firebaseConfig = {
    // Your web app's Firebase configuration
    apiKey: "AIzaSyClwEbMWbfz4DpIYLQofeCMyxHyX83SK9w",
    authDomain: "vue-uni-app.firebaseapp.com",
    projectId: "vue-uni-app",
    storageBucket: "vue-uni-app.appspot.com",
    messagingSenderId: "965253482447",
    appId: "1:965253482447:web:e40d674242abdd3a53f4ba"
}

const Firebase = firebase.initializeApp(firebaseConfig);
const db = Firebase.firestore()
export {
    db,
    Firebase
}
db.settings({ timestampsInSnapshots: true })