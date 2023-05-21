import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import { BrowserRouter } from "react-router-dom";
import Header from "./Header";

describe("Header", () => {
  it("render header title", () => {
    render(
      <BrowserRouter>
        <Header />
      </BrowserRouter>
    );

    const titleElement = screen.getByText("HRnet");
    expect(titleElement).toBeInTheDocument();
  });

  it("render navigation links", () => {
    render(
      <BrowserRouter>
        <Header />
      </BrowserRouter>
    );

    const createEmployeeLink = screen.getByText("Create Employee");
    expect(createEmployeeLink).toBeInTheDocument();

    const currentEmployeesLink = screen.getByText("Current employees");
    expect(currentEmployeesLink).toBeInTheDocument();
  });
});
