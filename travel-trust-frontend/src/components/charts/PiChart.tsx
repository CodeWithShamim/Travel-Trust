import { ChartOptionsData } from "@/constants/commons";
import { Pie } from "react-chartjs-2";

interface IPiChartProps {
  data: any;
  options?: any;
}

const PiChart = ({ data, options = ChartOptionsData }: IPiChartProps) => {
  return (
    <div className="w-full">
      <Pie data={data} options={options} />
    </div>
  );
};

export default PiChart;
