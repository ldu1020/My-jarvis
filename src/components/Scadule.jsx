/** @format */

import React, { useState } from "react";
import { useStore } from "../store/SetUpMobX";
import { useObserver } from "mobx-react";
import Lists from "./List";
import Input from "./Input";

function Scadule() {
  return (
    <div>
      <Lists />
      <Input />
    </div>
  );
}

export default Scadule;
