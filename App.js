import Home from "./components/home";
import Login from "./components/login";
import {BrowserRouter as Router, Switch,Route} from "react-router-dom";
import AuthProvider from "./auth_provider";
import {firestore} from "./firebase";
import { useEffect } from "react";
let App=()=> {

  //  useEffect(()=>{
    //firestore working
    //add
    // firestore.collection("users").add({body:"this value"});
    //get value promise based functn use await
    // async function f(){
    //   let querySnapshot=await firestore.collection("users").get();
    //   //docs gives data that is available
    //   for(let i=0;i<querySnapshot.docs.length;i++){
    //     console.log(querySnapshot.docs[i].data())
    //   }

    // }
    // f();

    //to get single data from firebase storage
  //   let f=async()=>{
  //     //find corress to id single data
  //     let docRef=firestore.collection("users").doc("0tvK6bShSafk6V2hgQ37")
  //     let docSnapshot=await docRef.get();
  //     console.log(docSnapshot.data());
  //   };
  //   f();
  // },[]);
  return (
 
   <>
   {/* we have use authprovider here so that its children can be access as props  */}
   <AuthProvider>
   <Router>
     <Switch>
       <Route exact path="/login"
       ><Login/></Route>
       <Route exact path="/"><Home/></Route>
     </Switch>
   </Router>
   </AuthProvider>
   </>
    
  );
  
}

export default App;
