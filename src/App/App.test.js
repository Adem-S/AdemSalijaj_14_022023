import React from "react";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom/extend-expect";
import App from "./App";

describe("App", () => {
  test("render Header component", () => {
    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>
    );

    const headerElement = screen.getByText("HRnet");
    expect(headerElement).toBeInTheDocument();
  });

  test("render Home component when the path is /", () => {
    render(
      <MemoryRouter initialEntries={["/"]}>
        <App />
      </MemoryRouter>
    );

    const activeLink = document.getElementsByClassName(
      "header__nav--active"
    )[0];
    expect(activeLink.innerHTML).toBe("Create Employee");

    const submitButton = screen.getByText("Save");
    expect(submitButton).toBeInTheDocument();
  });

  test("render EmployeesPage component when the path is /employees", () => {
    render(
      <MemoryRouter initialEntries={["/employees"]}>
        <App />
      </MemoryRouter>
    );

    const activeLink = document.getElementsByClassName(
      "header__nav--active"
    )[0];
    expect(activeLink.innerHTML).toBe("Current employees");

    const filterEmployeeInput = screen.getByLabelText("Search :");
    expect(filterEmployeeInput).toBeInTheDocument();
  });

  test("render Home component when the path does not match any route", () => {
    render(
      <MemoryRouter initialEntries={["/unknown"]}>
        <App />
      </MemoryRouter>
    );
    const activeLink = document.getElementsByClassName(
      "header__nav--active"
    )[0];
    expect(activeLink.innerHTML).toBe("Create Employee");

    const submitButton = screen.getByText("Save");
    expect(submitButton).toBeInTheDocument();
  });
});
