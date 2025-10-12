'use client'

import React from 'react'
import { AppProgressBar as Progress } from 'next-nprogress-bar'

const ProgressBar = () => {
  return (
    <Progress
      height="2px"
      color="#FFD20A"
      // color="#FFD20A"
      options={{ showSpinner: false }}
      shallowRouting
    />
  )
}

export default ProgressBar
