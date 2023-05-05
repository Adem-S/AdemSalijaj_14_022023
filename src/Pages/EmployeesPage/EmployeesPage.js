import React from "react";
import "./EmployeesPage.css";
import DataTable from "../../Components/DataTable/DataTable";

/**
 * Component for showing Employees
 *
 * @component
 * @example
 * const employees = [{
    firstName: "John",
    lastName: "Doe",
    startDate: "10/03/2023",
    "department": "Sales",
    "dateBirth": "02/10/2000",
    "street": "NameStreet",
    "city": "NameCity",
    "state": "NameState",
    "zipCode": "11"
}]
  */
const EmployeesPage = ({ employees }) => {
  const listKeys = [
    { title: "First Name", value: "firstName" },
    { title: "Last Name", value: "lastName" },
    { title: "Start Date", value: "startDate" },
    { title: "Department", value: "department" },
    { title: "Date of Birth", value: "dateBirth" },
    { title: "Street", value: "street" },
    { title: "City", value: "city" },
    { title: "State", value: "state" },
    { title: "Zip Code", value: "zipCode" },
  ];

  const numberEntriesItems = [
    {
      name: "10",
      value: 10,
    },
    {
      name: "25",
      value: 25,
    },
    {
      name: "50",
      value: 50,
    },
    {
      name: "100",
      value: 100,
    },
  ];

  return (
    <DataTable
      data={employees}
      listKeys={listKeys}
      numberEntriesItems={numberEntriesItems}
    />
  );
};

export default EmployeesPage;
