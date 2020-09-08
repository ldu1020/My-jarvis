/** @format */

import { nanoid } from "nanoid";
import { useStore } from "./SetUpMobX";

export const createTodoStore = () => ({
  todoList: [
    {
      id: nanoid(),
      what: "This is Test",
      until: "20:00",
      check: false,
      state: {
        autoCheck: "OFF!!",
        alerm: "ON!!",
      },
    },
  ],
  pushData(data) {
    // 데이터를 정제합니다.
    let { what, until, check, state } = data;
    let { autoCheck, alerm } = state;

    autoCheck = autoCheck ? "ON!!" : "OFF!!";
    alerm = alerm ? "ON!!" : "OFF!!";
    //  함수의 실행
    this.todoList.push({
      id: nanoid(),
      what,
      until,
      check,
      state: {
        autoCheck,
        alerm,
      },
    });
    console.log(this.todoList);
  },
  removeData(id) {
    this.todoList = this.todoList.filter((li) => id !== li.id);
  },
  get getChecked() {
    const listOfCheck = this.todoList.map((li) => li.check);
    const trueOfCheck = listOfCheck.filter((li) => li === true);
    const checkedIndex = [trueOfCheck.length, listOfCheck.length - trueOfCheck.length];
    const checkedRate = (checkedIndex[0] / listOfCheck.length) * 100;
    console.log(checkedRate);
    return { checkedIndex, checkedRate, listOfCheck };
  },
  onToggleCheck(id) {
    let target = this.todoList.find((list) => list.id === id);
    target.check = !target.check;
    console.log(target.check);
    console.log(this.todoList);
  },
  getRestTime(until) {
    const untilValue = until.split(":");
    const untilMinute = Number(untilValue[0]) * 60 + Number(untilValue[1]);
    const nowMinute = this.nowTime.getHours() * 60 + this.nowTime.getMinutes();
    const restHour = Math.floor((untilMinute - nowMinute) / 60);
    const restMinute = (untilMinute - nowMinute) % 60;
    const second = this.nowTime.getSeconds();

    return `${restHour}시 ${restMinute} 분 ${second}초`;
  },
  wiseSaying() {
    const saying = [
      { saying: "군자는 말이 어눌해도 행동에는 민첩하다", talker: "공자" },
      { saying: "최선을 자하고 나머지는 잊어라", talker: "윌터 앨스톤" },
      { saying: "나만이 내 인생을 바꿀 수 있다. 아무도 날 대신해 줄 수 없다.", talker: "캐럴 버넷" },
      { saying: "실패란 넘어지는것이 아니라 넘어진 자리에 머무는 것이다.", talker: "파스칼" },
    ];
    const random = Math.floor(Math.random() * (saying.length - 1 - 0));
    return saying[random];
  },
});

export const createChartStore = () => ({
  data: [3, 7],
});
