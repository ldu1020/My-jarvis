/** @format */

import React from "react";
import { useLocalStore } from "mobx-react"; // 6.x or mobx-react-lite@1.4.0
import { createTodoStore, createChartStore } from "./store";

const storeContext = React.createContext(null);

export const StoreProvider = ({ children }) => {
  const todoStore = useLocalStore(createTodoStore);
  const chartStore = useLocalStore(createChartStore);
  return <storeContext.Provider value={{ todoStore, chartStore }}>{children}</storeContext.Provider>;
};

export const useStore = () => {
  const store = React.useContext(storeContext);
  if (!store) {
    // this is especially useful in TypeScript so you don't need to be checking for null all the time
    throw new Error("useStore must be used within a StoreProvider.");
  }
  return store;
};
