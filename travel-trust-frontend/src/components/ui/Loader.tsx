import { Spin } from "antd";

const Loader = () => {
  return (
    <div className="pt-[20%]">
      <Spin tip="Loading..." size="large" className="text-green-400">
        <div className="content" />
      </Spin>
    </div>
  );
};

export default Loader;
