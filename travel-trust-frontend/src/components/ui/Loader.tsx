import { Spin } from "antd";
import styles from "@/styles/loader.module.css";

const Loader = () => {
  return (
    <div className="pt-[20%] mx-auto w-full flex justify-center items-center">
      {/* <Spin tip="Loading..." size="large" className="text-green-400">
        <div className="content" />
      </Spin> */}
      <span className={`${styles["loader1"]}`}></span>
    </div>
  );
};

export default Loader;
