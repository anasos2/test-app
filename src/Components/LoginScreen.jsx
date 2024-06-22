import React, { useState } from 'react';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import KeyOutlinedIcon from '@mui/icons-material/KeyOutlined';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

const LoginScreen = () => {
  const { t, i18n } = useTranslation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    // Gérer la logique de connexion ici
    console.log('Login button clicked');
  };

  const changeLanguageToArabic = () => {
    i18n.changeLanguage('ar');
  };

  const changeLanguageToFrench = () => {
    i18n.changeLanguage('fr');
  };

  return (
    <div className="h-screen w-screen flex flex-col justify-center" style={{
      backgroundImage: `url(bg.png)`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      width: '100%',
      height: '100vh'
    }}>
      <h1 className={`text-black font-bold text-5xl ml-7 mr-7 mb-10 register ${i18n.language}`} dir={i18n.language === 'ar' ? 'rtl' : 'ltr'}>{t('loginScreen.login')}</h1>
      <h3 className={`text-[#15406d] font-bold text-xl ml-7 mr-7 mb-10 registerh3 ${i18n.language}`} dir={i18n.language === 'ar' ? 'rtl' : 'ltr'}>{t('loginScreen.register')}</h3>
      <div className="flex flex-col justify-center items-center">
        <div className="bg-black/5 pb-1 w-80" dir={i18n.language === 'ar' ? 'rtl' : 'ltr'}>
          <div className="flex bg-white items-center">
            <EmailOutlinedIcon className='text-gray-400'  />
            <input
              type="email"
              placeholder={t('loginScreen.emailPlaceholder')}
              className="w-full p-2 outline-none"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
        </div>
        <div className="bg-black/5 pb-1 w-80 mb-3" dir={i18n.language === 'ar' ? 'rtl' : 'ltr'}>
          <div className="flex bg-white items-center">
            <KeyOutlinedIcon className='text-gray-400' />
            <input
              type="password"
              placeholder={t('loginScreen.passwordPlaceholder')}
              className="w-full p-2 outline-none"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
        </div>
        <Link to="/live">
        <button className={`w-80 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-2xl mb-3 registerbtn ${i18n.language}`} onClick={handleLogin}>
          {t('loginScreen.registerButton')}
        </button>
        </Link>
     
        <div className={`flex items-center text-white registerSpan ${i18n.language}`} dir={i18n.language === 'ar' ? 'rtl' : 'ltr'}>
          <span className=' mx-1'>{t('loginScreen.noAccount')}</span>
          <Link to="/register" className='underline-offset-[4px] underline' >
            {t('loginScreen.signUp')}
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LoginScreen;
