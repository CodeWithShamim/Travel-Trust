"use client";

import { generateRandomHexColor } from "@/utils/common";
import React, { useState, useEffect } from "react";

const DateTime = () => {
  const [currentDateTime, setCurrentDateTime] = useState<Date>();
  const [bgColor, setBgColor] = useState<string>("#000000");

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentDateTime(new Date());
      setBgColor(getRandomColor());
    }, 1000);

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  function getRandomColor() {
    const colors = ["#000000", "#FF0000", "#0000FF"];
    const randomIndex = Math.floor(Math.random() * colors.length);
    return colors[randomIndex];
  }

  const formattedDateTime = currentDateTime?.toLocaleString();

  return (
    <div
      className={`bg-gradient-to-r from-[#025E96] to-cyan-300 py-0 h-6 flex items-center justify-end`}
    >
      <p
        className={`text-green-400 rounded px-1 font-bold text-sm text-right pr-4`}
        style={{ backgroundColor: bgColor }}
      >
        {formattedDateTime}
      </p>
    </div>
  );
};

export default DateTime;
