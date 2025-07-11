import React, { useMemo } from 'react'; // Import useMemo
import { Bar } from 'react-chartjs-2';

/**
 * Displays prediction probabilities as a bar chart.
 *
 * @param {object | null} props.probabilities - Object where keys are class names and values are probabilities (0-1).
 */
function ProbabilityChart({ probabilities }) {
  if (!probabilities || Object.keys(probabilities).length === 0) {
    return null; // Don't render if no probabilities are available
  }

  // Memoize chartData so it's only recalculated when 'probabilities' prop changes.
  const chartData = useMemo(() => {
    return {
      labels: Object.keys(probabilities).map((key) =>
        key
          .replace(/([A-Z])/g, ' $1') // Add space before capital letters (e.g., "earlyBlight" -> "early Blight")
          .replace(/^./, (str) => str.toUpperCase()) // Capitalize first letter (e.g., "early Blight" -> "Early Blight")
      ),
      datasets: [
        {
          label: 'Probability',
          data: Object.values(probabilities).map((val) => (val * 100).toFixed(2)), // Convert to percentage and fix to 2 decimals
          backgroundColor: [
            "rgba(75, 192, 192, 0.7)", // Greenish
            "rgba(153, 102, 255, 0.7)", // Purple
            "rgba(255, 159, 64, 0.7)", // Orange
            "rgba(255, 99, 132, 0.7)", // Red
            "rgba(54, 162, 235, 0.7)", // Blue
            "rgba(201, 203, 207, 0.7)", // Gray
            "rgba(255, 206, 86, 0.7)", // Yellow
          ],
          borderColor: [
            "rgba(75, 192, 192, 1)",
            "rgba(153, 102, 255, 1)",
            "rgba(255, 159, 64, 1)",
            "rgba(255, 99, 132, 1)",
            "rgba(54, 162, 235, 1)",
            "rgba(201, 203, 207, 1)",
            "rgba(255, 206, 86, 1)",
          ],
          borderWidth: 1,
        },
      ],
    };
  }, [probabilities]); // Dependency array: Recalculate only if 'probabilities' prop changes


  // Memoize chartOptions as it's static within this component
  const chartOptions = useMemo(() => {
    return {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: { display: false },
        title: { display: false }, // Title is handled externally
        tooltip: {
          callbacks: {
            label: function(context) {
              let label = context.label || '';
              if (label) { label += ': '; }
              label += context.raw + '%';
              return label;
            }
          },
          backgroundColor: 'rgba(0, 0, 0, 0.7)',
          titleColor: '#fff',
          bodyColor: '#fff',
          borderColor: 'rgba(255, 255, 255, 0.3)',
          borderWidth: 1,
        },
      },
      scales: {
        x: {
          ticks: { color: 'white' },
          grid: { color: 'rgba(255, 255, 255, 0.1)' },
        },
        y: {
          ticks: {
            color: 'white',
            callback: function(value) { return value + '%'; }
          },
          grid: { color: 'rgba(255, 255, 255, 0.1)' },
          beginAtZero: true,
          max: 100,
        },
      },
    };
  }, []); // Empty dependency array: This object is created only once.

  return (
    <div className="p-6 mt-8 border rounded-lg bg-white/10 border-white/20">
      <h3 className="mb-4 text-lg font-semibold text-green-300">
        Prediction Probabilities
      </h3>
      <div className="h-64 sm:h-80 md:h-96"> {/* Fixed height for the chart container */}
        <Bar data={chartData} options={chartOptions} />
      </div>
    </div>
  );
}

export default ProbabilityChart;