"use client";

import React from "react";
import { AppProgressBar as Progress } from "next-nprogress-bar";

const ProgressBar = () => {
  return (
    <div>
      <Progress
        height="4px"
        color="#09ea4c"
        options={{ showSpinner: false }}
        shallowRouting
      />
    </div>
  );
};

export default ProgressBar;
