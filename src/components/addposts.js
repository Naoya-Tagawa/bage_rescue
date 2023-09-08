import { getStorage, ref, uploadBytes, uploadBytesResumable } from "firebase/storage";  
import { db } from "../firebase";
import { getFirestore, collection, getDocs, doc, addDoc , query, limit, orderBy} from 'firebase/firestore/lite';
import { storage } from "../firebase";
import { useEffect ,useState} from "react";

async function AddPost(post_data, img_files) {
    const defaultThumbnailUrl = "/images/default.svg";
    console.log("start push post");
    // post_dataの必須項目のチェック
    if (!post_data["post_name"]) {
        console.error("post_name doesn't exist in post data");
        return;
    }
    if (!post_data["overview"]) {
        console.error("overview doesn't exist in post data");
        return;
    }
    // if (!post_data["timestamp"]) {
    //     console.error("timestamp doesn't exist in post data");
    //     return;
    // }

    // thumbnail_url、post_instrction, tag_nameの中身は存在しない場合default値
    try {
        const docRef = addDoc(collection(db, "post"), {
            // post_id: post_data["post_id"],
            post_name: post_data["post_name"],
            thumbnail_url: post_data["thumbnail_url"] ? post_data["thumbnail_url"]:defaultThumbnailUrl,
            overview: post_data["overview"],
            comment: null,
            like_amount: 0,
            post_instruction: post_data["post_instruction"] ? post_data["post_instruction"] : [],
            tag_name: post_data["tag_name"] ? post_data["tag_name"] : null,
            timestamp: post_data["timestamp"],
        });
    } catch (e) {
        console.error("Error adding document: ", e);
    }

    if (img_files.length == "") return;

    let storageRef;
    let uploadImage;
    try {
        // サムネイル画像をstorageへ
        if (!img_files[0]) {
            // サムネイル画像がない場合はデフォルト画像を使用
            post_data["thumbnail_url"] = "images/usagi.svg";
        }
        else {
            storageRef = ref(storage, post_data["thumbnail_url"]);
            uploadImage = await uploadBytes(storageRef, img_files[0]);
        }
        // 手順画像をstorageへ
        for (let i = 0; i < img_files.length - 1; i++) {
            console.log("push image to storage");
            storageRef = ref(storage, post_data["post_instruction"][i]["img_url"]);
            uploadImage = await uploadBytes(storageRef, img_files[i + 1]);
        }
        console.log("画像投稿");
        return;
    }
    catch (e) {
        console.error("Error adding images: ", e);
        return;
    }
}

// example post data
const post_data = {
    // post_id: 10, 
    overview: "hoge", 
    post_name: "test", 
    thumbnail_url: "images/sample.jpg",
    comment: [{comment_content: "test comment", user_id: 2, like_amount: 5}, 
    {comment_content: "sample comment", user_id: 3, like_amount: 1}],
    post_instruction: [{process_num: 1, process_explanation: "prepare", img_url: "/images/test.jpg"},
    {process_num: 2, process_explanation: "do the best", img_url: null}],
    timestamp: null,
    tag_name: ["potato", "carrot"],
    like_amount: 0,
};

export { AddPost }
