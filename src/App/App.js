import React, { useState } from "react";

import "./App.css";

import { Routes, Route, Navigate } from "react-router-dom";

import Header from "../Pages/Header/Header";
import Home from "../Pages/Home/Home";
import EmployeesPage from "../Pages/EmployeesPage/EmployeesPage";
import { useEffect } from "react";

/**
 * Component for showing App with Routes
 *
 * @component
 */
function App() {
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    let list = localStorage.getItem("employees");
    if (list) {
      setEmployees(JSON.parse(list));
    }
  }, []);

  const addEmployee = (employee) => {
    setEmployees([...employees, employee]);
    localStorage.setItem("employees", JSON.stringify([...employees, employee]));
  };

  return (
    <>
      <Header />
      <div className="app">
        <Routes>
          <Route exact path="/" element={<Home addEmployee={addEmployee} />} />
          <Route
            exact
            path="/employees"
            element={<EmployeesPage employees={employees} />}
          />
          <Route path="*" element={<Navigate to="/404" replace />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
