import React, { useState, useContext } from 'react'
import './style.css'
import Avatar from "@material-ui/core/Avatar";
import { Comment } from '../../componenet'
import { db, storage } from '../../firebase'
import CommentInput from '../../componenet/comment-input'

export default function Post ({id, user, userName, username, postImageUrl, caption, comments,  userProfileUrl}) {
 const deletePost = () => {
        //delete the image from firebase storage

        //get ref to the image file we like to delete
        var imageRef = storage.refFromURL(postImageUrl);

        //delete the file
        imageRef
            .delete()
            .then(function(){
                console.log("delete successful");
        })
        .catch(function(error){
            console.log('Error ${error}');
        });

        //2 delete the post info from firebase firestore
        db.collection("posts")
            .doc(id)
            .delete()   
            .then(function(){
            console.log("delete post info successful");
    })
    .catch(function(error){
        console.log('Error post info delete ${error}');
    });
};
  return (
    <div className="post">
      <div className="post__header">
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <Avatar
            alt={userName}
            style={{ height: "25px", width: "25px" }}
          >
            {userProfileUrl ?  <img className = "post__avatar" src = {userProfileUrl} alt="" />:userName.charAt(0) }
          </Avatar>
          <div className="post__headerInfo">
            <p style={{ fontSize: "14px" }}><strong>{userName}</strong></p>
          </div>
        </div>  
             {user ? (
          user.displayName.toLowerCase() === userName.toLowerCase() ? (
            <button
              className="button"
              aria-controls="simple-menu"
              aria-haspopup="true"
              onClick={deletePost}
            >
              Delete
            </button>
          ) : (
            <></>
          )
        ) : (
          <></>
        )}
      </div>
      <div className="post__bottom">    
        <p>
          {caption}
        </p> 
        <img className="post__image" src={postImageUrl} />
      </div>
      {comments ? (
        comments.map((comment) => (
          <Comment username={comment.username} comment={comment.comment} />
        ))
      ) : (
        <></>
      )}
      <CommentInput comments={comments} id={id} user={user} />
    </div>
  )
}
