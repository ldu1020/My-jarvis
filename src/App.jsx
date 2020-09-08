/** @format */

import React from "react";

import Header from "./components/Header";
import Scadule from "./components/Scadule";

import styled, { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
*{
  margin:0;
  padding:0;
}

html{
  font-size:10px;
  list-style:none;
}

body{
  overflow: hidden;
  padding:10px
}

button{
  border:none;
  background:none;
  outline:none;
  cursor:pointer
}

`;

function App() {
  return (
    <div>
      <GlobalStyle />
      <Header />
      <Scadule />
    </div>
  );
}

export default App;
