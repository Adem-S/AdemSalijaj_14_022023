import React, { useState, useEffect } from "react";
import "./EmployeesPage.css";
import arrowIcon from "../../Assets/arrow_icon.svg";
import { Dropdown } from "dropdown-op";
import { numberEntriesItems } from "../../Feature/itemsSelect";

/**
 * Component for showing Employees
 *
 * @component
 * @example
 * const employees = [{
    firstName: "John",
    lastName: "John",
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
  const [numberEntries, setNumberEntries] = useState(
    numberEntriesItems[0].value
  );
  const [pageNumber, setPageNumber] = useState(1);
  const [searchValue, setSearchValue] = useState("");

  const [listEmployees, setListEmployees] = useState([]);

  const [sortedValue, setSortedValue] = useState({
    name: "firstName",
    ascending: true,
  });

  const [listFilteredEmployees, setListFilteredEmployees] = useState([]);

  const [listSlicedEmployees, setListSlicedEmployees] = useState([]);

  useEffect(() => {
    setListEmployees(employees);
    sliceEmployees(employees, pageNumber);
  }, [employees]);

  //List of keys for the table
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

  /**
   * Filter employees by search for each section
   * @param {Array} listEmployees
   * @param {string} text
   */
  const filterEmployees = (listEmployees, text) => {
    const listFilterd = listEmployees.filter((employees) => {
      let array = Object.values(employees);
      let sentence = array.join(" ").toLowerCase();
      return sentence.includes(text.toLowerCase());
    });
    setPageNumber(1);
    sortEmployees(listFilterd, sortedValue.name, false, 1);
  };

  /**
   * Sort employees by criteria
   * @param {Array} list
   * @param {string} value
   * @param {boolean} changeAscending
   * @param {number} newPageNumber
   */
  const sortEmployees = (
    list,
    value,
    changeAscending = true,
    newPageNumber = pageNumber
  ) => {
    let ascending = sortedValue.ascending;
    if (changeAscending) {
      ascending = sortedValue.name === value ? !sortedValue.ascending : true;
    }
    setSortedValue({ name: value, ascending });
    let listSorted = list.sort((a, b) => {
      a = a[value];
      b = b[value];
      if (value === "dateBirth" || value === "startDate") {
        a = new Date(a).getTime();
        b = new Date(b).getTime();
      } else if (value !== "zipCode") {
        a = a.toLowerCase();
        b = b.toLowerCase();
      }
      if (a < b) {
        return ascending ? -1 : 1;
      } else {
        return ascending ? 1 : -1;
      }
    });
    sliceEmployees(listSorted, newPageNumber);
  };

  /**
   * @param {number} index
   */
  const handleChangePage = (index) => {
    setPageNumber(pageNumber + index);
    sliceEmployees(listFilteredEmployees, pageNumber + index);
  };

  /**
   *
   * @param {string} value
   */
  const handleChangeInput = (value) => {
    setSearchValue(value);
    filterEmployees(listEmployees, value);
  };

  /**
   * Get employees by page
   * @param {Array} listSorted
   * @param {number} pageNumber
   */
  const sliceEmployees = (listSorted, pageNumber) => {
    let indexStart = pageNumber === 1 ? 0 : (pageNumber - 1) * numberEntries;
    let indexEnd = pageNumber * numberEntries;
    setListFilteredEmployees(listSorted);
    setListSlicedEmployees(listSorted.slice(indexStart, indexEnd));
  };

  //Number of employees after filter
  let listLength = listFilteredEmployees.length;

  return (
    <div className="employees">
      <div className="employees__nav">
        <div className="employeess__nav__content">
          <p>Show</p>
          <Dropdown
            width="70px"
            items={numberEntriesItems}
            value={numberEntries}
            onChange={setNumberEntries}
          />
          <p>entries</p>
        </div>
        <div className="employeess__nav__content">
          <p>Search :</p>
          <input
            type="text"
            value={searchValue}
            onChange={(e) => handleChangeInput(e.target.value)}
          />
        </div>
      </div>
      <div className="overflow-scroll">
        <div className="employees__table">
          <div className="employees__table__row employees__table__row--sticky">
            {listKeys.map(({ title, value }) => {
              return (
                <div
                  className={"employees__table__column employees__filter__btn"}
                  key={title}
                  onClick={() => sortEmployees(listFilteredEmployees, value)}
                >
                  <p>{title}</p>
                  {sortedValue.name === value && (
                    <img
                      src={arrowIcon}
                      className={sortedValue.ascending ? "rotate-180deg" : ""}
                      alt="arrow"
                    ></img>
                  )}
                </div>
              );
            })}
          </div>
          <div className="employees__list">
            {listSlicedEmployees.map((employee) => {
              return (
                <ul
                  className="employees__table__row"
                  key={employee.lastName + Math.random()}
                >
                  {listKeys.map(({ title, value }) => {
                    return (
                      <li className="employees__table__column" key={value}>
                        {employee[value] ? employee[value] : "invalid"}
                      </li>
                    );
                  })}
                </ul>
              );
            })}
          </div>
        </div>
      </div>
      <div className="employees__footer">
        <p>
          Showing{" "}
          <span>
            {" "}
            {pageNumber === 1 ? 1 : (pageNumber - 1) * numberEntries}{" "}
          </span>
          to{" "}
          <span>
            {listLength < numberEntries * pageNumber
              ? listLength
              : pageNumber * numberEntries}
          </span>{" "}
          of
          <span> {listFilteredEmployees.length}</span>
        </p>
        <div className="employees__footer__btn">
          <button
            disabled={pageNumber === 1}
            onClick={() => handleChangePage(-1)}
          >
            Previous
          </button>
          <p>{pageNumber}</p>
          <button
            disabled={listLength <= numberEntries * pageNumber}
            onClick={() => handleChangePage(1)}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default EmployeesPage;
