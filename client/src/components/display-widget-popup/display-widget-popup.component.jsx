import React, { useEffect, useState } from "react";
import ApprovalList from "./item-details/approval-list.component";
import ProcessSelect from "./item-details/process-select.component";
import DateSelect from "./item-details/date-select.component";
import { useAuth } from "../../contexts/auth.context";
import { httpGetNotifications } from "../../hooks/requests";

// Component for filter options
const FilterOptions = ({ handleFilter, filter }) => {
  return (
    <div className="flex text-xl">
      <a
        onClick={() => handleFilter("code")}
        className={`pr-5 p-2 cursor-pointer ${
          filter === "code" ? "text-blue-400" : ""
        }`}
      >
        By Process Code
      </a>
      <a
        onClick={() => handleFilter("date")}
        className={`p-2 cursor-pointer ${
          filter === "date" ? "text-blue-400" : ""
        }`}
      >
        By Date
      </a>
    </div>
  );
};

// Component for displaying each approval item
const ApprovalItem = ({ approval, handleApprovalClick }) => {
  return (
    <div
      className="flex cursor-pointer hover:bg-gray-200 py-2"
      key={approval.id}
      onClick={() => handleApprovalClick(approval)}
    >
      <div className="basis-1/12 flex pt-2 justify-center">
        <input type="checkbox" className="bg-gray-400 h-6 w-6 cursor-pointer" />
      </div>
      <div className="basis-11/12">
        <p className="text-xl">{approval.title}</p>
        <div className="flex justify-between">
          <p className="italic text-sm">
            ${approval.header.totalAmount} {approval.detail.description}
          </p>
          <span className="italic text-sm">{approval.created}</span>
        </div>
      </div>
    </div>
  );
};

// Main component for displaying the widget popup
const DisplayWidgetPopup = ({ togglePopup, title }) => {
  const { currentUser } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [selectedApproval, setSelectedApproval] = useState(null);
  const [filter, setFilter] = useState("code");
  const [state, setState] = useState([]);

  // Function to fetch data
  const fetchData = async (title, userId) => {
    try {
      setIsLoading(true);
      const details = await httpGetNotifications(title.toLowerCase(), userId);
      setState(details.notifications);
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
      setIsLoading(false);
    }
  };

  // Effect to fetch data on component mount
  useEffect(() => {
    if (title === "Notifications") {
      fetchData(title, currentUser.userId);
    }
  }, [title, currentUser.userId]);

  // Function to handle filter changes
  const handleFilter = (filterType) => {
    setFilter(filterType);
  };

  // Function to handle refresh button click
  const handleRefresh = () => {
    setState([]);
    fetchData(title, currentUser.userId);
  };

  // Function to handle close button click
  const handleClose = () => {
    togglePopup(false);
  };

  // Function to handle approval item click
  const handleApprovalClick = (approvalId) => {
    setSelectedApproval(approvalId);
  };

  return (
    <>
      <div className="z-10 fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
        <div className="flex flex-col bg-white w-3/4 sm:h-4/5 h-3/5">
          <div className="flex flex-col basis-2/12 text-3xl p-3">
            <div className="basis-1/2 pl-4">{title}</div>
            <div className="bg-gray-300 basis-1/2 "></div>
          </div>

          {/* Conditional rendering based on loading state */}
          {!isLoading ? (
            <div className="flex basis-9/12 sm:flex-row flex-col py-2 p-3">
              {/* Left side content */}
              <div className="basis-1/2 p-2 border-r-2">
                {/* Filter options */}
                <FilterOptions handleFilter={handleFilter} filter={filter} />

                {/* Checkbox and selection based on filter */}
                <div className="flex py-2">
                  <input
                    type="checkbox"
                    className="basis-1/6 bg-gray-400 h-6 w-6 cursor-pointer"
                  />
                  {filter === "code" ? (
                    <ProcessSelect list={state} />
                  ) : (
                    <DateSelect list={state} />
                  )}
                </div>

                {/* List of approval items */}
                <div>
                  {state.map((approval) => (
                    <ApprovalItem
                      key={approval.id}
                      approval={approval}
                      handleApprovalClick={handleApprovalClick}
                    />
                  ))}
                </div>
              </div>

              {/* Right side content */}
              <div className="basis-1/2">
                {selectedApproval && (
                  <ApprovalList selectedApproval={selectedApproval} />
                )}
              </div>
            </div>
          ) : (
            // Loading spinner when data is loading
            <div className="flex h-full w-full justify-center items-center">
              <div
                className="inline-block h-14 w-14 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] text-primary motion-reduce:animate-[spin_1.5s_linear_infinite]"
                role="status"
              >
                <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
                  Loading...
                </span>
              </div>
            </div>
          )}

          {/* Footer with refresh and close buttons */}
          <div className="flex basis-1/12 h-full bg-gray-300 p-3 justify-end ">
            <button
              onClick={handleRefresh}
              className="text-white bg-gray-600 px-4 mx-4 py-2"
            >
              Refresh
            </button>
            <button
              onClick={handleClose}
              className="text-white bg-blue-900 px-4 py-2"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default DisplayWidgetPopup;
