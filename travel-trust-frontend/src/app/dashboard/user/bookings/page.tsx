import Booking from "@/views/Booking";
import React from "react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Bookings for user",
  description: "Travel trust is on of the best travel agency for Bangladesh",
};
const BookingsPage = () => {
  return (
    <>
      <Booking />
    </>
  );
};

export default BookingsPage;
