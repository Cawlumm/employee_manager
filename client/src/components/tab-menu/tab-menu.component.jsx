// Api
import { useState, useEffect } from "react";

// Inport components
import renderFormFields from "./utils";

// Active menu component
const TabMenu = ({ employees, onIndexChange }) => {
  const [activeTab, setActiveTab] = useState("item1");
  const [currentIndex, setCurrentIndex] = useState(0);

  // // Update currentIndex when employees prop changes
  // useEffect(() => {
  //   setCurrentIndex(0);
  // }, [employees]);

  // Function to handle action menu => main, cycles, next, civil
  const handleClick = (tab) => {
    setActiveTab(tab);
  };

  // Function to handle next arrows
  const handleArrowClick = (direction) => {
    const newIndex =
      direction === "right"
        ? currentIndex + 1
        : direction === "left"
        ? currentIndex - 1
        : currentIndex;

    if (newIndex >= 0 && newIndex < employees.length) {
      setCurrentIndex(newIndex);
      onIndexChange(newIndex);
    }
  };

  return (
    <div className="flex flex-col text-gray-600">
      {/* Action Menu */}
      <div className="flex">
        <div
          className={`cursor-pointer p-4 border-b-2 ${
            activeTab === "item1"
              ? "border-blue-500 text-"
              : "border-transparent"
          }`}
          onClick={() => handleClick("item1")}
        >
          MAIN
        </div>
        <div
          className={`cursor-pointer p-4 border-b-2 ${
            activeTab === "item2" ? "border-blue-500" : "border-transparent"
          }`}
          onClick={() => handleClick("item2")}
        >
          CYCLES/OTHER
        </div>
        <div
          className={`cursor-pointer p-4 border-b-2 ${
            activeTab === "item3" ? "border-blue-500" : "border-transparent"
          }`}
          onClick={() => handleClick("item3")}
        >
          NEXT CHANGE
        </div>
        <div
          className={`cursor-pointer p-4 border-b-2 ${
            activeTab === "item4" ? "border-blue-500" : "border-transparent"
          }`}
          onClick={() => handleClick("item4")}
        >
          CIVIL SERVICE
        </div>
      </div>
      {/* Main Menu */}
      {activeTab === "item1" && employees.length > 0 && (
        <>
          {/* Render form for current employee in the index from list of employees */}
          {renderFormFields(employees[currentIndex])}
        </>
      )}
      <div className="flex justify-center">
        <button
          className="cursor-pointer px-4 border-2"
          onClick={() => handleArrowClick("left")}
        >
          {"<"}
        </button>
        {/* Display current index out of total employees */}
        <span className="px-20 border-y-2">
          {currentIndex + 1} of {employees.length}
        </span>
        <button
          className="cursor-pointer px-4 border-2"
          onClick={() => handleArrowClick("right")}
        >
          {">"}
        </button>
      </div>
    </div>
  );
};

export default TabMenu;
