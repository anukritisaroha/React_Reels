//use auth provider info here
import {useContext, useEffect, useState} from "react";
import {authContext} from "../auth_provider";
import {auth,storage,firestore} from "../firebase";
import {Redirect} from "react-router-dom";
import "./home.css";
import VideoCard from "./videoCard";

let Home=()=>{
  let user=useContext(authContext);
  let [posts,setPosts]=useState([]);
  //use effect to get ob in firebase along with id and data ie likes comment etc
  useEffect(()=>{
    //on snapshot is add event list..that when we upload video its all data we must get
    let unsub=firestore.collection("posts").onSnapshot((querySnapshot)=>{
      let docArr=querySnapshot.docs;
      let arr=[];
      for(let i=0;i<docArr.length;i++){
        arr.push({
          id:docArr[i].id,
          ...docArr[i].data(),
        })
       
      }
      setPosts(arr);
    });
    return()=>{
      unsub();
    }
    
  },[])
  
    return(
        <>
        {/* agr user ara hai auth_provider file se */}
        {user?"":<Redirect to="/login"/>}
        <div className="video-container">
          {/* due to this we get whole data and then in video jsx we create card for all video url that we have in data */}
          {posts.map((el)=>{
            return <VideoCard key={el.id} data={el}/>
          })}
         
        </div>
      
       
        <button onClick={()=>{
          //signout inbuilt function gives null on logout
          auth.signOut();
      }}className="home-logout-btn">
          logout
      </button>

      {/* input tag to choose file from system ie videos to uploads */}
      <input type="file" onclick={(e)=>{
        e.currentTarget.value=null;
      }}
      onChange={(e)=>{

        //0 index bcz every new file comes on 0 index
        let videoObj=e.currentTarget.files[0];
        let {name,size,type}=videoObj;
        //size does not exceed 10 mb so convert bytes to mb
        size=size/1000000;
        if(size>10){
          alert("file size exceeds");
          return;
        }
        type=type.split("/")[0]
        if(type!=="video")
        {
          alert("please upload video file");
          return;
        }
        //if above both condition satisfy then upload file video to storage in firebase

        //now use storage to store videos and use reference to store videoobj
      
        let uploadTask=storage.ref(`/posts/${user.uid}/${Date.now() + "-" + name}`)
        .put(videoObj);

        //now on change state we will get link of video that we have upload in storage so that by using that link we could save that post video link in database also
        uploadTask.on("state_changed",null,null,()=>{
          //getdownload gives us promise
          uploadTask.snapshot.ref.getDownloadURL().then((url)=>{
            console.log(url);

            //firestore me ek post naam ka folder bnao or vha likes comment name url sb daldo save krado 
            firestore.collection("posts")
            .add({name:user.displayName,url,likes:[],comments:[]})
            //ab firestore me jo url aaya hain toh usse humara ui khud update hota hai ek event se event lgate hai use effect me
          })
        })
      }}/>
    
      </>
    
      
    )
    
}
export default Home;