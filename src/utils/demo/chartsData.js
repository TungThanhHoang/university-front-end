
export const doughnutLegends = [
  { title: "Xuất sắc", color: "bg-orange-500" },
  { title: "Giỏi", color: "bg-yellow-500" },
  { title: "Khá", color: "bg-teal-600" },
  { title: "Trung bình", color: "bg-purple-600" },
  { title: "Yếu, kém", color: "bg-blue-600" },
];


export const doughnutOptions = {
  data: {
    datasets: [
      {
        data: [5, 15, 65, 10, 5],
        backgroundColor: [
          "#DD6031",
          "#FFBA08",
          "#0694a2",
          "#1c64f2",
          "#7e3af2",
        ],
        label: "Dataset 1",
      },
    ],
    labels: ["Xuất sắc", "Giỏi", "Khá", "Trung bình", "Yếu"],
  },
  options: {
    responsive: true,
    cutoutPercentage: 80,
  },
  legend: {
    display: false,
  },
};
