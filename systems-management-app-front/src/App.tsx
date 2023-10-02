import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import "./App.css";
import SystemSearch from "./Pages/SystemSearch";
import SystemUpdate from "./Pages/SystemUpdate";
import SystemCreate from "./Pages/SystemCreate";
import Test from "./Pages/Test";

function App() {
  return (
    <React.Fragment>
      <Routes>
        <Route path="/" element={<Navigate to={"/system-search"} />} />
        <Route path="/system-update" element={<SystemUpdate />} />
        <Route path="/system-create" element={<SystemCreate />} />
        <Route path="*" element={<SystemSearch />} />
        <Route path="/test" element={<Test />} />
      </Routes>
    </React.Fragment>
  );
}

export default App;
