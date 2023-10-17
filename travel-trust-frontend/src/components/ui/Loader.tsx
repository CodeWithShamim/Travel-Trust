import { Spin } from "antd";

const Loader = () => {
  return (
    <div className="pt-[20%]">
      <Spin tip="Loading..." size="large">
        <div className="content" />
      </Spin>
    </div>
  );
};

export default Loader;
