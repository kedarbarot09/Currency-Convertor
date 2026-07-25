import { useEffect, useRef } from "react";
import Chart from "chart.js/auto";

function ExchangeChart({ historyData }) {
    // Reference to the canvas element
    const chartRef = useRef(null);

    // Store the chart instance
    const chartInstance = useRef(null);

    useEffect(() => {
        // Don't create a chart if there's no data
        if (!historyData.length) {
            return;
        }

        // Destroy the previous chart before creating a new one
        if (chartInstance.current) {
            chartInstance.current.destroy();
        }
        // Get the drawing context
        const ctx = chartRef.current.getContext("2d");
        // Create a new chart
        chartInstance.current = new Chart(ctx, {
            type: "line",
            data: {
                labels: historyData.map(item => item.date),
                datasets: [
                    {
                        label: "Exchange Rate",
                        data: historyData.map(item => item.rate),
                        borderColor: "#198754",
                        backgroundColor: "rgba(25,135,84,0.2)",
                        borderWidth: 2,
                        fill: true,
                        tension: 0.4
                    }
                ]
            },

            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        display: true,
                        position: "top"
                    },

                    title: {
                        display: true,
                        text: "Exchange Rate Trend (Last 7 Days)"
                    }
                }
            }
        });

        // Clean up when the component unmounts
        return () => {

            if (chartInstance.current) {
                chartInstance.current.destroy();
            }
        };
    }, [historyData]);

    return (
        <div className="card shadow-sm mt-4">
            <div className="card-body">
                <h4 className="mb-3">
                    Exchange Rate Trend
                </h4>

                <div style={{ height: "350px" }}>
                    <canvas ref={chartRef}></canvas>
                </div>
            </div>
        </div>
    );
}
export default ExchangeChart;