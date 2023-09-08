import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs, doc, addDoc , query, limit, orderBy, where} from 'firebase/firestore/lite';
import {db} from '../firebase';


// // 読み取り
// const docRef = doc(db, "test", "test_table");
const docRef = collection(db, "post")
// let post = {
//     overview: null, 
//     post_name: null, 
//     thumbnail_url: null,
//     comment: null,
//     post_instruction: null,
//     timestamp: null,
//     tag_name: null,
//     like_amount: null,
// }

async function getNewPosts(get_num) {
    const q = query(docRef, orderBy("timestamp"), limit(get_num));
    const querySnapshot = await getDocs(q);
    let posts = [];
    querySnapshot.forEach((doc)=>{
        const post = Object.assign(doc.data(), {post_id:doc.id});
        // console.log("print doc.data()")
        // console.log(doc.data());
        posts.push(post);
    });
    return posts;
}

async function getPopularPosts(get_num) {
    const q = query(docRef, orderBy("like_amount", "desc"), limit(get_num));
    const querySnapshot = await getDocs(q);
    let posts = [];
    querySnapshot.forEach((doc)=>{
        const post = Object.assign(doc.data(), {post_id:doc.id});
        // console.log("print doc.data()")
        // console.log(doc.data());
        posts.push(post);
    });
    return posts;
}

async function getPostsByTag(search_tag) {
    // if (typeof search_tag != String) {
    //     console.error("Error: Invalid search tag");
    //     return [];
    // }
    const q = query(docRef, where("tag_name", "array-contains", search_tag));
    const querySnapshot =  await getDocs(q);
    let posts = []
    querySnapshot.forEach((doc)=> {
        const post = Object.assign(doc.data(), {post_id:doc.id});
        posts.push(post);
    });
    return posts;
}

export {getNewPosts, getPopularPosts, getPostsByTag};