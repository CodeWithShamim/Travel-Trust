"use client";

import React, { useState, useEffect } from "react";

const DateTime = () => {
  const [currentDateTime, setCurrentDateTime] = useState<Date>();

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
    <p
      className={`absolute top-0 right-0 z-[999] bg-black hidden md:block text-green-400 rounded px-1 font-bold text-xs`}
    >
      {formattedDateTime}
    </p>
  );
};

export default DateTime;
