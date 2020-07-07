import React, { useState } from 'react';
import AuthLogin from './AuthLogin';
import AuthRegister from './AuthRegister';
import "../../assets/css/auth.css";

function Auth() {
  const [isLogin, setIsLogin] = useState(false);

  const handleClick = () => {
    setIsLogin(!isLogin)
  }

  return (
    <div className="auth">
      <div className="auth__inner">
        <h2 className="auth__title">{!isLogin? 'Login' : 'Register'}</h2>

        {!isLogin? <AuthLogin handleClick={handleClick}/> : <AuthRegister handleClick={handleClick}/>}
      </div>
    </div>
  );
}

export default Auth;
