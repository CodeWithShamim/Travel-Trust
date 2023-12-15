"use client";

import React from "react";
import Confetti from "react-confetti";

const ConfettiComponent = ({ active }: { active: boolean }) => {
  return (
    <Confetti
      numberOfPieces={200}
      recycle={false}
      width={window?.innerWidth - 20}
      height={window?.innerHeight - 20}
      run={active}
    />
  );
};

export default ConfettiComponent;
