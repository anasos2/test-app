import { useEffect, useState } from "react";
import VanillaCalendar from './VanillaCalendar'; // Import VanillaCalendar component
import dayjs from 'dayjs';
import { PieChart, pieArcLabelClasses } from '@mui/x-charts/PieChart';
import MenuIcon from '@mui/icons-material/Menu';
import { useTranslation } from 'react-i18next';
import Menu from "./Menu";

const Pourcentage = () => {
  const { t, i18n } = useTranslation();

  const [data, setData] = useState([]);
  const [MilkCount, setMilkCount] = useState(0);
  const [CoffeeCount, setCoffeeCount] = useState(0);
  const [JuiceCount, setJuiceCount] = useState(0);
  const [MilkCoffeeCount, setMilkCoffeeCount] = useState(0);
  const [TaiCount, setTaiCount] = useState(0);

  const [selectedDate, setSelectedDate] = useState(dayjs());
  const [showCalendar, setShowCalendar] = useState(false); // State to toggle calendar visibility
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const toggleCalendar = () => {
    setShowCalendar(prevState => !prevState); // Toggle showCalendar state
  };

  // useEffect(() => {
  //   fetchData();
  // }, []);

  useEffect(() => {
    calculatePourcentageByDay(selectedDate);
  }, [selectedDate, data]);

  const fetchData = async () => {
    try {
      const response = await fetch('http://localhost:5000/data');
      const responseData = await response.json();
      setData(responseData);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleSearch = () => {
    calculatePourcentageByDay(selectedDate);
  };

  const calculatePourcentageByDay = (selectedDate) => {
    if (data.length > 0) {
      const filteredData = data.filter((item) => dayjs(item.date).isSame(selectedDate, 'day'));
  
      const totalCount = filteredData.length;
      if (totalCount === 0) {
        setMilkCount(0);
        setCoffeeCount(0);
        setJuiceCount(0);
        setMilkCoffeeCount(0); 
        setTaiCount(0); 
      } else {
        const coffeeCount = filteredData.filter((item) => item.category === 'coffee').length;
        const juiceCount = filteredData.filter((item) => item.category === 'juice').length;
        const milkCount = filteredData.filter((item) => item.category === 'milk').length;
        const milkCoffeeCount = filteredData.filter((item) => item.category === 'milkCoffee').length;
        const taiCount = filteredData.filter((item) => item.category === 'tai').length;
  
        setMilkCount(milkCount);
        setCoffeeCount(coffeeCount);
        setJuiceCount(juiceCount);
        setMilkCoffeeCount(milkCoffeeCount); 
        setTaiCount(taiCount); 
      }
    }
  };

  const dataa = [
    { label: t('live.milk'), value: 8, color: '#0088FE' },
    { label: t('live.coffee'), value: 10, color: '#00C49F' },
    { label: t('live.milkCoffee'), value: 2, color: '#FFBB28' },
    { label: t('live.tea'), value: 2, color: '#FF8042' },
    { label: t('live.juice'), value: 3, color: '#FFBB80' },
  ];

  const sizing = {
    margin: { right: 5 },
    width: 200,
    height: 200,
    legend: { hidden: true },
  };
  const TOTAL = dataa.map((item) => item.value).reduce((a, b) => a + b, 0);

  const getArcLabel = (params) => {
    const percent = params.value / TOTAL;
    return `${(percent * 100).toFixed(0)}%`;
  };

  return (
    <>
      {isMenuOpen ? (
        <Menu className="z-20" closeMenu={closeMenu} /> 
      ) : (
        <div className="flex justify-center bg-[#e8f0fb] h-screen z-50 relative">
          <div className="w-full h-[95vh] absolute rounded-[4000px] bg-[#15406d] mt-[-60vh] z-40 circle"></div>
          <div className="w-[77%] z-50">
            <div className="flex justify-between my-6">
              <div className="btn" onClick={() => setIsMenuOpen(!isMenuOpen)}>
                <MenuIcon fontSize="large"/>
              </div>
              <div className="rounded-full w-9 h-9 bg-slate-500"><p className="flex justify-center items-center py-1">AB</p></div>
            </div>
            <div className="pb-5 z-50" dir={i18n.language === 'ar' ? 'rtl' : 'ltr'}>
              <h5 className="text-gray-500">5/5/2024</h5>
              <h1 className={`text-white hello ${i18n.language}`}>{t('live.hello')}, Anas</h1>
            </div>
            <div className="flex justify-center py-4">
              <input
                className="outline outline-1 outline-gray-800 bg-inherit rounded-sm hover:outline-black"
                type="text"
                onClick={toggleCalendar}
                placeholder={selectedDate ? selectedDate.format('DD/MM/YYYY') : 'Select date'}
              />
            </div>
            <div className="flex w-full py-5 justify-center ">
              {showCalendar && (
                <VanillaCalendar
                  config={{
                    actions: {
                      clickDay(event, dates) {
                        console.log(dates.selectedDates)
                        setSelectedDate(dayjs(dates.selectedDates)); // Met à jour la date sélectionnée
                        toggleCalendar(); // Ferme le calendrier après la sélection
                      },
                    },
                  }}
                />
              )}
            </div>
            <div className="flex justify-center">
            <div className="flex items-center ">
             <div className="w-1/2 mr-10 ">
                <PieChart
                  series={[
                    {
                      outerRadius: 100,
                      data: dataa,
                      arcLabel: getArcLabel,
                    },
                  ]}
                  sx={{
                    [`& .${pieArcLabelClasses.root}`]: {
                      fill: 'white',
                      fontSize: 16,
                    },
                  }}
                  {...sizing}
                />
              </div>
              <div className="flex flex-col w-1/2">
                <div className="flex items-centermy-1 ">
                <div className="w-5 h-5 bg-[#0088FE] mx-2"></div>
                <div className={`pourcentage ${i18n.language}`}> {t('live.milk')}</div>
                </div>  
                <div className="flex items-center my-1 ">
                <div className="w-5 h-5 bg-[#00C49F] mx-2"></div>
                <div className={`pourcentage ${i18n.language}`}> {t('live.coffee')}</div>
                </div>  
                <div className="flex items-center my-1">
                <div className="w-5 h-5 bg-[#FFBB28] mx-2"></div>
                <div className={`pourcentage ${i18n.language}`}> {t('live.milkCoffee')}</div>
                </div>  
                <div className="flex items-center my-1 ">
                <div className="w-5 h-5 bg-[#FF8042] mx-2"></div>
                <div className={`pourcentage ${i18n.language}`}> {t('live.tea')}</div>
                </div>  
                <div className="flex items-center my-1 ">
                <div className="w-5 h-5 bg-[#FFBB80] mx-2"></div>
                <div className={`pourcentage ${i18n.language}`}> {t('live.juice')}</div>
                </div>  
                </div>
              </div>
              </div>
            </div>
          </div>
        
      )}
    </>
  );
};

export default Pourcentage;
