import { Getimg } from './getimg';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { useState} from 'react';
import { useNavigate } from 'react-router-dom';
import firebase from 'firebase/compat/app';
function Post ({post}) {
  const [isliked, setIsliked] = useState(false);
  const navigate = useNavigate();

  const togglelike = () => {
    const db = firebase.firestore();
    const docRef = db.collection('post').doc(post.post_id);
    docRef.update({
      like_amount: isliked ? post.like_amount -= 1 : post.like_amount += 1,
    });
    // console.log(post.like_amount);
    setIsliked(!isliked);
  };
  const handleButtonClick = (post) => {
    // /detailに遷移
    navigate('/detail',{state:{post}});
};
    // const dateStr = new Date(post.postDate).toLocaleString('ja-JP', { timeZone: 'Asia/Tokyo' })
    return (
        <>

          <div className='flex flex-col gap-4 p-4 bg-stone-800 rounded-xl shadow-md w-full hover:shadow-2xl hover:scale-105 duration-200'>
          <button onClick={() =>handleButtonClick(post)}>
            <div className='flex justify-center py-8 rounded-xl w-full bg-white'>
              {Getimg(post)}
            </div>
          </button>
            <div className='p-2 text-slate-300 text-2xl'>
              <p>{post.post_name}</p>
              <div className='flex flex-row justify-center'>
                {/* <p>投稿日時: {dateStr}</p> */}
                <FavoriteIcon style={{ fontSize: "30px", color: isliked ? 'red' : 'gray' }} onClick={togglelike} />
                {post.like_amount}
              </div>
            </div>
          </div>
        </>
      )





}
export default Post;