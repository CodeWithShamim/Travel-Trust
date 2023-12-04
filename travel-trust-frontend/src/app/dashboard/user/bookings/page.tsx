import React from "react";
import { Metadata } from "next";
import ManageBooking from "@/views/adminDashboard/ManageBooking";

export const metadata: Metadata = {
  title: "Bookings for user",
  description: "Travel trust is on of the best travel agency for Bangladesh",
};
const BookingsPage = () => {
  return (
    <>
      <ManageBooking />
    </>
  );
};

export default BookingsPage;
