import React, { useState } from "react";
import "./Home.css";
import DatePicker from "react-date-picker";
import Modal from "../../Components/Modal/Modal";
import { Dropdown } from "dropdown-op";
import { stateItems, departmentItems } from "../../Feature/itemsSelect";
import CrossIcon from "../../Assets/cross.svg";

/**
 * Component for showing Home
 *
 * @component
 */
const Home = ({ addEmployee }) => {
  const [error, setError] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [dateBirth, setDateBirth] = useState("");
  const [startDate, setStartDate] = useState("");
  const [street, setStreet] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState(stateItems[0].value);
  const [zipCode, setZipCode] = useState("");
  const [department, setDepartment] = useState(departmentItems[0].value);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      firstName &&
      lastName &&
      startDate &&
      department &&
      dateBirth &&
      street &&
      city &&
      state &&
      zipCode
    ) {
      let newEmployee = {
        firstName,
        lastName,
        startDate: getDateFormat(new Date(startDate)),
        department,
        dateBirth: getDateFormat(new Date(dateBirth)),
        street,
        city,
        state,
        zipCode,
      };
      addEmployee(newEmployee);
      resetForm();
    } else {
      setError("Veuillez renseigner tous les champs");
    }
    setOpenModal(true);
  };

  /**
   *
   * @param {string} date
   * @returns
   */
  const getDateFormat = (date) => {
    console.log(date);
    let day = date.getDate();
    let month = date.getMonth() + 1;
    let year = date.getFullYear();

    if (month < 10) month = "0" + month;
    if (day < 10) day = "0" + day;

    return [month, day, year].join("/");
  };

  const resetForm = () => {
    setFirstName("");
    setLastName("");
    setDateBirth("");
    setStartDate("");
    setStreet("");
    setCity("");
    setState(stateItems[0].value);
    setZipCode("");
    setDepartment(departmentItems[0].value);
  };

  return (
    <div className="home">
      <form className="form">
        <div className="form-row">
          <label htmlFor="firstName">First Name</label>
          <input
            id="firstName"
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
          />
        </div>
        <div className="form-row">
          <label htmlFor="lastName">Last Name</label>
          <input
            id="lastName"
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            required
          />
        </div>
        <div className="form-row">
          <label htmlFor="birth">Date of Birth</label>
          <DatePicker
            clearIcon={null}
            maxDate={new Date()}
            minDate={new Date("1900-01-01T00:00:00.000Z")}
            minDetail="decade"
            onChange={(e) => setDateBirth(e)}
            value={dateBirth}
            locale="en-EN"
            format="MM/dd/yyyy"
          />
        </div>
        <div className="form-row">
          <label htmlFor="startDate">Start Date</label>
          <DatePicker
            clearIcon={null}
            minDate={new Date()}
            maxDate={new Date("2100-01-01T00:00:00.000Z")}
            minDetail="year"
            onChange={(e) => setStartDate(e)}
            value={startDate}
            locale="en-EN"
            format="MM/dd/yyyy"
            required={true}
          />
        </div>
        <div className="form-adress">
          <p>Adress</p>
          <div className="form-row">
            <label htmlFor="street">Street</label>
            <input
              id="street"
              type="text"
              value={street}
              onChange={(e) => setStreet(e.target.value)}
              required
            />
          </div>
          <div className="form-row">
            <label htmlFor="city">City</label>
            <input
              id="city"
              type="text"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              required
            />
          </div>
          <div className="form-row">
            <label htmlFor="state">State</label>
            <Dropdown
              id="state"
              items={stateItems}
              value={state}
              onChange={setState}
              width="60%"
            />
          </div>
          <div className="form-row">
            <label htmlFor="zip">Zip Code</label>
            <input
              id="zip"
              type="number"
              value={zipCode}
              onChange={(e) => setZipCode(e.target.value)}
              required
            />
          </div>
        </div>
        <div className="form-row">
          <label htmlFor="department">Department</label>
          <Dropdown
            id="department"
            items={departmentItems}
            value={department}
            onChange={setDepartment}
            width="60%"
          />
        </div>
        <input
          className="form-submit"
          type="submit"
          value="Save"
          onClick={handleSubmit}
        />
      </form>

      {openModal && (
        <Modal
          title={error ? error : "Employee Created !"}
          onClosed={() => {
            setOpenModal(false);
            setError("");
          }}
          preventClickOutside={true}
          icon={CrossIcon}
        />
      )}
    </div>
  );
};

export default Home;
