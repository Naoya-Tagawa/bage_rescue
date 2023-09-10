import { Button } from "@mui/material";
import AddCommentIcon from '@mui/icons-material/AddComment';
import { auth, provider } from '../firebase';
import { useEffect } from "react";
import { useState } from "react";
import firebase from 'firebase/compat/app';
import { Link } from "react-router-dom";
function Comment_Button({ post_data }) {
  const [comment_content, set_comment_content] = useState("");
  const [is_comment, setis_comment] = useState(false);
  const [user_id, setuser_id] = useState("");


  async function AddComment() {
    try {
      console.log(post_data)
      console.log(post_data.post_id)
      const db = firebase.firestore();
      const postDocRef = db.collection('post').doc(post_data.post_id);
      const commentsArray = post_data.comment || []; // comments フィールドがない場合は空の配列を作成
      console.log(postDocRef)
      
    

      

      // 新しいコメントを追加
      const newComment = {
        user_id: user_id, // ユーザーIDを適切に設定してください
        comment_content: comment_content,
      };

      commentsArray.push(newComment)
      console.log(commentsArray)

      // コメントを更新
      postDocRef.update({
        comment:commentsArray,
      });

      // コメント内容をクリア
      set_comment_content("");

      // コメント入力フィールドを非表示にする
      setis_comment(false);

    } catch (e) {
      console.error(e);
    }
  }
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        const id = user.uid;
        //
        const sha256Hash = Number(id,36);
        console.log(sha256Hash);
        // ハッシュを5桁の数字に変換
        const numericHash = parseInt(sha256Hash, 36) % 100000;
        setuser_id(numericHash);
        console.log(numericHash);


      } else {
        setuser_id("unknown");
      }
    }, []);


    return () => {
      // クリーンアップ
      unsubscribe();
    };
  }, []);
  

  return (
    <div className="flex flex-col justify-center ">
      <div className="mb-10">
        {is_comment ? (
        <Button
          variant="contained"
          color="secondary"
          size="large"
          onClick={() => setis_comment(false)}
          
        >
          コメントをやめる
        </Button>
      
        ) : (
          <Button
          variant="contained"
          color="secondary"
          size="large"
          startIcon={<AddCommentIcon />}
          onClick={() => setis_comment(true)}
          
        >
          コメントを書く
        </Button>
      )}
      </div>
        

      {is_comment && (
        <>
          <div class="mt-10">
            <label class="block text-gray-500 font-bold text-center mb-10 md:mb-1 pr-4">
              コメントの内容
            </label>

            <textarea
              class="w-2/3 bg-gray-200 appearance-none border-2 border-gray-200 rounded  py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
              rows="4"
              value={comment_content}
              multiline
              onChange={(e) => set_comment_content(e.target.value)}
            ></textarea>
          </div>

          <div>
          <Link to="/">
            <Button
              variant="contained"
              color="secondary"
              size="large"
              onClick={AddComment}
              className="mr-3"
            >
              投稿
            </Button>
          </Link>
          </div>
        </>
      )}
    </div>
  );
}

export default Comment_Button;
