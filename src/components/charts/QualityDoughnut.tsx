import { Doughnut } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

export function QualityDoughnut() {
  const data = {
    labels: ["Excellent", "Good", "Fair", "Poor"],
    datasets: [
      {
        data: [42, 31, 18, 9],
        backgroundColor: [
          "oklch(0.68 0.16 155)",
          "oklch(0.66 0.11 195)",
          "oklch(0.78 0.15 75)",
          "oklch(0.6 0.22 27)",
        ],
        borderWidth: 0,
        hoverOffset: 8,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    cutout: "72%",
    plugins: {
      legend: {
        position: "bottom" as const,
        labels: { boxWidth: 8, boxHeight: 8, usePointStyle: true, padding: 14, font: { size: 12 } },
      },
      tooltip: {
        backgroundColor: "oklch(0.22 0.04 245)",
        padding: 12,
        cornerRadius: 8,
      },
    },
    animation: { animateRotate: true, animateScale: true, duration: 900 },
  };

  return <Doughnut data={data} options={options} />;
}
