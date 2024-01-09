import { useState, useRef, useEffect } from "react";

import { httpGetEmployees } from "../hooks/requests";

// Import Components
import TabMenu from "../components/tab-menu/tab-menu.component";
import Toolbar from "../components/toolbar/toolbar.component";

const ActionsInquiry = () => {
  // State varaibles
  const [employees, setEmployees] = useState([]);
  const [isSearchClicked, setIsSearchClicked] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [formData, setFormData] = useState({
    employeeId: "",
    ssn: "",
    lastName: "",
    firstName: "",
    mi: "",
    suffix: "",
    status: "",
  });

  // Function to set initial form data based on the first employee
  const updateInitialFormData = () => {
    console.log(currentIndex);
    if (employees.length > 0) {
      setFormData({
        employeeId: employees[currentIndex].employeeId,
        ssn: employees[currentIndex].ssn,
        lastName: employees[currentIndex].lastName,
        firstName: employees[currentIndex].firstName,
        mi: employees[currentIndex].mi,

      });
    }
  };

  // Use useEffect to set initial form data when employees change
  useEffect(() => {
    updateInitialFormData();
  }, [currentIndex, employees]);
  
  // Use useEffect to update inputs when formData changes
  useEffect(() => {
    // Update the input fields based on the formData
    inputConfigs.forEach((config) => {
      const inputValue = formData[config.id] || "";
      const inputElement = document.getElementById(config.id);

      if (inputElement) {
        inputElement.value = inputValue;
      }
    });
  }, [formData]);

  // Input change handler
  const handleChange = (e) => {
    const { id, value } = e.target;
    console.log(id, value);
    setFormData({
      ...formData,
      [id]: value,
    });
  };
  // Function to receive currentIndex from TabMenu
  const handleIndexChange = (newIndex) => {
    setCurrentIndex(newIndex);
  };
  // Function to filter out empty values from formData
  const getPayload = () => {
    const payload = {};
    for (const key in formData) {
      console.log(typeof formData[key])

      if (typeof formData[key] !== 'undefined' && formData[key] !== "") {
        payload[key] = formData[key];
      }
    }
    return payload;
  };

  // Ref for Employee ID input field
  const employeeIdRef = useRef(null);

  const fetchEmployees = async (payload) => {
    const employees = await httpGetEmployees(payload);
    return employees;
  };

  // Component Methods
  const handleSearchClick = async () => {
    const payload = getPayload();
    try {
      const fetchedEmployees = await fetchEmployees(payload);
      setEmployees(fetchedEmployees);
      setIsSearchClicked(!isSearchClicked);
    } catch (error) {
      console.error("Error fetching employees:", error);
    }
  };

  const inputConfigs = [
    { label: "Employee", id: "employeeId", customStyles: "w-[100px]" },
    { label: "SSN", id: "ssn" },
    { label: "Last Name", id: "lastName" },
    { label: "First Name", id: "firstName" },
    { label: "MI", id: "mi", customStyles: "w-8" },
    { label: "Suffix", id: "suffix" },
    { label: "Status", id: "status" },
  ];

  return (
    <>
      <Toolbar onSearchClick={handleSearchClick} />
      <div className="actions-inquiry-container bg-white flex ">
        <div className="flex flex-col text-gray-600 w-full">
          <div className="border-b-2">
            <h2>Employee Identification</h2>
          </div>
          {/* Input Configs */}
          <div class="flex flex-wrap sm:flex-col lg:flex-row w-full py-3">
            {inputConfigs.map((config) => (
              <div
                className={`flex flex-col px-1 ${config?.customStyles}`}
                key={config.id}
              >
                <label className="" htmlFor={config.id}>
                  {config.label}
                </label>
                <input
                  onChange={handleChange}
                  disabled={!isSearchClicked}
                  ref={config.id === "employeeId" ? employeeIdRef : null}
                  className="border-solid border-gray-300 disabled:bg-whitesmoke border-2 h-6 "
                  type="text"
                  id={config.id}
                  // value={config.value}
                />
              </div>
            ))}
          </div>

          <div>
            <TabMenu employees={employees} onIndexChange={handleIndexChange} />
          </div>
        </div>
      </div>
    </>
  );
};

export default ActionsInquiry;
