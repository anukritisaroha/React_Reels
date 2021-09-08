import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyDPXvFSq6Q4ccUi6gRqNwrCY5PyR7sTIHw",
    authDomain: "reels-14b9f.firebaseapp.com",
    projectId: "reels-14b9f",
    storageBucket: "reels-14b9f.appspot.com",
    messagingSenderId: "494391526285",
    appId: "1:494391526285:web:316107f6fb15442578b3c4"
  };
//connect particular firebase with our react project the firebase that we have made on cloud platform
//we have use firebase bcz it has alot of services that we can use in react project
  firebase.initializeApp(firebaseConfig);

  //flag using google
  let provider=new firebase.auth.GoogleAuthProvider();

  //obj jiske andr login signup logout
  export const auth=firebase.auth();
  //to store data in firebase
  export const firestore=firebase.firestore();
  //to store video raw data
  export const storage=firebase.storage()


  //make function and use in login that show popup of google signin
  export const signInWithGoogle=()=>{
    //signin hoga using google provider
    auth.signInWithPopup(provider);
  }


  export default firebase;
