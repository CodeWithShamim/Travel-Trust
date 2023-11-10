import Profile from "@/views/Profile";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "User profile",
};

const ProfilePage = () => {
  return (
    <div>
      <Profile />
    </div>
  );
};

export default ProfilePage;
