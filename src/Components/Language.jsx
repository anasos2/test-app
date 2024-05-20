import React, { useState } from 'react';
import { Link } from 'react-router-dom';


import { useTranslation } from 'react-i18next';

const Language = () => {
  const { t, i18n } = useTranslation();



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
      <h1 className="text-black font-bold text-5xl ml-7 mr-7 mb-10" dir={i18n.language === 'ar' ? 'rtl' : 'ltr'}>{t('Language.Language-ar-fr')}</h1>
      <h3 className="text-[#15406d] font-bold text-xl ml-7 mr-7 mb-10" dir={i18n.language === 'ar' ? 'rtl' : 'ltr'}>{t('loginScreen.register')}</h3>
      <div className="flex flex-col justify-center items-center">
    
       
         <Link to="/register">
          <button onClick={changeLanguageToArabic} className="w-80 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-2xl mb-3">
            {t('loginScreen.arabic')}
          </button>
        </Link>
        <Link to="/register">
          <button onClick={changeLanguageToFrench} className="w-80 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-2xl mb-3">
            {t('loginScreen.french')}
          </button>
    </Link>
      
      </div>
    </div>
  );
};

export default Language;
