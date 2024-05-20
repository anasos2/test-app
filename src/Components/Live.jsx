import React, { useEffect, useState } from "react";
import MenuIcon from '@mui/icons-material/Menu';
import { useTranslation } from 'react-i18next';
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

const Live = () => {
    

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
    const [open, setOpen] = React.useState(false);
    const { t, i18n } = useTranslation();
    const [apiData, setApiData] = useState([]);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState('');
    const [detailData, setDetailData] = useState([]);
    const closeMenu = () => {
        setIsMenuOpen(false);
    };

    const fetchData = async () => {
        try {
            const response = await fetch('http://localhost:5000/data');
            const contentType = response.headers.get('content-type');
            if (contentType && contentType.includes('application/json')) {
                const responseData = await response.json();
                setApiData(responseData);
                console.log("Data updated from API");
            } else {
                throw new Error('Response is not in JSON format');
            }
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };
    
    

    const calculateLiveCount = (category) => {
        let count = 0;
        const currentDate = new Date();
        apiData.forEach(itemData => {
            const itemDate = new Date(itemData.date);
            if (itemData.category === category && itemDate > currentDate) {
                count++;
            }
        });
        return count;
    };

    

    const objCalculateLive = (category) => {
        let consumedObjects = [];
        const currentDate = new Date();
        apiData.forEach(itemData => {
            const itemDate = new Date(itemData.date);
            if (itemData.category === category && itemDate > currentDate) {
                consumedObjects.push(itemData);
            }
        });
        return consumedObjects;
    };

    const handleDetailClick = (category) => {
        const detailData = objCalculateLive(category);
        setSelectedCategory(category);
        setDetailData(detailData);
        setOpen(true);
    };

    useEffect(() => {
        fetchData();
        const interval = setInterval(() => {
            fetchData();
        }, 1000);
        return () => clearInterval(interval);
    }, []);

   

    return (
        <>
            {isMenuOpen ? (
                <Menu className="z-20" closeMenu={closeMenu} />
            ) : (
                
                    <div className="flex justify-center  bg-[#e8f0fb] z-40 sm:h-screen relativ ">
                <div className=" w-full h-[95vh] absolute rounded-[4000px] bg-[#15406d]  mt-[-60vh] z-30 circle "></div>
                <div className="w-[77%] z-50">
                    <div className="flex justify-between my-6  ">
                         <div className="btn" onClick={() => setIsMenuOpen(!isMenuOpen)}>
      <MenuIcon fontSize="large"/>
    </div>
                        <div className=" rounded-full w-9 h-9 bg-slate-500"><p className="flex justify-center items-center py-1">AB</p></div>
                    </div>
                    <div className=" pb-5 z-50" dir={i18n.language === 'ar' ? 'rtl' : 'ltr'} >
                        <h5 className=" text-gray-500">5 may 2024</h5>
                        <h1 className=" text-white ">{t('live.hello')}, Anas</h1>
                    </div>
                    {/* Afficher les statistiques */}
                    <div className="flex  justify-center z-50 ">
                        <div className=" ">
                            <div className="flex ">
                                <div className="w-[150px] bg-[#f9fafe] mx-4 rounded-2xl shadow-lg pl-10">
                                    <div className="pr-100 py-4 font-bold text-2xl mb-2 text-[#0a2554]">{t('live.coffee')}</div>
                                    <img src="../coffee.svg" alt="coffee" className=" w-14 py-4" />
                                    <div className="font-bold text-xl mb-2 text-[#0a2554] pt-6">{calculateLiveCount('coffee')}</div>
                                    <div className="flex justify-between pb-4 ">
                      
                    
                       <button className=" mr-2 rounded border border-indigo-600 bg-[#0a2554] w-[60%] text-white hover:bg-transparent hover:text-indigo-600 focus:outline-none focus:ring active:text-indigo-500" type="button"onClick={() =>{ handleDetailClick("coffee"); handleClickOpen();}}> 
                       
                        {t("detail.detail")}
                      </button>
                    
                    </div>
                                </div>
                                {/* Ajoutez les autres sections ici */}
                                <div className="w-[150px] bg-[#f9fafe] mx-4 rounded-2xl shadow-lg pl-10">
                                    <div className="pr-10 py-4 font-bold text-2xl mb-2 text-[#0a2554]">{t('live.juice')}</div>
                                    <img src="../juice.svg" alt="juice" className="w-14 py-4" />
                                    <div className="font-bold text-xl mb-2 text-[#0a2554] pt-6">{calculateLiveCount('juice')}</div>
                                    <div className="flex justify-between pb-4 ">
                      
                    
                      <button className=" mr-2 rounded border border-indigo-600 bg-[#0a2554] w-[60%] text-white hover:bg-transparent hover:text-indigo-600 focus:outline-none focus:ring active:text-indigo-500" type="button"onClick={() =>{ handleDetailClick("juice"); handleClickOpen();}}> 
                       
                       {t("detail.detail")}
                     </button>
                    
                    </div>
                                </div>
                            </div>
                            <div className="flex pt-3">
                                <div className="w-[150px]  bg-[#f9fafe] mx-4 rounded-2xl shadow-lg pl-10 ">
                                    <p className="pr-10 py-4 font-bold text-2xl mb-2 text-[#0a2554]  ">{t('live.milk')}</p>
                                    <img src="../milk.svg" alt="milk" className="w-14 py-4" />
                                    <div className="font-bold text-xl mb-2 text-[#0a2554] pt-6">{calculateLiveCount('milk')}</div>
                                    <div className="flex justify-between pb-4 ">
                      
                    
                      <button className=" mr-2 rounded border border-indigo-600 bg-[#0a2554] w-[60%] text-white hover:bg-transparent hover:text-indigo-600 focus:outline-none focus:ring active:text-indigo-500" type="button"onClick={() =>{ handleDetailClick("milk"); handleClickOpen();}}> 
                       
                       {t("detail.detail")}
                     </button>
                    
                    </div>
                                </div>
                                <div className="w-[150px] bg-[#f9fafe] mx-4 rounded-2xl shadow-lg pl-10 max-w-1/2">
                                    <p className="pr-10 py-4 font-bold text-2xl mb-2 text-[#0a2554] max-w-1/2">{t('live.tai')}</p>
                                    <img src="../tai.svg" alt="milk" className="w-14 py-4" />
                                    <div className="font-bold text-xl mb-2 text-[#0a2554] pt-6">{calculateLiveCount('tai')}</div>
                                    <div className="flex justify-between pb-4 ">
                      
                    
                      <button className=" mr-2 rounded border border-indigo-600 bg-[#0a2554] w-[60%] text-white hover:bg-transparent hover:text-indigo-600 focus:outline-none focus:ring active:text-indigo-500" type="button"onClick={() =>{ handleDetailClick("tai"); handleClickOpen();}}> 
                       
                       {t("detail.detail")}
                     </button>
                    
                    </div>
                                </div>
                            </div>
                            <div className="flex pt-3">
                                <div className="w-[150px]  bg-[#f9fafe] mx-4 rounded-2xl shadow-lg pl-10 ">
                                    <p className="pr-10 py-4 font-bold text-2xl mb-2 text-[#0a2554]  ">{t('live.milkCoffee')}</p>
                                    <img src="../milkcoffee.png" alt="milk" className="w-14 py-4" />
                                    <div className="font-bold text-xl mb-2 text-[#0a2554] pt-6">{calculateLiveCount('milkCoffee')}</div>
                                    <div className="flex justify-between pb-4 ">
                      
                    
                      <button className=" mr-2 rounded border border-indigo-600 bg-[#0a2554] w-[60%] text-white hover:bg-transparent hover:text-indigo-600 focus:outline-none focus:ring active:text-indigo-500" type="button"onClick={() =>{ handleDetailClick("milkCoffee"); handleClickOpen();}}> 
                       
                       {t("detail.detail")}
                     </button>
                    
                    </div>
                                </div>
                                <div className="w-[150px] bg-[#f9fafe] mx-4 rounded-2xl shadow-lg pl-10 max-w-1/2">
                                  
                                </div>
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
                <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
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
                        {detailData && detailData.length > 0 ? (
                            detailData.map((item) => (
                                <div key={item.id} className="bg-[#f9fafe] mx-4 rounded-2xl shadow-lg">
                                    {/* Display details for each consumed object */}
                                    <img src={item.image} alt={item.category} className="py-4" />
                                    <div className="font-bold text-xl text-[#0a2554]">
                                        {t("detail.id")}: {item.id}
                                    </div>
                                    <div className="font-bold text-xl text-[#0a2554] pt-6 mb-4">
                                        {t("detail.date")}: <p>{item.date}</p>
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

export default Live;
