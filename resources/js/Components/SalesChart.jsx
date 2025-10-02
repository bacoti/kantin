// resources/js/Components/SalesChart.jsx

import { useEffect, useState } from 'react';
import axios from 'axios';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export default function SalesChart({ filters }) {
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [],
  });

  useEffect(() => {
    axios.get(route('admin.reports.sales-chart-data', filters)).then((response) => {
      const data = response.data;
      const labels = data.map((d) => new Date(d.date).toLocaleDateString('id-ID', { month: 'short', day: 'numeric' }));
      const totals = data.map((d) => d.total);

      setChartData({
        labels,
        datasets: [
          {
            label: 'Pendapatan',
            data: totals,
            borderColor: 'rgb(75, 192, 192)',
            backgroundColor: 'rgba(75, 192, 192, 0.5)',
            tension: 0.4,
          },
        ],
      });
    });
  }, [filters]);

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Grafik Tren Pendapatan',
        font: {
            size: 18
        }
      },
    },
    scales: {
        y: {
            ticks: {
                callback: function(value, index, values) {
                    return 'Rp ' + value.toLocaleString('id-ID');
                }
            }
        }
    }
  };

  return <Line options={options} data={chartData} />;
}
