import React from "react";
import { Metadata } from "next";
import Message from "@/views/message";

export const metadata: Metadata = {
  title: "Travel Trust | Message",
  description: "Message for service",
};

const messagePage = () => {
  return (
    <>
      <Message />
    </>
  );
};

export default messagePage;
