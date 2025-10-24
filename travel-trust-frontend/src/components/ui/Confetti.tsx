'use client';

import React from 'react';
import Confetti from 'react-confetti';

const ConfettiComponent = ({ active }: { active: boolean }) => {
  return (
    <Confetti
      numberOfPieces={400}
      recycle={false}
      width={window?.innerWidth}
      height={window?.innerHeight}
      run={active}
    />
  );
};

export default ConfettiComponent;
