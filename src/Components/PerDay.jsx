import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import MenuIcon from "@mui/icons-material/Menu";
import VanillaCalendar from "./VanillaCalendar"; // Import VanillaCalendar component
import dayjs from "dayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import Menu from "./Menu";
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';



const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}));


const PerDay = () => {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  
  const { t, i18n } = useTranslation();
  const [data, setData] = useState([]);
  const [coffeeCount, setCoffeeCount] = useState(0);
  const [juiceCount, setJuiceCount] = useState(0);
  const [milkCount, setMilkCount] = useState(0);
  const [milkCoffeCount, setMilkCoffeCount] = useState(0);
  const [taiCount, setTaiCount] = useState(0); // State for Tai count
  const [showCalendar, setShowCalendar] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [timePickerOpen, setTimePickerOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [isClicked, setIsClicked] = useState(false);
  const [detailData, setDetailData] = useState([]);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [coffeeConsumed, setCoffeeConsumed] = useState([]);
  const [juiceConsumed, setJuiceConsumed] = useState([]);
  const [milkConsumed, setMilkConsumed] = useState([]);
  const [milkCoffeeConsumed, setMilkCoffeeConsumed] = useState([]);
  const [taiConsumed, setTaiConsumed] = useState([]);
  console.log("first",selectedCategory)
  
  const closeMenu = () => {
    setIsMenuOpen(false);
  };
  const handleDetailClick = (category) => {
    setSelectedCategory(category);
    // Pass consumption data to Detail component
    switch (category) {
      case "coffee":
        setDetailData(coffeeConsumed);
        break;
      case "juice":
        setDetailData(juiceConsumed);
        break;
      case "milk":
        setDetailData(milkConsumed);
        break;
      case "milkCoffee":
        setDetailData(milkCoffeeConsumed);
        break;
      case "tai":
        setDetailData(taiConsumed);
        break;
      default:
        setDetailData([]); // Clear detail data if no category matches
    }
  };

  const handleInputClick = () => {
    setIsClicked(true);
  };

  const handleMouseEnter = () => {
    setIsClicked(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    calculateConsumptionByDayOrByDayAndByHour();
    objConsumptionByDayOrByDayAndByHour();
  }, [data, selectedTime, selectedDate]);

  const fetchData = async () => {
    try {
      const response = await fetch("http://localhost:5000/data");
      const responseData = await response.json();
      setData(responseData);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const calculateConsumptionByDayOrByDayAndByHour = () => {
    console.log("Data length:", data.length);
    console.log("Selected date:", selectedDate);
    console.log("Selected time:", selectedTime);

    if (data.length > 0) {
      if (selectedDate != null && selectedTime === null) {
        console.log("Calculating consumption by day...");

        const filteredData = data.filter((item) =>
          dayjs(item.date).isSame(selectedDate, "day")
        );
        console.log("Filtered data by day:", filteredData);

        const coffeeCount = filteredData.filter(
          (item) => item.category === "coffee"
        ).length;
        const juiceCount = filteredData.filter(
          (item) => item.category === "juice"
        ).length;
        const milkCount = filteredData.filter(
          (item) => item.category === "milk"
        ).length;
        const milkCoffeCount = filteredData.filter(
          (item) => item.category === "milkCoffee"
        ).length;
        const taiCount = filteredData.filter(
          (item) => item.category === "tai"
        ).length; // Calculate Tai count

        console.log("Coffee count:", coffeeCount);
        console.log("Juice count:", juiceCount);
        console.log("Milk count:", milkCount);
        console.log("Milk Coffee count:", milkCoffeCount);
        console.log("Tai count:", taiCount);

        setCoffeeCount(coffeeCount);
        setJuiceCount(juiceCount);
        setMilkCount(milkCount);
        setMilkCoffeCount(milkCoffeCount);
        setTaiCount(taiCount); // Set Tai count state
      } else if (selectedDate != null && selectedTime !== null) {
        console.log("Calculating consumption by hour...");

        const selectedHour = selectedTime.hour();
        console.log("Selected hour:", selectedHour);

        const filteredData = data.filter(
          (item) =>
            dayjs(item.date).isSame(selectedDate, "day") &&
            dayjs(item.date).hour() === selectedHour
        );
        console.log("Filtered data by hour:", filteredData);

        const coffeeCount = filteredData.filter(
          (item) => item.category === "coffee"
        ).length;
        const juiceCount = filteredData.filter(
          (item) => item.category === "juice"
        ).length;
        const milkCount = filteredData.filter(
          (item) => item.category === "milk"
        ).length;
        const milkCoffeCount = filteredData.filter(
          (item) => item.category === "milkCoffee"
        ).length;
        const taiCount = filteredData.filter(
          (item) => item.category === "tai"
        ).length; // Calculate Tai count

        console.log("Coffee count:", coffeeCount);
        console.log("Juice count:", juiceCount);
        console.log("Milk count:", milkCount);
        console.log("Milk Coffee count:", milkCoffeCount);
        console.log("Tai count:", taiCount);

        setCoffeeCount(coffeeCount);
        setJuiceCount(juiceCount);
        setMilkCount(milkCount);
        setMilkCoffeCount(milkCoffeCount);
        setTaiCount(taiCount); // Set Tai count state
      }
    } else {
      console.log("No data available for calculation.");
    }
  };
  const objConsumptionByDayOrByDayAndByHour = () => {
    console.log("Data length:", data.length);
    console.log("Selected date:", selectedDate);
    console.log("Selected time:", selectedTime);

    if (data.length > 0) {
      if (selectedDate != null && selectedTime === null) {
        console.log("Calculating consumption by day...");

        const filteredData = data.filter((item) =>
          dayjs(item.date).isSame(selectedDate, "day")
        );
        console.log("Filtered data by day:", filteredData);

        const coffeeConsumed = filteredData.filter(
          (item) => item.category === "coffee"
        );
        const juiceConsumed = filteredData.filter(
          (item) => item.category === "juice"
        );
        const milkConsumed = filteredData.filter(
          (item) => item.category === "milk"
        );
        const milkCoffeeConsumed = filteredData.filter(
          (item) => item.category === "milkCoffee"
        );
        const taiConsumed = filteredData.filter(
          (item) => item.category === "tai"
        );

        console.log("Coffee consumed:", coffeeConsumed);
        console.log("Juice consumed:", juiceConsumed);
        console.log("Milk consumed:", milkConsumed);
        console.log("Milk Coffee consumed:", milkCoffeeConsumed);
        console.log("Tai consumed:", taiConsumed);

        setCoffeeConsumed(coffeeConsumed);
        setJuiceConsumed(juiceConsumed);
        setMilkConsumed(milkConsumed);
        setMilkCoffeeConsumed(milkCoffeeConsumed);
        setTaiConsumed(taiConsumed);
      } else if (selectedDate != null && selectedTime !== null) {
        console.log("Calculating consumption by hour...");

        const selectedHour = selectedTime.hour();
        console.log("Selected hour:", selectedHour);

        const filteredData = data.filter(
          (item) =>
            dayjs(item.date).isSame(selectedDate, "day") &&
            dayjs(item.date).hour() === selectedHour
        );
        console.log("Filtered data by hour:", filteredData);

        const coffeeConsumed = filteredData.filter(
          (item) => item.category === "coffee"
        );
        const juiceConsumed = filteredData.filter(
          (item) => item.category === "juice"
        );
        const milkConsumed = filteredData.filter(
          (item) => item.category === "milk"
        );
        const milkCoffeeConsumed = filteredData.filter(
          (item) => item.category === "milkCoffee"
        );
        const taiConsumed = filteredData.filter(
          (item) => item.category === "tai"
        );

        console.log("Coffee consumed:", coffeeConsumed);
        console.log("Juice consumed:", juiceConsumed);
        console.log("Milk consumed:", milkConsumed);
        console.log("Milk Coffee consumed:", milkCoffeeConsumed);
        console.log("Tai consumed:", taiConsumed);

        setCoffeeConsumed(coffeeConsumed);
        setJuiceConsumed(juiceConsumed);
        setMilkConsumed(milkConsumed);
        setMilkCoffeeConsumed(milkCoffeeConsumed);
        setTaiConsumed(taiConsumed);
      }
    } else {
      console.log("No data available for calculation.");
    }
  };

  const toggleCalendar = () => {
    setShowCalendar((prevState) => !prevState);
  };

  return (
    <>
      {isMenuOpen ? (
        <Menu className="z-20" closeMenu={closeMenu} />
      ) : (
        <div className="flex justify-center bg-[#e8f0fb] z-50  relative">
          <div className="w-full h-[95vh] absolute rounded-[4000px] bg-[#15406d] mt-[-60vh] z-40 circle"></div>
          <div className="w-[77%] z-50">
            <div className="flex justify-between my-6">
              <div className="btn" onClick={() => setIsMenuOpen(!isMenuOpen)}>
                <MenuIcon fontSize="large" />
              </div>
              <div className="rounded-full w-9 h-9 bg-slate-500">
                <p className="flex justify-center items-center py-1">AB</p>
              </div>
            </div>
            <div
              className="pb-5 z-50"
              dir={i18n.language === "ar" ? "rtl" : "ltr"}
            >
              <h5 className="text-gray-500">5/5/2024</h5>
              <h1 className="text-white">{t("live.hello")}, Anas</h1>
            </div>
            <div className="flex flex-col">
              <div className="flex">
                <div className={`flex justify-center py-4 w-[40%] mr-14`}>
                  <input
                    className="outline outline-1 outline-gray-800 bg-inherit rounded-sm hover:outline-black active:outline-blue-700 "
                    type="text"
                    id="nn"
                    onClick={() => {
                      toggleCalendar();
                      handleInputClick();
                    }}
                    placeholder={
                      selectedDate
                        ? dayjs(selectedDate).format("DD/MM/YYYY")
                        : "Select date"
                    }
                  />
                </div>
                <div className="flex justify-center py-4 w-[50%]  ">
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <TimePicker
                      views={["hours"]}
                      value={selectedTime}
                      onChange={(newTime) => {
                        setSelectedTime(newTime);
                        setTimePickerOpen(false);
                      }}
                      ampm={false}
                      minutesStep={5}
                      selectedTime={selectedTime}
                    />
                  </LocalizationProvider>
                </div>
              </div>
              <div className="flex justify-center py-4 ">
                {showCalendar && (
                  <VanillaCalendar
                    config={{
                      actions: {
                        clickDay(event, dates) {
                          console.log(dates.selectedDates);
                          setSelectedDate(dates.selectedDates);
                          toggleCalendar();
                        },
                      },
                    }}
                  />
                )}
              </div>
            </div>
            {/* Afficher les statistiques */}
            <div className="flex justify-center z-50">
              <div className=" ">
                <div className="flex ">
                  <div className="w-1/2 bg-[#f9fafe] mx-4 rounded-2xl shadow-lg pl-10">
                    <div className="pr-10 py-4 font-bold text-2xl mb-2 text-[#0a2554]">
                      {t("live.coffee")}
                    </div>
                    {/* Replace the img src with your coffee icon */}
                    <img
                      src="../coffee.svg"
                      alt="coffee"
                      className="w-14 py-4"
                    />
                    <div className="font-bold text-xl mb-2 text-[#0a2554] pt-6">
                      {coffeeCount}
                    </div>
                    <div className="flex justify-between pb-4">
                      
                 {coffeeCount >0 &&     
                     <button className=" mr-2 rounded border border-indigo-600 bg-[#0a2554] w-[60%] text-white hover:bg-transparent hover:text-indigo-600 focus:outline-none focus:ring active:text-indigo-500" type="button"onClick={() =>{ handleDetailClick("coffee"); handleClickOpen();}}> 
                       
                        {t("detail.detail")}
                      </button>} 
                    </div>
                  </div>

                  <div className="w-1/2 bg-[#f9fafe] mx-4 rounded-2xl shadow-lg pl-10">
                    <div className="pr-10 py-4 font-bold text-2xl mb-2 text-[#0a2554]">
                      {t("live.juice")}
                    </div>
                    <img src="../juice.svg" alt="juice" className="w-14 py-4" />
                    <div className="font-bold text-xl mb-2 text-[#0a2554] pt-6">
                      {juiceCount}
                    </div>
                    <div className="flex justify-between pb-4 ">
                      
                    {juiceCount > 0 &&
                        <button className=" mr-2 rounded border border-indigo-600 bg-[#0a2554] w-[60%] text-white hover:bg-transparent hover:text-indigo-600 focus:outline-none focus:ring active:text-indigo-500" onClick={() => {handleDetailClick("milk"); handleClickOpen();}} type="button">{t("detail.detail")}</button>
                    }
                    </div>
                  </div>
                </div>
                <div className="flex pt-3">
                  <div className="w-[150px]  bg-[#f9fafe] mx-4 rounded-2xl shadow-lg pl-10 ">
                    <p className="pr-10 py-4 font-bold text-2xl mb-2 text-[#0a2554]  ">
                      {t("live.milk")}
                    </p>
                    <img src="../milk.svg" alt="milk" className="w-14 py-4" />
                    <div className="font-bold text-xl mb-2 text-[#0a2554] pt-6">
                      {milkCount}
                    </div>
                    <div className="flex justify-between pb-4">
                      
                   {milkCount > 0 &&
                        <button className=" mr-2 rounded border border-indigo-600 bg-[#0a2554] w-[60%] text-white hover:bg-transparent hover:text-indigo-600 focus:outline-none focus:ring active:text-indigo-500" onClick={() => {handleDetailClick("milk") ; handleClickOpen();}} type="button">{t("detail.detail")}</button>
                      }
                    </div>
                  </div>
                  <div className="w-[150px] bg-[#f9fafe] mx-4 rounded-2xl shadow-lg pl-10 max-w-1/2">
                    <p className="pr-10 py-4 font-bold text-2xl mb-2 text-[#0a2554] max-w-1/2">
                      {t("live.tai")}
                    </p>
                    <img src="../tai.svg" alt="milk" className="w-14 py-4" />
                    <div className="font-bold text-xl mb-2 text-[#0a2554] pt-6">
                      {taiCount}
                    </div>
                    <div className="flex justify-between">
                      
                      {taiCount > 0 && <button className=" mr-2 rounded border border-indigo-600 bg-[#0a2554] w-[60%] text-white hover:bg-transparent hover:text-indigo-600 focus:outline-none focus:ring active:text-indigo-500" type="button" onClick={() => { handleDetailClick("tai"); handleClickOpen(); }}>{t("detail.detail")}</button>}
                   
                      

                      
                    </div>
                  </div>
                </div>
                <div className="flex pt-3">
                  <div className="w-[150px]  bg-[#f9fafe] mx-4 rounded-2xl shadow-lg pl-10 ">
                    <p className="pr-10 py-4 font-bold text-2xl mb-2 text-[#0a2554]  ">
                      {t("live.milkCoffee")}
                    </p>
                    <img
                      src="../milkcoffee.png"
                      alt="milkCoffee"
                      className=" w-16 py-4"
                    />
                    <div className="font-bold text-xl mb-2 text-[#0a2554] pt-6">
                      {milkCoffeCount}
                    </div>
                    <div className="flex justify-between pb-4">
                      
                    
                      {milkCoffeCount > 0 &&     <button className=" mr-2 rounded border border-indigo-600 bg-[#0a2554] w-[60%] text-white hover:bg-transparent hover:text-indigo-600 focus:outline-none focus:ring active:text-indigo-500" type="button" onClick={() => {handleDetailClick("milkCoffee"); handleClickOpen();}}>{t("detail.detail")}</button>}
                      
                    </div>
                  </div>
                  <div className="w-[150px] bg-[#f9fafe] mx-4 rounded-2xl shadow-lg pl-10 max-w-1/2"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
   
   
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <DialogTitle  sx={{ m: 0, p: 2 }} id="customized-dialog-title">
        {t(`live.${selectedCategory}`)}  
        </DialogTitle>
        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
        <DialogContent dividers>
        <div dir={i18n.language === "ar" ? "rtl" : "ltr"} className="bg-[#e8f0fb] z-50 h-screen relative">
      {/* Check if detailData is defined before mapping */}
      {detailData && detailData.length > 0 ? (
        detailData.map((item) => (
          
          <div key={item.id} className="bg-[#f9fafe] mx-4 rounded-2xl shadow-lg">
            {/* Utilize the data from detailData to display details */}
            
            <img src={item.image} alt={item.category} className="py-4" />
            <div className="font-bold text-xl text-[#0a2554]">
              {t("detail.id")}: {item.id}
            </div>
            <div className="font-bold text-xl text-[#0a2554] pt-6 mb-4">
              {t("detail.date")}:
              <p> {item.date}</p>
            </div>
          </div>
        ))
      ) : (
        <div>{t("detail.dataNotFound")}</div>
      )}
    </div>
        </DialogContent>
      
      </BootstrapDialog>
      
    </>
  );
};

export default PerDay;
