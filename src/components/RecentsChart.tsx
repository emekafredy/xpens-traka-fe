import { FC } from 'react';
import ReactApexChart from 'react-apexcharts';

export const RecentsChart:FC = () => {
  const options = {
    chart: {
      height: 350,
      zoom: {
        enabled: true
      }
    },
    xaxis: {
      categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
      title: {
        text: 'Month'
      }
    },
    yaxis: {
      title: {
        text: 'Amount'
      },
      min: 5,
      max: 40
    },
    title: {
      text: 'Transactions on recent months',
      algin: 'left'
    }
  };

  const series = [
    {
      name: "Income - 2013",
      data: [28, 29, 33, 36, 32, 32, 33]
    },
    {
      name: "Expenses - 2013",
      data: [12, 11, 14, 18, 17, 13, 13]
    }
  ];

  return (
      <ReactApexChart
        type="line"
        options={options}
        series={series}
        height={350}
      />
  );
};
