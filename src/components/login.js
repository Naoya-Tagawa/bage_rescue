import { auth, provider } from '../firebase';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Button } from '@mui/material';
const Login = () => {
  const navigate = useNavigate();
  const [error, setError] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // ログイン状態を確認し、変更するコード
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setIsAuthenticated(true);
      } else {
        setIsAuthenticated(false);
      }
    });

    return () => {
      // クリーンアップ
      unsubscribe();
    };
  }, []);

  const handleLogin = async (event) => {
    try {
      if (isAuthenticated) {
        // ログインしている場合はログアウトを実行
        await auth.signOut();
      } else {
        // ログアウトしている場合はログインを実行
        await auth.signInWithPopup(provider);
      }
    } catch (error) {
      console.log(error);
      setError(error.message);
    }
  };

  return (
    <div>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <Button  Button variant="contained" color="secondary" size="large" onClick={handleLogin}>
        {isAuthenticated ? 'ログアウト' : 'ログイン'}
      </Button>
    </div>
  );
};

export default Login;
