import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import Home from "./Home";

describe("Home", () => {
  it("render form inputs", () => {
    render(<Home addEmployee={() => {}} />);

    const firstNameInput = screen.getByLabelText("First Name");
    expect(firstNameInput).toBeInTheDocument();

    const lastNameInput = screen.getByLabelText("Last Name");
    expect(lastNameInput).toBeInTheDocument();

    const dateOfBirthPicker = screen.getByTestId("birth");
    expect(dateOfBirthPicker).toBeInTheDocument();

    const startDatePicker = screen.getByTestId("startDate");
    expect(startDatePicker).toBeInTheDocument();

    const streetInput = screen.getByLabelText("Street");
    expect(streetInput).toBeInTheDocument();

    const cityInput = screen.getByLabelText("City");
    expect(cityInput).toBeInTheDocument();

    const stateInput = screen.getByText("State");
    expect(stateInput).toBeInTheDocument();

    const zipCodeInput = screen.getByLabelText("Zip Code");
    expect(zipCodeInput).toBeInTheDocument();

    const departmentInput = screen.getByText("Department");
    expect(departmentInput).toBeInTheDocument();
  });

  it("submit the form and calls addEmployee with error", async () => {
    const addEmployeeMock = jest.fn();
    render(<Home addEmployee={addEmployeeMock} />);

    const firstNameInput = screen.getByLabelText("First Name");
    fireEvent.change(firstNameInput, { target: { value: "John" } });

    const submitButton = screen.getByText("Save");
    fireEvent.click(submitButton);

    screen.getByText("Please fill in all the fields.");
  });

  it("submits the form and calls addEmployee", () => {
    const addEmployeeMock = jest.fn();
    render(<Home addEmployee={addEmployeeMock} />);

    const firstNameInput = screen.getByLabelText("First Name");
    fireEvent.change(firstNameInput, { target: { value: "John" } });

    const lastNameInput = screen.getByLabelText("Last Name");
    fireEvent.change(lastNameInput, { target: { value: "Doe" } });

    const dateOfBirthPicker = screen.getByTestId("birth");
    fireEvent.change(
      dateOfBirthPicker.querySelector(".react-date-picker__inputGroup__month"),
      { target: { value: "01" } }
    );
    fireEvent.change(
      dateOfBirthPicker.querySelector(".react-date-picker__inputGroup__day"),
      { target: { value: "01" } }
    );
    fireEvent.change(
      dateOfBirthPicker.querySelector(".react-date-picker__inputGroup__year"),
      { target: { value: "2000" } }
    );

    const startDatePicker = screen.getByTestId("startDate");
    fireEvent.change(
      startDatePicker.querySelector(".react-date-picker__inputGroup__month"),
      { target: { value: "01" } }
    );
    fireEvent.change(
      startDatePicker.querySelector(".react-date-picker__inputGroup__day"),
      { target: { value: "01" } }
    );
    fireEvent.change(
      startDatePicker.querySelector(".react-date-picker__inputGroup__year"),
      { target: { value: "2024" } }
    );

    const streetInput = screen.getByLabelText("Street");
    fireEvent.change(streetInput, { target: { value: "123 Street" } });

    const cityInput = screen.getByLabelText("City");
    fireEvent.change(cityInput, { target: { value: "New York" } });

    const zipCodeInput = screen.getByLabelText("Zip Code");
    fireEvent.change(zipCodeInput, { target: { value: "12345" } });

    const submitButton = screen.getByText("Save");
    fireEvent.click(submitButton);

    expect(addEmployeeMock).toHaveBeenCalledWith({
      firstName: "John",
      lastName: "Doe",
      dateBirth: "01/01/2000",
      startDate: "01/01/2024",
      street: "123 Street",
      city: "New York",
      state: "AL",
      zipCode: "12345",
      department: "Sales",
    });

    screen.getByText("Employee Created !");
  });
});
