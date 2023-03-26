import React, { useState, useEffect } from "react";
import "./Dropdown.css";
import arrow from "../../Assets/arrow_icon.svg";

/**
 * Component for Dropdown
 *
 * @component
 * @example
 * const items = [{name: "one", value: 1}]
 * const value = 1
 * const onChange = (value) => setState(value)
 * const width = "100%"
 *
 */
const Dropdown = ({ items = [], onChange, value, width = "100%" }) => {
  const [itemSelected, setItemSelected] = useState(null);
  const [openList, setOpenList] = useState(false);

  const toggleOpenList = () => {
    setOpenList(!openList);
  };

  const selectItem = (item) => {
    onChange(item.value);
  };

  const ref = React.useRef();

  useEffect(() => {
    const index = items.findIndex((item) => item.value === value);
    setItemSelected(items[index]);
  }, [value]);

  useEffect(() => {
    const handleClick = (event) => {
      if (ref.current && !ref.current.contains(event.target)) {
        setOpenList(false);
      }
    };

    document.addEventListener("click", handleClick);

    return () => {
      document.removeEventListener("click", handleClick);
    };
  }, [ref]);

  return (
    <>
      {itemSelected && (
        <div
          className="dropdown"
          ref={ref}
          onClick={toggleOpenList}
          style={{ width }}
        >
          <p className="dropdown-toggle" aria-haspopup="listbox" id="filter">
            <span>{itemSelected.name}</span>
            <img src={arrow}></img>
          </p>
          {openList && (
            <ul role="listbox" className="dropdown-list">
              <li role="option" className="dropdown-item">
                <span>{itemSelected.name}</span>
                <img src={arrow}></img>
              </li>
              {items.map((item) => {
                return (
                  <li
                    key={item.name + item.value}
                    role="option"
                    onClick={() => selectItem(item)}
                    className={
                      item.value === itemSelected.value
                        ? "dropdown-item item-hidden"
                        : "dropdown-item"
                    }
                  >
                    <span>{item.name}</span>
                  </li>
                );
              })}
            </ul>
          )}
        </div>
      )}
    </>
  );
};

export default Dropdown;
