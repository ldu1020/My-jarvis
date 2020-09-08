/** @format */

import React from "react";
import { Doughnut } from "react-chartjs-2";
import { useObserver, observer } from "mobx-react";
import { useStore } from "../store/SetUpMobX";

export const PieChart = observer(() => {
  const { todoStore } = useStore();
  const { getChecked } = todoStore;
  console.log(getChecked);

  const data = {
    labels: [],
    datasets: [
      {
        backgroundColor: ["green"],
        borderColor: ["green"],
        borderWidth: 0,
        hoverBackgroundColor: ["red"],
        hoverBorderColor: ["red"],
        data: getChecked.checkedIndex,
      },
    ],
  };
  const options = {
    responsive: true,
    maintainAspectRatio: true,
  };

  return <Doughnut data={data} options={options} />;
});
