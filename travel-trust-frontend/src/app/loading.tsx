import { Spin } from "antd";

const Loading = () => {
  return (
    <div className="pt-[20%]">
      <Spin tip="Loading..." size="large">
        <div className="content" />
      </Spin>
    </div>
  );
};

export default Loading;
