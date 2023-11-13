"use client";

import React from "react";
import { AppProgressBar as Progress } from "next-nprogress-bar";

const ProgressBar = () => {
  return (
    <Progress
      height="4px"
      color="#09ea4c"
      options={{ showSpinner: false }}
      shallowRouting
    />
  );
};

export default ProgressBar;
