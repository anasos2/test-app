import React from "react";
import { useTranslation } from "react-i18next";

const Detail = () => {
  const { t, i18n } = useTranslation();
  console.log("detail", detailData);
  console.log("category", selectedCategory);

  return (
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
              {t("detail.date")}: {item.date}
            </div>
          </div>
        ))
      ) : (
        <div>No data available for this category.</div>
      )}
    </div>
  );
};



export default Detail;
