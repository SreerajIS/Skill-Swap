import React, {useEffect, createContext } from 'react';
import Email from '../../components/User/Email';

export const RecoveryContext = createContext<{ page: string, setPage: React.Dispatch<React.SetStateAction<string>> } | undefined>(undefined);


function ForgotPassword() {

  useEffect(() => {
    document.body.classList.add('background');
    return () => {
      document.body.classList.remove('background');
    };
  });


  return (
      <div className="container">
        <div className="header">
          <div className="text">Forgot Password</div>
          <div className="underline"></div>
        </div>
        <Email/>
      </div>
  );
}

export default ForgotPassword;
