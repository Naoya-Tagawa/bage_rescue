import { Button } from "@mui/material";
import { Link } from 'react-router-dom';
import bgp from '../assets/image/bgp4.svg';
import LocalPostOfficeIcon from '@mui/icons-material/LocalPostOffice';
import Hellologo from "./hellologo";
import { useState, useEffect } from 'react';
import SearchBar from "./searchbar";
import Login from "./login";
import RecievePosts from "./recieveposts";
function Home() {
  const [showHellologo, setShowHellologo] = useState(true);

  useEffect(() => {
    // スクロールが発生したときにHellologoを非表示にする
    const handleScroll = () => {
      setShowHellologo(false);
    };

    // スクロールイベントをリスナーに追加
    window.addEventListener("scroll", handleScroll);

    return () => {
      // コンポーネントがアンマウントされたときにリスナーを削除
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className="overflow-hidden">
      {showHellologo && <Hellologo />}
      <div className='bg-cover bg-center overflow-hidden' style={{ backgroundImage:`url(${bgp})` }}>
        <div className="flex flex-col  min-h-screen ">
          <div className='border-b-2 border-stone-800 md:relative flex flex-col items-center   md:flex-row md:items-center'>
            <div className="md:absolute left-5  flex flex-col ">
              <button onClick={() => {setShowHellologo(true)}}>
                
                <img src='./logo_small.svg' alt="logo" className="w-48" />
                
              </button>
              <Login />
            </div>
            <div className="flex-grow flex justify-center">
                <SearchBar />
            </div>
            <div className = "md:absolute right-5">
                <Button   variant="contained" color="secondary" size="large" startIcon={<LocalPostOfficeIcon />} component={Link} to="/post" className="mr-3">
                  投稿
                </Button>
            </div>
            
          
          </div>
            <p className="text-3xl font-bold text-stone-800 mt-3">最新の記事</p>
            <RecievePosts />
          </div>
          
        
      </div>
    </div>
  );
}

export default Home;
