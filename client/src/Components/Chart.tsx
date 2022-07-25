import React from 'react';
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
import { Line } from 'react-chartjs-2';
ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
  );
function Chart({labels, data, label, color}) {
      const dataFormatted = {
        labels,
        datasets: [
          {
            label: label,
            data: data,
            borderWidth: 1,
            pointRadius: 1,
            borderColor: `#${color}`,
            backgroundColor: `#${color}2f`,
          }
        ],
      };
        return (
        <div className='profile-graph'><Line data={dataFormatted} />
        </div>
           );
}

export default Chart;
