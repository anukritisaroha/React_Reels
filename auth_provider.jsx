//this is a auth provider in this we use context so that we can use context in its children
//we can use this context in any children we want ie home,login
import { createContext ,useState,useEffect} from "react";
import {auth,firestore} from "./firebase";
export const authContext=createContext();

let AuthProvider=(props)=>{
    let [user,setUser]=useState(null);//whole data abt user came here we can access this context anywhere
    let [loading,setLoading]=useState(true);

    useEffect(()=>{
        //on change state set krdo or unsubscribe krdo or jb task login logout ho jae loading false krdo
        //async function bcz await use
        let unsub=auth.onAuthStateChanged(async (user)=>{
            if(user){
                let {displayName, email, uid, photoURL}=user;
                //to store all value in database of firebase
                let docRef=firestore.collection("users").doc(uid);
                let documentSnapshot = await docRef.get()
                //if uid exists in database ok if not make it and store all values
                if (!documentSnapshot.exists){
                    docRef.set({
                        displayName,
                        email,
                        photoURL
                    })
                }





              setUser({displayName, email, uid, photoURL});
            }else{
                setUser(null);
            }
            setLoading(false);
        });
        //unsubscribe cleanup functn
        return()=>{
            unsub();

        }
    },[]);
    //return authprov to home and login where we want user value
    return(
        <authContext.Provider value={user}>
            {!loading && props.children}
        </authContext.Provider>
    )


}
export default AuthProvider;
