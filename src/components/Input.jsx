/** @format */

import React, { useState } from "react";
import { useStore } from "../store/SetUpMobX";
import { useObserver, useLocalStore } from "mobx-react";
import styled, { css } from "styled-components";

const DIV__InputZone = styled.div`
  background-color: #f7f7f7;
  width: 30rem;
  height: 100vh;
  position: absolute;
  bottom: 0;
  right: 0;
  box-shadow: -10rem 0 20rem rgba(0, 0, 0, 0.5);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding-bottom: 5rem;
  transition: transform 1s, box-shadow 0.5s, opacity 0.5s;
  ${(props) =>
    props.inputToggle &&
    css`
      transform: translateX(40rem);
      box-shadow: none;
      opacity: 0;
    `};
`;

const ToggleBtn = styled.button`
  display: visible;
  position: fixed;
  top: 90%;
  right: 10%;
  z-index: 1;
  font-size: 3rem;
  transform: rotate(225deg);
  color: red;
  transition: transform 1s ease-in-out, color 0.5s 0.8s;

  ${(props) =>
    props.inputToggle &&
    css`
      color: skyblue;
      transform: rotate(0);
    `}
`;

const DIV__DefaultWrapper = styled.div`
  width: 100%;
  height: 30%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const InputBasic = styled.input`
  height: 2rem;
  width: 100%;
  border: none;
  outline: none;
  background: #fff;
  box-shadow: 0.1rem 0.1rem 0.5rem rgba(0, 0, 0, 0.2);
  margin: 0.5rem;
  border-radius: 5px;
  transition: all 0.3s;
  &:focus {
    background-color: #f8f8f8;
    border: 1px solid skyblue;
    box-shadow: none;
  }
`;

const INPUT__What = styled(InputBasic)`
  width: 90%;
  height: 3rem;
`;

const INPUT__Until = styled(InputBasic)`
  width: 40%;
  height: 3rem;
`;

const InputHeadBasic = styled.h2`
  font-family: "Do Hyeon", sans-serif;
  margin-top: 1rem;
`;

const DIV__OptionZone = styled.div`
  width: 80%;
  height: 25%;
  border: 1px solid lightgray;
  border-radius: 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;
`;

const H2__OptionHead = styled(InputHeadBasic)`
  font-size: 2rem;
`;

const BTN__Submit = styled.button`
  font-family: "Do Hyeon", sans-serif;
  background-color: skyblue;
  width: 8rem;
  height: 3rem;
  color: #fff;
  border-radius: 0.4rem;
  font-size: 2.2rem;
  box-shadow: 0 0.4rem 0.3rem rgba(0, 0, 0, 0.4);
  transition: all 0.3s;
  margin-top: 2rem;
  &:hover {
    background-color: orange;
    transform: scale(1.2);
  }
`;

function Input() {
  const [inputToggle, setInputToggle] = useState(false);
  const inputState = useLocalStore(() => ({
    data: {
      what: "",
      until: "",
      state: {
        check: false,
        autoCheck: false,
        alerm: false,
      },
    },
    onChange(event) {
      const value = event.target.value;
      const name = event.target.name;
      this.data = { ...this.data, [name]: value };
    },
    onToggleOption(event) {
      const { state } = this.data;
      const value = event.target.checked;
      const name = event.target.name;
      this.data = {
        ...this.data,
        state: { ...state, [name]: value },
      };
    },
  }));

  const { todoStore } = useStore();
  const { onChange, onToggleOption } = inputState;
  const onPushData = () => {
    todoStore.pushData(inputState.data);
    inputState.data = {
      what: "",
      until: "",
      check: false,
      state: {
        autoCheck: false,
        alerm: false,
      },
    };
  };

  return useObserver(() => (
    <>
      <ToggleBtn
        onClick={() => {
          setInputToggle(!inputToggle);
        }}
        inputToggle={inputToggle}
      >
        <i className="fas fa-plus-circle"></i>
      </ToggleBtn>

      <DIV__InputZone inputToggle={inputToggle}>
        <DIV__DefaultWrapper>
          <InputHeadBasic>할 일</InputHeadBasic>
          <INPUT__What type="text" name="what" onChange={onChange} value={inputState.data.what} />

          <InputHeadBasic>언제 까지</InputHeadBasic>
          <INPUT__Until type="text" name="until" onChange={onChange} value={inputState.data.until} />
        </DIV__DefaultWrapper>
        <H2__OptionHead>옵션</H2__OptionHead>
        <DIV__OptionZone>
          <InputHeadBasic>
            오토체크(타임아웃 시) :{" "}
            <input type="checkbox" name="autoCheck" onChange={onToggleOption} checked={inputState.data.state.autoCheck} />
          </InputHeadBasic>
          <InputHeadBasic>
            알람설정 : <input type="checkbox" name="alerm" onChange={onToggleOption} checked={inputState.data.state.alerm} />
          </InputHeadBasic>
        </DIV__OptionZone>
        <BTN__Submit onClick={onPushData}>Click</BTN__Submit>
      </DIV__InputZone>
    </>
  ));
}

export default Input;
