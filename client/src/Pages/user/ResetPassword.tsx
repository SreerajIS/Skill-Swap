import React, {useEffect } from 'react';
import Reset from '../../components/User/Reset';



function ResetPassword() {

  useEffect(() => {
    document.body.classList.add('background');
    return () => {
      document.body.classList.remove('background');
    };
  });


  return (
      <div className="container">
        <div className="header">
          <div className="text">Reset Password</div>
          <div className="underline"></div>
        </div>
        <Reset/>
      </div>
  );
}

export default ResetPassword;
