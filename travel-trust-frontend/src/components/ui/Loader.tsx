import { Spin } from "antd";
import styles from "@/styles/loader.module.css";

const Loader = () => {
  return (
    <div className="w-full min-h-screen mx-auto flex justify-center items-center">
      <span className={`${styles["loader1"]}`}></span>
    </div>
  );
};

export default Loader;
