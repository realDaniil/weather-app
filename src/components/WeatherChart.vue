<template>
  <canvas ref="chart" class="chart"></canvas>
</template>

<script>
import { Chart, registerables } from "chart.js";
import "chartjs-adapter-date-fns";

Chart.register(...registerables);

export default {
  props: {
    data: Array,
    labels: Array,
  },
  watch: {
    data: "updateChart",
    labels: "updateChart",
  },
  mounted() {
    this.renderChart();
  },
  methods: {
    renderChart() {
      this.chart = new Chart(this.$refs.chart, {
        type: "line",
        data: {
          labels: this.labels,
          datasets: [
            {
              label: "Temperature",
              data: this.data,
              borderColor: "rgba(75, 192, 192, 1)",
              borderWidth: 1,
              fill: false,
            },
          ],
        },
        options: {
          plugins: {
            legend: {
              display: false,
            },
            tooltip: {
              enabled: false,
              callbacks: {
                label: (context) => {
                  const time = new Date(context.label).toLocaleTimeString(
                    "en-US",
                    {
                      hour: "2-digit",
                      minute: "2-digit",
                    }
                  );
                  const temperature = context.raw;
                  return `Time: ${time}, Temp: ${temperature}°C`;
                },
              },
            },
          },
          scales: {
            x: {
              type: "time",
              time: {
                unit: "hour",
                displayFormats: {
                  hour: "HH:mm",
                },
                tooltipFormat: "HH:mm",
              },
              title: {
                display: true,
                text: "Time",
              },
              ticks: {
                source: "labels",
              },
            },
            y: {
              beginAtZero: false,
              title: {
                display: true,
                text: "Temperature (°C)",
              },
            },
          },
        },
      });
    },
    updateChart() {
      if (this.chart) {
        this.chart.data.labels = this.labels;
        this.chart.data.datasets[0].data = this.data;
        this.chart.update();
      }
    },
  },
  beforeUnmount() {
    if (this.chart) {
      this.chart.destroy();
    }
  },
};
</script>

<style scoped>
.chart {
  max-width: 300px;
}
@media (max-width: 700px) {
  .chart {
    max-width: 100%;
  }
}
</style>
