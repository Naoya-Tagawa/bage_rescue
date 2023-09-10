import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import bgp from '../assets/image/bgp4.svg';
import { ref, getDownloadURL } from "firebase/storage";
import { storage } from '../firebase';
import { Getimg } from "./getimg";
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import FavoriteIcon from '@mui/icons-material/Favorite';
import firebase from 'firebase/compat/app';
import { useNavigate } from "react-router-dom";
import Comment_Button from "./commentbutton";
function Detail() {
  const location = useLocation();
  const post = location.state.post;
  const [isliked, setIsliked] = useState(false);
  const [isContainerOverflowing, setIsContainerOverflowing] = useState(false);
  // いいね！されたときの処理
  const navigate = useNavigate();
  const returntohome = () => {
    navigate('/');
  };
  const dateStr = new Date(post.timestamp).toLocaleString('ja-JP', { timeZone: 'Asia/Tokyo' })

  const togglelike = () => {
    const db = firebase.firestore();
    const docRef = db.collection('post').doc(post.post_id);
    docRef.update({
      like_amount: isliked ? post.like_amount -= 1 : post.like_amount += 1,
    });
    // console.log(post.like_amount);
    setIsliked(!isliked);
  };
  useEffect(() => {
    console.log(post);
  },[post]);

  function Get_image(post) {
    const gsReference = ref(storage, "gs://bage-rescue.appspot.com/" + post.img_url);
    const [imgurl, setImgurl] = useState(null);
  

    

    useEffect(() => {
      getDownloadURL(gsReference)
        .then((url) => {
          setImgurl(url);
          
        })
        .catch((error) => {
          console.log(error);
        });
    }, [gsReference]);

    return (
      <img src={imgurl} alt='post' className="object-fill" />
    );
  }
// コンテナがはみ出るかどうかをチェックする関数
  const checkContainerOverflow = () => {
    const container = document.querySelector('.comment-container'); // コンテナ要素のクラスを設定してください
    if (container) {
      setIsContainerOverflowing(container.scrollWidth > container.clientWidth);
    }
    };
  useEffect(() => {
  checkContainerOverflow();
  // ウィンドウのリサイズ時にもチェック
  window.addEventListener('resize', checkContainerOverflow);
  return () => {
    // クリーンアップ時にイベントリスナーを削除
    window.removeEventListener('resize', checkContainerOverflow);
  };
  }, [post.comment]);
return (
  <div className='bg-cover bg-center overflow-hidden font-bold text-stone-800 min-h-screen' style={{ backgroundImage: `url(${bgp})` }}>
    <div className="border-b-2 border-stone-800">
      <div className='md:relative flex flex-col   justify-between font-bold p-2'>
          <button onClick={returntohome} className=" md:absolute left-5">
            <img src='./logo_small.svg' alt="logo" className="w-36 md:w-48" />
          </button>
          <div className="flex-grow  justify-center text-2xl md:text-3xl p-5">
            <p>{post.post_name}</p>
          </div>
          <div className="text-xl md:text-2xl absolute right-10">
            <FavoriteIcon style={{ fontSize: "35px", color: isliked ? 'red' : 'gray' }} onClick={togglelike} />
            <p>{post.like_amount}</p>
          </div>
        <div className='w-full flex justify-center'>
            <div className="flex justify-center p-2 w-6/12">
                {Getimg(post)}
            </div>
        </div>
        <div className=" my-10 text-lg md:text-2xl">
          {post.overview}
        </div>
        
      </div>
    </div>

    <div>
      <div className="font-bold text-stone-800 text-2xl md:text-3xl mt-5">
        <p>手順</p>
      </div>
      {post.post_instruction && post.post_instruction.map((step, index) => (
        <div key={index} className="my-10 mx-auto flex flex-col gap-4 p-4 bg-stone-800 rounded-xl shadow-md w-2/3 md:w-2/3">
          <div className=' py-1 md:py-5 rounded-xl w-full bg-white'>
            <p className="flex flex-1 text-lg md:text-3xl ml-10">{index + 1}</p>
            <div className="flex justify-center items-center">
              {Get_image(step)}
            </div>
          </div>
          <div className="flex flex-col items-center text-slate-100 text-sm md:text-2xl p-5">
            {step.process_explanation}
          </div>
        </div>
      ))}
    

    <div className="flex-1 flex-col text-lg md:text-2xl text-stone-500 text-left">
      {post.tag_name && post.tag_name.map((step, index) => (
        <div key={index} className="p-4 inline-block ">
          #{step}
        </div>
      ))}
    </div>

    {post.timestamp && (
      <div className="flex-1 flex-col text-lg md:text-2xl text-stone-500 text-left border-b-2 border-stone-800 p-3">
        投稿日時: {dateStr}
      </div>
    )}
    </div>

    {post.comment && post.comment.length > 0 && (
      <div>
        <div className='flex flex-col items-center font-bold p-2'>
          <div className='p-2 text-3xl'>
            <p>コメント</p>
          </div>
        </div>
        <div className={`comment-container flex flex-nowrap ${isContainerOverflowing ? 'justify-start' : 'justify-center'} mx-auto overflow-y-auto max-h-[330px]`}  >
          {post.comment.map((step, index) => (
            <div key={index} className="my-10 mx-5 gap-4 p-4 bg-stone-800 rounded-xl shadow-md ">
              <div className=' py-8 rounded-xl bg-white'>
                <div className="flex flex-row">
                  <p className=" text-lg md:text-3xl text-left ml-2">ID:{step.user_id}</p>
                  <AccountBoxIcon style={{ fontSize: "40px" }} />
                </div>
                <div className="flex justify-center items-center text-lg md:text-2xl p-3">
                  {step.comment_content}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    )}
    <div className="mt-10">
      <Comment_Button post_data={post}/>
    </div>
    
  </div>
);
}

export default Detail;