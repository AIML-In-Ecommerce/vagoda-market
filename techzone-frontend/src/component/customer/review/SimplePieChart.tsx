import { useState } from "react";
import { PieChart } from "react-minimal-pie-chart";

interface SimplePieChartProps {
  positiveValue: number;
  negativeValue: number;
  trashValue: number;
}

export default function SimplePieChart(props: SimplePieChartProps) {
  const [shiftedIndex, setShiftedIndex] = useState<number>(-1);
  // const calculateLabelPosition = (index: number, shiftedIndex: number) => {
  //   const basePosition = 50; // Vị trí trung tâm cơ bản
  //   const shiftAmount = 6; // Lượng dịch chuyển của đoạn
  //   if (index === shiftedIndex) {
  //     return basePosition + shiftAmount;
  //   }
  //   return basePosition;
  // };
  return (
    <div className="flex flex-col gap-2 items-center">
      <PieChart
        data={[
          { title: "Tích cực", value: props.positiveValue, color: "#5593ec" },
          { title: "Tiêu cực", value: props.negativeValue, color: "#FF0000" },
          { title: "Phản hồi rác", value: props.trashValue, color: "#808080" },
        ]}
        label={({ dataEntry }) => `${Math.round(dataEntry.percentage)} %`}
        labelPosition={60}
        labelStyle={{
          fontSize: "7px",
          fontFamily: "sans-serif",
          fill: "#ffffff",
        }}
        segmentsTabIndex={shiftedIndex}
        segmentsShift={(index) => {
          console.log("click segment", index);
          return index === shiftedIndex ? 3 : 0;
        }}
        startAngle={-90}
        paddingAngle={1}
        // lineWidth={70}
        radius={36}
        style={{ height: "100%", width: "100%" }}
        segmentsStyle={(index) => ({
          transition: "stroke .3s, transform .3s",
          transform: index === shiftedIndex ? "scale(1.1)" : "scale(1.0.5)",
          cursor: "pointer",
        })}
        animate
        onClick={(event, index) => {
          console.log("click", index);
          setShiftedIndex(index);
        }}
      />

      <div className="text-xs italic">Số lượng phản hồi</div>

      {/* <PieChart
        data={[
          { title: "One", value: 10, color: "#E38627" },
          { title: "Two", value: 15, color: "#C13C37" },
          { title: "Three", value: 20, color: "#6A2135" },
        ]}
        radius={60}
        lineWidth={60}
        segmentsStyle={{ transition: "stroke .3s", cursor: "pointer" }}
        animate
        label={({ dataEntry }) => `${Math.round(dataEntry.percentage)} %`}
        labelPosition={100 - 60 / 2}
        labelStyle={{
          fontSize: "5px",
          fontFamily: "sans-serif",
          fill: "#121212",
        }}
        style={{ height: "200px" }}
        viewBoxSize={[100, 100]}
        center={[50, 50]}
        background="#bfbfbf"
        lengthAngle={360}
        startAngle={0}
        paddingAngle={0}
        rounded
        onClick={(event, index) => {
          // console.log(Clicked segment ${index});
        }}
        onMouseOver={(event, index) => {
          // console.log(Mouse over segment ${index});
        }}
        onMouseOut={(event, index) => {
          // console.log(Mouse out segment ${index});
        }}
      /> */}
    </div>
  );
}
