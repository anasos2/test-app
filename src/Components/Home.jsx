import React, { useEffect, useState } from "react";
import { MobileDateTimePicker } from '@mui/x-date-pickers/MobileDateTimePicker';
import dayjs from 'dayjs';
import MenuIcon from '@mui/icons-material/Menu';
import { useTranslation } from 'react-i18next';


const Home = () => {
  const { t, i18n } = useTranslation();
  const [value, setValue] = useState(dayjs());
  const [data, setData] = useState([]);
  const [coffeeCount, setCoffeeCount] = useState(0);
  const [juiceCount, setJuiceCount] = useState(0);
  const [milkCount, setMilkCount] = useState(0);

  // useEffect(() => {
  //   fetchData();
  // }, []);

  useEffect(() => {
    calculateConsumptionByHour();
  }, [value]);

  const fetchData = async () => {
    try {
      const response = await fetch("http://192.168.1.10:5000/data");
      const responseData = await response.json();
      setData(responseData);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const calculateConsumptionByHour = () => {
    if (data.length > 0) {
      const selectedDay = value.$D;
      const selectedMonth = value.$M;
      const selectedYear = value.$y;
      const selectedHour = value.$H;
      const filteredData = data.filter((item) =>
        new Date(item.date).getDate() === selectedDay &&
        new Date(item.date).getMonth() === selectedMonth &&
        new Date(item.date).getFullYear() === selectedYear &&
        new Date(item.date).getHours() === selectedHour
      );

      const coffeeCount = filteredData.filter(
        (item) => item.category === "Coffee"
      ).length;
      const juiceCount = filteredData.filter(
        (item) => item.category === "Juice"
      ).length;
      const milkCount = filteredData.filter(
        (item) => item.category === "Milk"
      ).length;

      setCoffeeCount(coffeeCount);
      setJuiceCount(juiceCount);
      setMilkCount(milkCount);
    }
  };

  return (
   <> 
    
    <div className="flex justify-center bg-[#e8f0fb] z-50 h-screen relative">
        <div className="w-full h-[95vh] absolute rounded-[4000px] bg-[#15406d] mt-[-60vh] z-40 circle"></div>
        <div className="w-[77%] z-50">
          <div className="flex justify-between my-6">
            <div className="btn"><MenuIcon fontSize="large"/></div>
            <div className="rounded-full w-9 h-9 bg-slate-500"><p className="flex justify-center items-center py-1">AB</p></div>
          </div>
          <div className="pb-5 z-50" dir={i18n.language === 'ar' ? 'rtl' : 'ltr'}>
            <h5 className="text-gray-500">5/5/2024</h5>
            <h1 className="text-white">{t('live.hello')}, Anas</h1>
          </div>
          <div className="flex justify-center py-4 ">
     
        
      </div>
          {/* Afficher les statistiques */}
          <div className="flex justify-center z-50">
            <div className=" ">
              <div className="flex ">
                <div className="w-1/2 bg-[#f9fafe] mx-4 rounded-2xl shadow-lg pl-10">
                  <div className="pr-10 py-4 font-bold text-2xl mb-2 text-[#0a2554]">{t('live.coffee')}</div>
                  <img src="../coffee.svg" alt="coffee" className="w-14 py-4" />
                  <div className="font-bold text-xl mb-2 text-[#0a2554] pt-6">{coffeeCount}</div>
                  <p className="text-gray-700 text-base pb-6">obj</p>
                </div>
                {/* Ajoutez les autres sections ici */}
                <div className="w-1/2 bg-[#f9fafe] mx-4 rounded-2xl shadow-lg pl-10">
                  <div className="pr-10 py-4 font-bold text-2xl mb-2 text-[#0a2554]">{t('live.juice')}</div>
                  <img src="../juice.svg" alt="juice" className="w-14 py-4" />
                  <div className="font-bold text-xl mb-2 text-[#0a2554] pt-6">{juiceCount}</div>
                  <p className="text-gray-700 text-base pb-6">obj</p>
                </div>
              </div>
              <div className="flex pt-3">
                <div className="w-1/2 bg-[#f9fafe] mx-4 rounded-2xl shadow-lg pl-10">
                  <div className="pr-10 py-4 font-bold text-2xl mb-2 text-[#0a2554]">{t('live.milk')}</div>
                  <img src="../milk.svg" alt="milk" className="w-14 py-4" />
                  <div className="font-bold text-xl mb-2 text-[#0a2554] pt-6">{milkCount}</div>
                  <p className="text-gray-700 text-base pb-6">obj</p>
                </div>
                <div className="w-1/2 bg-[#f9fafe] mx-4 rounded-2xl shadow-lg pl-10">
                  <div className="pr-10 py-4 font-bold text-2xl mb-2 text-[#0a2554]">{t('live.milk')}</div>
                  <img src="../milk.svg" alt="milk" className="w-14 py-4" />
                  <div className="font-bold text-xl mb-2 text-[#0a2554] pt-6">{milkCount}</div>
                  <p className="text-gray-700 text-base pb-6">obj</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
