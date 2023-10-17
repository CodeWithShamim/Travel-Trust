import Register from "@/pages/Register";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Travel Trust | Registration",
  description: "Registration for tarvel trust",
};

const RegisterPage = () => {
  return (
    <>
      <Register />
    </>
  );
};

export default RegisterPage;
