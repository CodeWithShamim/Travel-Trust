import Profile from "@/views/Profile";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "User profile",
};

const ProfilePage = () => {
  return (
    <>
      <Profile />
    </>
  );
};

export default ProfilePage;
