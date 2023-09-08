import React, { useState, useEffect } from 'react';
import { ref, getDownloadURL} from "firebase/storage";
import { storage } from '../firebase';

export function Getimg(post) {
  const gsReference = ref(storage, "gs://bage-rescue.appspot.com/" + post.thumbnail_url); 
  const [imgurl, setImgurl] = useState(null);
  useEffect(() => {
    if (post.thumbnail_url) {
        getDownloadURL(ref(storage, post.thumbnail_url))
        .then((url) => {
            setImgurl(url);
        })
        .catch((error) => {
            console.log(error);
        });
    }
  }, [post]);
  return (
    <img src={imgurl} alt='post' />
  )
}