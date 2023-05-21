import React, { useState, useEffect, useMemo } from "react";
import "./DataTable.css";
import arrowIcon from "../../Assets/arrow_icon.svg";
import { Dropdown } from "adem-dropdown";
import crossIcon from "../../Assets/cross.svg";

/**
 * Component for Data Table
 *
 * @component
 * @example
 * const data = [{firstName : "John", lastName: "Doe"}, ...]
 * const listKeys = [{ title: "First Name", value: "firstName" }, { title: "Last Name", value: "lastName"}]
 * const numberEntriesItems = [{ name: "10", value: 10 }, { name: "20", value: 20 }]
 */
const DataTable = ({ data, listKeys, numberEntriesItems }) => {
  const [listData, setListData] = useState([]);
  const [listFilteredData, setListFilteredData] = useState([]);
  const [listSlicedData, setListSlicedData] = useState([]);

  const [pageNumber, setPageNumber] = useState(1);
  const [searchValue, setSearchValue] = useState("");
  const [sortedValue, setSortedValue] = useState({
    name: listKeys[0].value,
    ascending: true,
  });

  const [numberEntries, setNumberEntries] = useState(
    numberEntriesItems[0].value
  );

  useEffect(() => {
    setListData(data);
    sortData(data, sortedValue.name, false);
  }, [data]);

  /**
   * Filter data by search for each section
   * @param {Array} listData
   * @param {string} text
   */
  const filterData = (listData, text) => {
    const listFilterd = listData.filter((data) => {
      let array = Object.values(data);
      let sentence = array.join(" ").toLowerCase();
      return sentence.includes(text.toLowerCase());
    });
    sortData(listFilterd, sortedValue.name, false);
  };

  /**
   * Sort data by criteria
   * @param {Array} list
   * @param {string} value
   * @param {boolean} changeAscending
   */
  const sortData = (list, value, changeAscending = true) => {
    const isDate = /^(0[1-9]|1[0-2])\/(0[1-9]|1\d|2\d|3[01])\/(19|20)\d{2}$/;
    let ascending = sortedValue.ascending;
    if (changeAscending) {
      ascending = sortedValue.name === value ? !sortedValue.ascending : true;
    }
    setSortedValue({ name: value, ascending });
    let listSorted = list.sort((a, b) => {
      a = a[value];
      b = b[value];
      if (
        (isDate.test(a) || a instanceof Date) &&
        (isDate.test(b) || b instanceof Date)
      ) {
        a = new Date(a);
        b = new Date(b);
      } else if (Number.isNaN(a) && Number.isNaN(b)) {
        a = a.toLowerCase();
        b = b.toLowerCase();
      }
      if (a < b) {
        return ascending ? -1 : 1;
      } else {
        return ascending ? 1 : -1;
      }
    });
    setPageNumber(1);
    sliceData(listSorted, 1, numberEntries);
  };

  /**
   * Show all pages
   * @param {number} number of pages
   */
  const showAllPages = (number) => {
    let pages = [];
    number = number === 0 ? 1 : number;
    for (let i = 1; i <= number; i++) {
      pages.push(
        <p
          key={i}
          onClick={() => handleChangePage(i)}
          className={`${pageNumber === i ? "active-page" : ""}`}
        >
          {i}
        </p>
      );
    }
    return <>{pages}</>;
  };

  /**
   * Change page
   * @param {number} page
   */
  const handleChangePage = (index) => {
    setPageNumber(index);
    sliceData(listFilteredData, index, numberEntries);
  };

  /**
   * Change input value
   * @param {string} value
   */
  const handleChangeInput = (value) => {
    setSearchValue(value);
    filterData(listData, value);
  };

  /**
   * Change the number of entries to display
   * @param {number} number
   */
  const handleChangeNumberEntries = (number) => {
    setNumberEntries(number);
    setPageNumber(1);
    sliceData(listFilteredData, 1, number);
  };

  /**
   * Get elements by page
   * @param {Array} listSorted
   * @param {number} pageNumber
   * @param {number} numberEntries
   *
   */
  const sliceData = (listSorted, pageNumber, numberEntries) => {
    let indexStart = pageNumber === 1 ? 0 : (pageNumber - 1) * numberEntries;
    let indexEnd = pageNumber * numberEntries;
    setListFilteredData(listSorted);
    setListSlicedData(listSorted.slice(indexStart, indexEnd));
  };

  //Number of elements after filter
  let listLength = useMemo(() => listFilteredData.length, [listFilteredData]);

  return (
    <div className="dataTable">
      <div className="dataTable__nav">
        <div className="dataTable__nav__content">
          <p>Show</p>
          <Dropdown
            width="70px"
            items={numberEntriesItems}
            value={numberEntries}
            onChange={(value) => handleChangeNumberEntries(value)}
          />
          <p>entries</p>
        </div>
        <div className="dataTable__nav__content">
          <label htmlFor="filter">Search :</label>
          <input
            data-testid="filter"
            id="filter"
            type="text"
            value={searchValue}
            onChange={(e) => handleChangeInput(e.target.value)}
          />
          <img
            src={crossIcon}
            className={`nav__search__icon ${
              searchValue.length === 0 ? "hidden" : ""
            }`}
            onClick={() => handleChangeInput("")}
            alt="arrow"
          ></img>
        </div>
      </div>
      <div className="overflow-scroll">
        <table className="dataTable__table">
          <thead>
            <tr className="dataTable__table__row">
              {listKeys.map(({ title, value }) => {
                return (
                  <th
                    className={"dataTable__table__item dataTable__filter__btn"}
                    key={title}
                    onClick={() => sortData(listFilteredData, value)}
                  >
                    <p>{title}</p>
                    {sortedValue.name === value && (
                      <img
                        src={arrowIcon}
                        className={sortedValue.ascending ? "rotate-180deg" : ""}
                        alt="arrow"
                      ></img>
                    )}
                  </th>
                );
              })}
            </tr>
          </thead>
          <tbody className="dataTable__list">
            {listSlicedData.map((data) => {
              return (
                <tr
                  className="dataTable__table__row"
                  key={data + Math.random()}
                >
                  {listKeys.map(({ value }) => {
                    return (
                      <td
                        className={`dataTable__table__item ${
                          sortedValue.name === value
                            ? "dataTable__table__item--sorted"
                            : ""
                        }`}
                        key={value}
                      >
                        {data[value] ? data[value] : "invalid"}
                      </td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <div className="dataTable__footer">
        <p>
          Showing{" "}
          <span>
            {" "}
            {pageNumber === 1
              ? listLength === 0
                ? 0
                : 1
              : (pageNumber - 1) * numberEntries}{" "}
          </span>
          to{" "}
          <span>
            {listLength < numberEntries * pageNumber
              ? listLength
              : pageNumber * numberEntries}
          </span>{" "}
          of
          <span> {listFilteredData.length}</span>
        </p>
        <div className="dataTable__footer__btn">
          <button
            disabled={pageNumber === 1}
            onClick={() => handleChangePage(pageNumber - 1)}
          >
            Previous
          </button>
          {useMemo(
            () => showAllPages(Math.ceil(listLength / numberEntries)),
            [listLength, pageNumber, numberEntries]
          )}
          <button
            disabled={listLength <= numberEntries * pageNumber}
            onClick={() => handleChangePage(pageNumber + 1)}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default DataTable;
