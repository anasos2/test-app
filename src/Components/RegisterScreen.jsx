import React, { useState } from 'react';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import KeyOutlinedIcon from '@mui/icons-material/KeyOutlined';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';


const RegisterScreen = () => {
  const { t, i18n } = useTranslation();
 
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    // Gérer la logique d'inscription ici
    console.log('Register button clicked');
  };

  return (
    <div className="h-screen w-screen flex flex-col justify-center" style={{
      backgroundImage: `url(bg.png)`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      width: '100%',
      height: '100vh'
    }}>
      <h1 className="text-black font-bold text-5xl ml-7 mr-7 mb-10" dir={i18n.language === 'ar' ? 'rtl' : 'ltr'}>
        {t('loginScreen.register')}
      </h1>
      <h3 className="text-[#15406d] font-bold text-xl ml-7 mr-7 mb-10" dir={i18n.language === 'ar' ? 'rtl' : 'ltr'}>
        {t('registerScreen.RegisterNow')}
      </h3>
      <div className="flex flex-col justify-center items-center">
        <div className="bg-black/5 pb-1 w-80" dir={i18n.language === 'ar' ? 'rtl' : 'ltr'}>
          <div className="flex bg-white items-center">
            <PersonOutlineIcon className='text-gray-400'/>
            <input
              type="name"
              placeholder={t('registerScreen.fullName')}
              className="w-full p-2 outline-none"
              value={name}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
        </div>
        <div className="bg-black/5 pb-1 w-80 mb-3" dir={i18n.language === 'ar' ? 'rtl' : 'ltr'}>
          <div className="flex bg-white items-center">
            <EmailOutlinedIcon className='text-gray-400'/>
            <input
              type="email"
              placeholder={t('registerScreen.Email')}
              className="w-full p-2 outline-none"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
        </div>
        <div className="bg-black/5 pb-1 w-80 mb-3" dir={i18n.language === 'ar' ? 'rtl' : 'ltr'}>
          <div className="flex bg-white items-center">
            <KeyOutlinedIcon className='text-gray-400'/>
            <input
              type="password"
              placeholder={t('registerScreen.password')}
              className="w-full p-2 outline-none"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
        </div>
        <div className="bg-black/5 pb-1 w-80 mb-3" dir={i18n.language === 'ar' ? 'rtl' : 'ltr'}>
          <div className="flex bg-white items-center">
            <KeyOutlinedIcon className='text-gray-400'/>
            <input
              type="password"
              placeholder={t('registerScreen.repate Password')}
              className="w-full p-2 outline-none"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
        </div>
        <button className="w-80 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-2xl mb-3" onClick={handleLogin}>
          {t('loginScreen.registerButton')}
        </button>
        <div className="flex items-center text-white">
          <span>{t('registerScreen.YouHaveAnAccount')} </span>
          <Link to="/login" className='underline-offset-[4px] underline'>
  {t('registerScreen.SignIn')}
</Link>

        </div>
      </div>
      
    </div>
  );
};

export default RegisterScreen;
