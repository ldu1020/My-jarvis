/** @format */

import React, { useState, useEffect } from "react";
import styled, { css } from "styled-components";
import { useStore } from "../store/SetUpMobX";
import { useObserver, useLocalStore, Observer, observer } from "mobx-react";
import { PieChart } from "./Chart";
import CountUp from "react-countup";

const DIV__list = styled.div`
  position: relative;
  background-color: #fff;
  margin: 1rem;
  padding: 1rem;
  box-shadow: 0.4rem 0.3rem 0.3rem rgba(0, 0, 0, 0.4);
`;

const BTN__RemoveBtn = styled.button`
  position: absolute;
  top: -0.2rem;
  right: -0.2rem;
  font-size: 2rem;
  color: #e9501b;
  transition: all 0.3s;
  &:hover {
    color: #ff0000;
    transform: scale(1.2);
  }
`;

const Divide = styled.div`
  width: 10%;
  height: 0.2rem;
  background-color: red;
`;

const DIV__Section__TOP = styled.div`
  padding: 1rem;
  display: flex;
  border-bottom: 1px solid gray;
`;

const P__What = styled.p`
  height: 8rem;
  width: 80%;
  color: gray;
  font-size: 1.5rem;
  font-family: "Do Hyeon", sans-serif;
`;
const P__Until = styled.p`
  color: gray;
  font-size: 1.5rem;
  font-family: "Raleway", sans-serif;
`;

const I__Watch = styled.i`
  color: skyblue;
  margin: 1rem;
`;

const DIV__Section__Bottom = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const P__RestTime = styled.p`
  color: gray;
  font-size: 1.3rem;
  margin: 0.5rem;
  font-family: "Do Hyeon", sans-serif;
`;

function List({ li }) {
  const { todoStore } = useStore();
  const { removeData, onToggleCheck } = todoStore;
  const { what, until, check, state, id } = li;
  const { autoCheck, alerm } = state;
  const [restTime, setRestTime] = useState("");
  const onRemove = (id) => {
    removeData(id);
  };
  useEffect(() => {
    // 리렌더링 문제를 해결하기 너무 어려워서 이것저것 해보다 그나마 구현이 됐다... 언젠간 꼭 해결해야한다.
    const GoGo = setTimeout(() => {
      setRestTime(() => {
        const untilValue = until.split(":");
        const untilMinute = Number(untilValue[0]) * 60 + Number(untilValue[1]);
        const nowTime = new Date();
        const nowMinute = nowTime.getHours() * 60 + nowTime.getMinutes();
        const restHour = Math.floor((untilMinute - nowMinute) / 60);
        const restMinute = (untilMinute - nowMinute) % 60;
        const second = nowTime.getSeconds();
        console.log("Im State!!!!!");
        return `${restHour}시 ${restMinute} 분 ${second}초`;
      });
    }, 1000);

    return () => {
      clearTimeout(GoGo);
    };
  }, [restTime]);

  return useObserver(() => (
    <DIV__list>
      <BTN__RemoveBtn
        onClick={() => {
          onRemove(id);
        }}
      >
        <i className="fas fa-minus-circle"></i>
      </BTN__RemoveBtn>
      <Divide />
      <DIV__Section__TOP>
        <P__What>{what}</P__What>
        <P__Until>
          <I__Watch className="far fa-clock"></I__Watch>
          {until}
        </P__Until>
      </DIV__Section__TOP>
      <DIV__Section__Bottom>
        <P__RestTime>남은시간: {restTime}</P__RestTime>
        <input type="checkbox" onClick={() => onToggleCheck(id)} />
      </DIV__Section__Bottom>
    </DIV__list>
  ));
}

const DIV__ListWrapper = styled.div`
  width: 100%;
  height: 75vh;
  overflow-y: auto;
  background-color: #f8f9fa;
`;

const DIV__Introduce = styled(DIV__list)`
  height: 8rem;
  display: flex;
  justify-content: space-between;
`;

const DIV__ChartWrapper = styled.div`
  width: 15rem;
  height: 100%;
`;

const StyledCountUp = styled(CountUp)`
  color: gray;
  font-family: "Raleway", sans-serif;
  font-size: 1.8rem;
  font-weight: 800;
  position: absolute;
  top: 50%;
  right: 15rem;
  ${(props) =>
    props.checkedRate === 100 &&
    css`
      transition: all 0.3s 1.3s;
      color: skyblue;
      transform: scale(1.2);
    `};
`;

const DIV__SayingWrapper = styled.div`
  width: 60%;
  display: flex;
  flex-direction: column;
  position: relative;
`;

const P__Saying = styled.p`
  font-family: "Do Hyeon", sans-serif;
  font-size: 1.2rem;
  color: gray;
`;

const P__Talker = styled(P__Saying)`
  font-size: 1rem;
  position: absolute;
  bottom: 0;
  left: 1rem;
`;

const Lists = observer(() => {
  const {
    todoStore: { getChecked, todoList, wiseSaying },
  } = useStore();
  const checkedRate = Math.floor(getChecked.checkedRate);
  const SayingSet = wiseSaying();
  console.log("IMLISTS HAHA");
  return (
    <DIV__ListWrapper>
      <DIV__Introduce>
        <DIV__SayingWrapper>
          <P__Saying>{`"${SayingSet.saying}"`}</P__Saying>
          <P__Talker>{`-${SayingSet.talker}`}</P__Talker>
        </DIV__SayingWrapper>
        <div>
          <StyledCountUp checkedRate={checkedRate} end={checkedRate} suffix="%" duration={1.5}></StyledCountUp>
        </div>
        <DIV__ChartWrapper>
          <PieChart />
        </DIV__ChartWrapper>
      </DIV__Introduce>

      {todoList.map((li) => (
        <List key={li.id} li={li} />
      ))}
    </DIV__ListWrapper>
  );
});

export default Lists;
