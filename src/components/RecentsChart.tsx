import { FC } from 'react';
import ReactApexChart from 'react-apexcharts';

interface IRecentsChartProps {
  title: string;
  chartData: any[];
}

export const RecentsChart:FC<IRecentsChartProps> = ({ title, chartData }) => {
  const categories = chartData.flatMap(Object.keys) || [];
  const values = chartData.flatMap(Object.values);
  const colors = title === 'Income' ? ['#00A300'] : ['#FF0000'];

  const options = {
    chart: {
      height: 400,
      zoom: {
        enabled: false
      }
    },
    dataLabels: {
      enabled: true,
    },
    colors: colors,
    title: {
      text: `${title} Transactions in recent months`,
      algin: 'left'
    },
    grid: {
      row: {
        colors: ['#f3f3f3', 'transparent'],
        opacity: 0.5
      },
    },
    xaxis: {
      categories: categories,
    },
  };

  const series = [
    {
      name: `${title}`,
      data: values || []
    }
  ];

  return (
      <ReactApexChart
        type="line"
        options={options}
        series={series}
        height={400}
      />
  );
};
