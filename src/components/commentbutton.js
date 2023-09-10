import { Button } from "@mui/material";
import AddCommentIcon from '@mui/icons-material/AddComment';
import { updateDoc, doc,getDoc } from "firebase/firestore";
import { useState } from "react";
import firebase from 'firebase/compat/app';
function Comment_Button({ post_data }) {
  const [comment_content, set_comment_content] = useState("");
  const [is_comment, setis_comment] = useState(false);

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
        user_id: post_data.post_id, // ユーザーIDを適切に設定してください
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

  return (
    <div className="flex flex-col justify-center items-center">
      <div>
        <Button
          variant="contained"
          color="secondary"
          size="large"
          startIcon={<AddCommentIcon />}
          onClick={() => setis_comment(true)}
          className="mr-3"
        >
          コメントを書く
        </Button>
      </div>

      {is_comment && (
        <>
          <div class="mb-6">
            <label class="block text-gray-500 font-bold text-center mb-1 md:mb-0 pr-4">
              コメント
            </label>

            <textarea
              class="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-1/2 py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
              rows="4"
              value={comment_content}
              multiline
              onChange={(e) => set_comment_content(e.target.value)}
            ></textarea>
          </div>

          <div>
            <Button
              variant="contained"
              color="secondary"
              size="large"
              onClick={AddComment}
              className="mr-3"
            >
              投稿
            </Button>
          </div>
        </>
      )}
    </div>
  );
}

export default Comment_Button;
