import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import bgp from '../assets/image/bgp4.svg';
import { useNavigate } from "react-router-dom";
import Post from "./postlayout";
import SearchBar from "./searchbar";

function SearchPage() {
  
  const location = useLocation();
  const getpost = location.state.result;
  const [result, setresult] = useState(getpost); //postsampleは検索結果の投稿の配列
  const navigate = useNavigate();
  const text = location.state.input_text;
  
  useEffect(() => {
    setresult(getpost);
  }, [getpost]);



  const returntohome = () => {
    console.log(result);
    console.log(getpost);
    navigate('/');
  };

  return (
    <div className="bg-cover bg-center overflow-hidden font-bold text-stone-800 min-h-screen" style={{ backgroundImage: `url(${bgp})` }}>
      <div className="flex flex-row justify-between items-center border-b-2 border-stone-800 p-5">
        <div className="left-0">
          <button onClick={returntohome}>
            <img src='/logo_small.svg' alt="logo" className="w-48" />
          </button>
        </div>
        <p className="text-center text-3xl">
          "{text}"の検索結果
        </p>
        <div className="right-0">
          <SearchBar />
        </div>
      </div>
      <ul className="flex flex-col items-center mt-5">
        {result.map((step, index) => (
          <div className="w-5/12 mt-5 ">
            <li key={index} className="flex flex-col items-center">
              <Post post={step}/>
            </li>
          </div>
        ))}
      </ul>
    </div>
  );
}

export default SearchPage;
