import { ChartOptionsData } from "@/constants/commons";
import { Line } from "react-chartjs-2";

interface ILineChartProps {
  data: any;
  options?: any;
}

const LineChart = ({ data, options = ChartOptionsData }: ILineChartProps) => {
  return (
    <div className="w-full">
      <Line data={data} options={options} />
    </div>
  );
};

export default LineChart;
