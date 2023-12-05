"use client";

import { generateRandomHexColor } from "@/utils/common";
import React, { useState, useEffect } from "react";

const DateTime = () => {
  const [currentDateTime, setCurrentDateTime] = useState<Date>();
  const [bgColor, setBgColor] = useState<string>("#000000");

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentDateTime(new Date());
    }, 1000);

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  const formattedDateTime = currentDateTime?.toLocaleString();

  return (
    <div className={`bg-transparent py-0 h-6 flex items-center justify-end`}>
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
