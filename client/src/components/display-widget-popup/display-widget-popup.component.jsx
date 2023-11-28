import { useEffect, useState } from "react";

import ApprovalList from "./item-details/approval-list.component";
const notifications = [
  {
    id: 2,
    title: "New Notification: Budget Approval",
    created: "Thu Feb 22 2018",
    reason: "Budget approval required for next quarter",
    header: {
      fiscalYear: 2018,
      orderNumber: 21800003,
      description: "Budget Allocation for Q2",
      totalAmount: 15000.0,
      requisitionNumber: 11800003,
      buyerID: "John Doe",
      vendor: "MUNICIPAL BUDGETING SOLUTIONS",
      deliveryAddress: "123 Main Street",
    },
    detail: {
      account: "02300001-525100",
      description: "BUDGET ALLOCATION",
      amount: 15000.0,
    },
  },
];
const approvals = [
  {
    id: 1,
    title: "POE: Purchase Orders pending approval",
    created: "Tue Jan 16 2018",
    reason: "Amount of this purchase order is greater than pending approvals",
    header: {
      fiscalYear: 2018,
      orderNumber: 21800002,
      description: "Office Supplies for FY 17/18",
      totalAmount: 5.0,
      requisitionNumber: 11800002,
      buyerID: "Kellee MacDonald",
      vendor: "STAPLES BUSINESS ADVANTAGE",
      deliveryAddress: "337598 - Kellee MacDonald",
    },
    detail: {
      account: "01300001-525000",
      description: "OFFICE SUPPLIES AND EXPENSES",
      amount: 5.0,
    },
  },
  {
    id: 2,
    title: "POE: Pending Approval",
    created: "Wed Jan 17 2018",
    reason: "Amount of this purchase order requires approval",
    header: {
      fiscalYear: 2018,
      orderNumber: 21800003,
      description: "Technology Supplies for FY 17/18",
      totalAmount: 10.0,
      requisitionNumber: 11800003,
      buyerID: "John Doe",
      vendor: "TECH SUPPLY CO.",
      deliveryAddress: "123 Main Street",
    },
    detail: {
      account: "01300001-525001",
      description: "TECHNOLOGY SUPPLIES",
      amount: 10.0,
    },
  },
];

const DisplayWidgetPopup = ({ togglePopup, title }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [selectedApproval, setSelectedApproval] = useState(null);
  // List state changes based on current title
  const [state, setState] = useState([]);

  useEffect(() => {
    if (title === "Approvals") {
      setState(approvals);
      console.log(state);
    } else if (title === "Notifications") {
      setState(notifications);
    } else {
      // setState({...alerts})
    }
  }, []);

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

          {!isLoading ? (
            <div className="flex basis-9/12 sm:flex-row flex-col py-2 p-3">
              <div className="basis-1/2 p-2 border-r-2">
                <div className="flex text-xl">
                  <a className="pr-5">By Process Code</a>
                  <a className="">By Date</a>
                </div>
                <div className="flex py-2">
                  <input
                    type="checkbox"
                    className="basis-1/6 bg-gray-400 h-6 w-6 cursor-pointer"
                  />
                  <select className="basis-5/6 border-2 border-black cursor-pointer">
                    <option value="">All Process Codes</option>
                  </select>
                </div>
                <div>
                  {state.map((approval) => (
                    <div
                      className="flex cursor-pointer hover:bg-gray-200 py-2"
                      key={approval.id}
                      onClick={() => handleApprovalClick(approval)}
                    >
                      <div className="basis-1/12 flex pt-2 justify-center">
                        <input
                          type="checkbox"
                          className=" bg-gray-400 h-6 w-6 cursor-pointer"
                        />
                      </div>
                      <div className="basis-11/12">
                        <p className="text-xl">{approval.title}</p>
                        <div className="flex justify-between">
                          {" "}
                          <p className="italic text-sm">
                            ${approval.header.totalAmount}{" "}
                            {approval.detail.description}
                          </p>{" "}
                          <span className=" italic text-sm">
                            {approval.created}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="basis-1/2">
                {selectedApproval && (
                  <ApprovalList selectedApproval={selectedApproval} />
                )}
              </div>
            </div>
          ) : (
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
          <div className="flex basis-1/12 h-full bg-gray-300 p-3 justify-end ">
            <button
              onClick={() => togglePopup(false)}
              className="text-white bg-gray-600 px-4 mx-4 py-2 "
            >
              Refresh
            </button>
            <button
              onClick={() => togglePopup(false)}
              className="text-white bg-blue-900 px-4 py-2 "
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
