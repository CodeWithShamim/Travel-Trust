import Login from "@/views/Login";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Travel Trust | Login",
  description: "Login for tarvel trust",
};

const LoginPage = () => {
  return (
    <>
      <Login />
    </>
  );
};

export default LoginPage;
