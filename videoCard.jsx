import { useContext, useEffect, useState } from "react"
import "./videoCard.css";
import {authContext} from "../auth_provider";
import {firestore} from "../firebase";
let VideoCard=(props)=>{
    //to pause and play video on click

    let[playing,setPlaying]=useState(false);
    //to open nd close comment box
    let[comment,setComment]=useState(false);
    let user=useContext(authContext);
    let [currusercomm,setCurrcomm]=useState("");
    let [comments,setComments]=useState([]);
    let curruserliked;
    if(user){
        curruserliked=props.data.likes.includes(user.uid);
    }
    
    //use effect so that comments can be seen seen in cmmt section take from firestore the commentsarr data
    useEffect(()=>{
        let f=async()=>{
            let commentsArr=props.data.comments;
            let arr=[];
            for(let i=0;i<commentsArr.length;i++){
              let commDoc= await  firestore.collection("comments").doc(commentsArr[i]).get();
              arr.push(commDoc.data());
            }
            setComments(arr);
        }
        f();
    },[props])

    return(
        <div className="video-card">
            <p className="video-card-username">{props.data.name}</p>
            <span className="video-card-music">
                {/* music icon and marquee to show moving song className */}
                
                <span class="material-icons-outlined">
                 music_note
                 </span>
                <marquee>Some song</marquee>
            </span>
            <span onClick={(e)=>{
                if(comment){
                    setComment(false)
                }
                else{
                    setComment(true);
                }
            }} className="material-icons-outlined video-card-comment">chat</span>
            <span className="material-icons-outlined video-card-like" onClick={()=>{
                 let likesarr=props.data.likes
                //if liked uid present on ui true else false
                //like unlike here is done based on firestore likes arr
                if(curruserliked){
                   
                    likesarr=likesarr.filter((el)=>
                        el!=user.uid
                    )
                   
                    //likes arr me id hogi curr user ki agr vo match kregi toh like hoga
                }else{
                  likesarr.push(user.uid)
                }
                firestore.collection("posts").doc(props.data.id).update({likes:likesarr});

            }}>
                {/* //in firestore update ki if liked present red else empty if id matched */}
                {curruserliked?"favorite":"favorite_border"}
            </span>

            {comment ?(
               <div className="video-card-comment-box">
                   <div className="actual-comments">
                       {/* //show comments that are saved in firestore on ui also of comment sectn */}
                       {
                           comments.map((el)=>{
                            return <div className="post-user-comment">
                            <img src={el.photo}></img>
                             <div>
                                 <h5>{el.name}</h5>
                                 <p>{el.comment}</p>
                             </div>
                        </div>
                           })
                       }


                    </div>
                   <div className="comment-form">
                       
                       <input type="text" 
                       value={currusercomm}
                       onChange={(e)=>{
                        setCurrcomm(e.currentTarget.value);
                       }}></input>
                       <button onClick={async()=>{
                           //firestore me comment folder dal dia jisme curr comment hoga ab us cmmt ko post folder me comment arr me bhi daldo
                           let docref=await firestore.collection("comments").add({
                             name:user.displayName,
                             comment:currusercomm,
                             photo:user.photoURL,
                           });
                           setCurrcomm("");
                           //above cmmt add to firestore comments arr
                           let doc=await docref.get()
                           let commid=doc.id;
                           let postdoc=await firestore.collection("posts").doc(props.data.id).get()
                           let postcommarr=postdoc.data().comments
                           postcommarr.push(commid);
                           await firestore.collection("posts")
                           .doc(props.data.id).update({comments:postcommarr,})


                       }}>Post</button>
                   </div>
               </div>
            ): (
                ""
              )}


            



            {/* //video play pause */}
           <video onClick={(e)=>{
               if(playing){
                   e.currentTarget.pause();
                   setPlaying(false);

               }
               else{
                e.currentTarget.play();
                setPlaying(true);

               }
           }}
           loop
           src={props.data.url} className="video-card-video">

           </video>
        </div>

      
    )
}
export default VideoCard