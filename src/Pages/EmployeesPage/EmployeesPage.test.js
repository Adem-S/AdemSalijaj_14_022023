import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import EmployeesPage from "./EmployeesPage";

describe("EmployeesPage", () => {
  const employees = [
    {
      firstName: "John",
      lastName: "Doe",
      startDate: "10/03/2023",
      department: "Sales",
      dateBirth: "02/10/2000",
      street: "NameStreet",
      city: "NameCity",
      state: "NameState",
      zipCode: "11",
    },
    {
      firstName: "Jane",
      lastName: "Smith",
      startDate: "05/15/2022",
      department: "Marketing",
      dateBirth: "09/20/1995",
      street: "AnotherStreet",
      city: "AnotherCity",
      state: "AnotherState",
      zipCode: "22",
    },
  ];

  test("Render EmployeesPage with DataTable and correct headers", () => {
    render(<EmployeesPage employees={employees} />);

    const firstNameHeader = screen.getByText("First Name");
    const lastNameHeader = screen.getByText("Last Name");
    const startDateHeader = screen.getByText("Start Date");
    const departmentHeader = screen.getByText("Department");
    const dateOfBirthHeader = screen.getByText("Date of Birth");
    const streetHeader = screen.getByText("Street");
    const cityHeader = screen.getByText("City");
    const stateHeader = screen.getByText("State");
    const zipCodeHeader = screen.getByText("Zip Code");

    expect(firstNameHeader).toBeInTheDocument();
    expect(lastNameHeader).toBeInTheDocument();
    expect(startDateHeader).toBeInTheDocument();
    expect(departmentHeader).toBeInTheDocument();
    expect(dateOfBirthHeader).toBeInTheDocument();
    expect(streetHeader).toBeInTheDocument();
    expect(cityHeader).toBeInTheDocument();
    expect(stateHeader).toBeInTheDocument();
    expect(zipCodeHeader).toBeInTheDocument();
  });

  test("Render EmployeesPage with DataTable and displays employees", () => {
    render(<EmployeesPage employees={employees} />);

    const johnDoeCell = screen.getByText("John");
    const janeSmithCell = screen.getByText("Jane");

    expect(johnDoeCell).toBeInTheDocument();
    expect(janeSmithCell).toBeInTheDocument();
  });

  test("Sort employees by first name", () => {
    render(<EmployeesPage employees={employees} />);

    const employeeList = document.getElementsByClassName("dataTable__list")[0];
    expect(employeeList).toBeInTheDocument();

    expect(employeeList.firstChild.firstChild.innerHTML).toBe("Jane");

    const firstNameHeader = screen.getByText("First Name");
    fireEvent.click(firstNameHeader);
    expect(employeeList.firstChild.firstChild.innerHTML).toBe("John");

    expect(firstNameHeader).toBeInTheDocument();
  });

  test("Filter employees", async () => {
    render(<EmployeesPage employees={employees} />);

    const employeeList = document.getElementsByClassName("dataTable__list")[0];
    expect(employeeList).toBeInTheDocument();
    expect(employeeList.children).toHaveLength(2);

    const filterEmployeesInput = screen.getByTestId("filter");
    expect(filterEmployeesInput).toBeInTheDocument();
    fireEvent.change(filterEmployeesInput, { target: { value: "John" } });

    expect(filterEmployeesInput.value).toBe("John");

    expect(employeeList.children).toHaveLength(1);
    expect(employeeList.firstChild.firstChild.innerHTML).toBe("John");
  });
});
