import { PieChart } from "react-minimal-pie-chart";

export default function SimplePieChart() {
  return (
    <div className="flex flex-col gap-2 items-center">
      <PieChart
        data={[
          { title: "Tích cực", value: 80, color: "#50C878" },
          { title: "Tiêu cực", value: 25, color: "#C13C37" },
          { title: "Phản hồi rác", value: 15, color: "#FFFFFF" },
        ]}
      />
      <div className="text-xs italic">Số lượng phản hồi</div>
    </div>
  );
}
