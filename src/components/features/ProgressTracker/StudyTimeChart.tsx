import React from 'react';
import { Line } from 'react-chartjs-2';
import { format } from 'date-fns';
import { ProgressEntry } from '../../../types/study';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
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

interface StudyTimeChartProps {
  weeklyData: ProgressEntry[];
}

export function StudyTimeChart({ weeklyData }: StudyTimeChartProps) {
  const data = {
    labels: weeklyData.map(entry => format(new Date(entry.date), 'MMM d')),
    datasets: [{
      label: 'Study Hours',
      data: weeklyData.map(entry => entry.hoursStudied),
      borderColor: 'rgb(14, 165, 233)',
      backgroundColor: 'rgba(14, 165, 233, 0.5)',
      tension: 0.3
    }]
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'Weekly Study Time'
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'Hours'
        }
      }
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 p-4 rounded-lg">
      <Line data={data} options={options} />
    </div>
  );
}