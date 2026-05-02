import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Filler,
  Legend,
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Filler, Legend);

const labels = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

export function TrendChart() {
  const data = {
    labels,
    datasets: [
      {
        label: "pH",
        data: [7.2, 7.3, 7.1, 7.4, 7.5, 7.3, 7.4],
        borderColor: "oklch(0.55 0.13 240)",
        backgroundColor: "oklch(0.55 0.13 240 / 0.15)",
        fill: true,
        tension: 0.4,
        pointRadius: 0,
        pointHoverRadius: 5,
        borderWidth: 2.5,
      },
      {
        label: "Turbidity (NTU)",
        data: [3.1, 3.4, 4.2, 3.8, 2.9, 3.0, 2.7],
        borderColor: "oklch(0.66 0.11 195)",
        backgroundColor: "oklch(0.66 0.11 195 / 0.15)",
        fill: true,
        tension: 0.4,
        pointRadius: 0,
        pointHoverRadius: 5,
        borderWidth: 2.5,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    interaction: { mode: "index" as const, intersect: false },
    plugins: {
      legend: {
        position: "top" as const,
        align: "end" as const,
        labels: { boxWidth: 8, boxHeight: 8, usePointStyle: true, font: { size: 12 } },
      },
      tooltip: {
        backgroundColor: "oklch(0.22 0.04 245)",
        padding: 12,
        cornerRadius: 8,
        titleFont: { size: 12 },
        bodyFont: { size: 12 },
      },
    },
    scales: {
      x: { grid: { display: false }, ticks: { color: "oklch(0.5 0.03 245)" } },
      y: { grid: { color: "oklch(0.92 0.01 240)" }, ticks: { color: "oklch(0.5 0.03 245)" } },
    },
    animation: { duration: 900, easing: "easeOutQuart" as const },
  };

  return <Line data={data} options={options} />;
}
