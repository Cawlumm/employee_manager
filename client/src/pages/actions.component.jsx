// Importing external styles
import "react-datepicker/dist/react-datepicker.css";

// React and React Router imports
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../contexts/auth.context";

// SVG icon imports
import { ReactComponent as BackArrow } from "../assets/back-arrow.svg";
import { ReactComponent as Addition } from "../assets/addition.svg";
import { ReactComponent as Delete } from "../assets/delete.svg";
import { ReactComponent as Download } from "../assets/download.svg";
import { ReactComponent as Calendar } from "../assets/calendar.svg";

// DatePicker component import
import DatePicker from "react-datepicker";

// Functional component for Actions
const Actions = () => {
  // Authentication context
  const { currentUser } = useAuth();

  // State variables
  const [startDate, setStartDate] = useState(new Date());
  const [currentDate, setCurrentDate] = useState("");
  const [requisitionNumber, setRequisitionNumber] = useState(0);
  const [formData, setFormData] = useState({
    fiscalYear: "",
    createdDate: "",
    buyerId: "",
    vendor: "",
    description: "",
    address: "",
    processCode: "",
    orderNumber: "",
    total: "",
    accountingNumber: "",
    accountDescription: "",
    userId: "",
  });

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    console.log(formData);
  };

  // Generate a random requisition number
  const genRecNum = () => {
    const digits = "0123456789";
    let randomDigit = "";
    for (let i = 0; i < 6; i++) {
      randomDigit += digits[Math.floor(Math.random() * 10)];
    }
    setRequisitionNumber(randomDigit);
  };

  // Set the current date and generate requisition number on component mount
  useEffect(() => {
    const getCurrentDate = () => {
      const current = new Date();
      const date = `${
        current.getMonth() + 1
      }/${current.getDate()}/${current.getFullYear()}`;
      setCurrentDate(date);
    };

    getCurrentDate();
    genRecNum();
  }, []);

  // Custom CalendarWidget component
  const CalendarWidget = ({ value, onClick }) => (
    <div className="flex items-center w-full h-8 bg-white rounded border p-1 border-gray-300 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500">
      <input
        className="w-full h-7"
        type="text"
        value={value}
        onClick={onClick}
      />
      <div
        className="flex pl-1 h-8 justify-center items-center border-l-2 border-gray-300 cursor-pointer"
        onClick={onClick}
      >
        <Calendar />
      </div>
    </div>
  );

  // Render the Actions component
  return (
    <div className="actions-container flex flex-col w-full">
      {/* Toolbar */}
      <div className="toolbar-container flex basis-20 bg-white w-full shadow-md items-center px-2">
        {/* Back Button */}
        <div className="text-gray-400 text-xs h-4/6">
          <Link
            to="/"
            className="flex flex-col justify-around items-center  h-full px-5 border-r-2 "
          >
            <BackArrow />
            <p>Back</p>
          </Link>
        </div>
        <div className="text-gray-400 text-xs h-4/6">
          <button className="flex flex-col justify-around items-center h-full px-2 pl-5">
            <Addition />
            <p>Add</p>
          </button>
        </div>
        <div className="text-gray-400 text-xs h-4/6">
          <button className="flex flex-col justify-around items-center h-full px-2 pr-5 border-r-2">
            <Delete />
            <p>Delete</p>
          </button>
        </div>
        <div className="text-gray-400 text-xs h-4/6">
          <button className="flex flex-col justify-around items-center h-full pl-5 px-2 pr-5 border-r-2">
            <Download />
            <p>Excel</p>
          </button>
        </div>
      </div>
      {/* Form Container */}
      <div className="form-container w-full">
        <div className="form-header text-gray-600 p-3 border-b-2">
          <h1 className="text-2xl font-bold">
            Approval: {currentDate.split("/")[2]}/{requisitionNumber}
          </h1>
          <span>
            Created, {currentUser.fullName}, {currentDate}
          </span>
        </div>
        {/* Form Body */}
        <div className="form-body p-3">
          {/* Body Header */}
          <div className="body-header">
            <div className="font-bold text-gray-600 text-xl">
              <h1>Action</h1>
            </div>
            <div className="text-[#28b4ff]">
              <span>Quotes</span>
              <span>Notes</span>
            </div>
          </div>
          {/* Form Fields */}
          <div className="flex body-form">
            <form
              className="flex sm:flex-col lg:flex-row text-gray-400"
              action=""
            >
              {/* Row One */}
              <div className="flex flex-col basis-1/3">
                <div className="flex flex-row">
                  <div className="flex flex-col pr-2 basis-1/3">
                    <label htmlFor="fiscalYear">Fiscal Year</label>
                    <input
                      className="w-full h-8"
                      onChange={handleChange}
                      type="text"
                    />
                  </div>
                  <div className="flex flex-col px-2 basis-1/3">
                    <label htmlFor="requisitionNumber">
                      Requisition Number
                    </label>
                    <input
                      className="w-full h-8"
                      type="text"
                      onChange={handleChange}
                      value={requisitionNumber}
                    />
                  </div>
                  <div className="flex flex-col px-2 basis-1/3">
                    <label htmlFor="createdDate">Created Date</label>
                    <DatePicker
                      selected={startDate}
                      onChange={(date) => setStartDate(date)}
                      dateFormat="MM/dd/yyyy"
                      className="w-full h-8"
                      customInput={<CalendarWidget />}
                    />{" "}
                  </div>
                </div>
                <div className="flex flex-col">
                  <div className="flex flex-col pr-2">
                    <label htmlFor="buyerId">BuyerID</label>
                    <input
                      className="w-full h-8"
                      onChange={handleChange}
                      type="text"
                    />
                  </div>
                  <div className="flex flex-col pr-2">
                    <label htmlFor="vendor">Vendor</label>
                    <input
                      className="w-full h-8"
                      onChange={handleChange}
                      type="text"
                    />
                  </div>
                  <div className="flex flex-col pr-2">
                    <label htmlFor="description">Description</label>
                    <input
                      className="w-full h-8"
                      onChange={handleChange}
                      type="text"
                    />
                  </div>
                  <div className="flex flex-col pr-2">
                    <label htmlFor="deliveryAddress">Delivery Address</label>
                    <input
                      className="w-full h-8"
                      onChange={handleChange}
                      type="text"
                    />
                  </div>
                </div>
              </div>
              {/* Row Two */}
              <div className="flex flex-col basis-1/3">
                <div className="flex flex-col pr-2">
                  <label htmlFor="processCode">Process Code</label>
                  <select
                    className="w-full h-8"
                    name="processCode"
                    id="processCode"
                    onChange={handleChange}
                  >
                    <option value="PMT">PMT</option>
                    <option value="TERM">TERM</option>
                  </select>
                </div>
                <div className="flex flex-col pr-2">
                  <label htmlFor="orderNumber">Order Number</label>
                  <input
                    className="w-full h-8"
                    onChange={handleChange}
                    type="text"
                  />
                </div>
                <div className="flex flex-col pr-2">
                  <label htmlFor="totalNumber">Total Number</label>
                  <input
                    className="w-full h-8"
                    onChange={handleChange}
                    type="text"
                  />
                </div>
                <div className="flex flex-col pr-2">
                  <label htmlFor="accountNumber">Account Number</label>
                  <input
                    className="w-full h-8"
                    onChange={handleChange}
                    type="text"
                  />
                </div>
                <div className="flex flex-col pr-2">
                  <label htmlFor="accountDescription">
                    Account Description
                  </label>
                  <input
                    className="w-full h-8"
                    onChange={handleChange}
                    type="text"
                  />
                </div>
              </div>
              {/* Row Three */}
              <div className="flex flex-col basis-1/3">
                <div className="flex flex-col pr-2">
                  <label htmlFor="approver">Approver</label>
                  <input
                    className="w-full h-8"
                    onChange={handleChange}
                    type="text"
                  />
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
      <div></div>
    </div>
  );
};

export default Actions;
