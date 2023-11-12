"use client";

import React, { Suspense } from "react";
import { AppProgressBar as Progress } from "next-nprogress-bar";

const ProgressBar = () => {
  return (
    <Suspense fallback="Loading...">
      <Progress
        height="4px"
        color="#09ea4c"
        options={{ showSpinner: false }}
        shallowRouting
      />
    </Suspense>
  );
};

export default ProgressBar;
