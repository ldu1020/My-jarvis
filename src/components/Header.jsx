/** @format */

import React from "react";
import styled from "styled-components";
import Button from "@material-ui/core/Button";

const DIV__headerWrapper = styled.div`
  width: 100%;
  height: 15vh;
`;

const DIV__logoSide = styled.div`
  height: 50%;
  display: flex;
  align-items: center;
`;

const LOGO__headerLogo = styled.i`
  color: skyblue;
  font-size: 2rem;
  margin: 1rem;
`;

const H3__headerTiTle = styled.h3`
  font-size: 2rem;
`;

const NAV__navSide = styled.nav`
  height: 50%;
  display: flex;
  justify-content: space-between;
`;

const BTN__navBtn = styled.button`
  background-color: #fff;
  width: 100%;
  font-size: 1.3rem;
  color: gray;
  transition: all 0.3s;
  &:hover {
    color: skyblue;
    border-bottom: 2px solid skyblue;
  }
`;

function Header() {
  return (
    <DIV__headerWrapper>
      <DIV__logoSide>
        <LOGO__headerLogo className="fas fa-align-left"></LOGO__headerLogo>
        <H3__headerTiTle>My Jarvis</H3__headerTiTle>
      </DIV__logoSide>

      <NAV__navSide>
        <BTN__navBtn>
          <i className="fas fa-calendar-alt"></i>
          <p>Scadule</p>
        </BTN__navBtn>
        <BTN__navBtn>
          <i className="fas fa-sun"></i>
          <p>Today</p>
        </BTN__navBtn>
        <BTN__navBtn>
          <i className="fas fa-chart-pie"></i>
          <p>OverView</p>
        </BTN__navBtn>
      </NAV__navSide>
    </DIV__headerWrapper>
  );
}

export default Header;
