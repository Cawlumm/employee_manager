import React, { useState } from "react";

import { ReactComponent as DropDownArrow } from "../../assets/dropdownarrow.svg";

const DropdownMenu = ({ title, options }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [dropdownCount, setDropdownCount] = useState(0);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
    toggleCount();
  };

  const toggleCount = () => {
    if (isOpen) {
      setDropdownCount(dropdownCount - 1);
    } else {
      setDropdownCount(dropdownCount + 1);
    }
  };

  return (
    <div className="">
      <button
        className="flex items-center px-4 py-2 text-gray-700 hover:text-gray-900"
        onClick={options ? toggleDropdown : undefined}
      >
        {title}
        <span className={`ml-2 ${isOpen ? "transform rotate-90" : ""}`}>
          {options && <DropDownArrow />}
        </span>
      </button>

      {isOpen && (
        <div
          className={` mt-2 bg-white`}
          style={{ paddingLeft: `${dropdownCount * 20}px` }}
        >
          {/* Recursive rendering of DropdownMenu */}
          {options.map((option, index) => (
            <DropdownMenu
              key={index}
              title={option.label}
              options={option.options}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default DropdownMenu;
