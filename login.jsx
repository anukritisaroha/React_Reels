import { useEffect,useContext } from "react";
import { auth, signInWithGoogle } from "../firebase";
import { Redirect } from "react-router";
import {authContext} from "../auth_provider";



let Login=()=>{
    let user=useContext(authContext);

    return(
        <>
        {user ? <Redirect to="/"/>:""}
        {/* //in class i use bootstrap */}
        <button onClick={()=>{
            //call from firebase it will show popup to signin
            signInWithGoogle();
        }}
        className="btn btn-primary mt-4">Login with Google</button>
        
        </>
    )
    
}
export default Login;