import React from "react";
import styles from "@/styles/common.module.css";

const MouseScroll = () => {
  return (
    <div className={styles["scroll-downs"]}>
      <div className={styles["mousey"]}>
        <div className={styles["scroller"]}></div>
      </div>
    </div>
  );
};

export default MouseScroll;
