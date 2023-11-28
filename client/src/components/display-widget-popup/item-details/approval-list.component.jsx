


const ApprovalList = ({selectedApproval}) => {
    return (<>
    {selectedApproval ? (
      <div className="flex flex-col p-3 sm:overflow-auto overflow-scroll">
        <p className="text-xl">{selectedApproval.title}</p>
        <div className="flex">
          <strong className="basis-4/12">Created</strong>{" "}
          <span className="basis-8/12">
            {selectedApproval.created}
          </span>
        </div>
        <div className="flex">
          <strong className="basis-4/12">Reason</strong>{" "}
          <span className="basis-8/12">
            {selectedApproval.reason}
          </span>
        </div>
        <p className="text-xl">Purchase Order Header</p>
        <div className="flex">
          <strong className="basis-4/12">Fiscal Year</strong>{" "}
          <span className="basis-8/12">
            {selectedApproval.header.fiscalYear}
          </span>
        </div>
        <div className="flex">
          <strong className="basis-4/12">
            Purchase order number
          </strong>{" "}
          <span className="basis-8/12">
            {selectedApproval.header.orderNumber}
          </span>
        </div>
        <div className="flex">
          <strong className="basis-4/12">General Description</strong>{" "}
          <span className="basis-8/12">
            {selectedApproval.header.description}
          </span>
        </div>
        <div className="flex">
          <strong className="basis-4/12">Total Amount</strong>{" "}
          <span className="basis-8/12">
            ${selectedApproval.header.totalAmount}
          </span>
        </div>
        <div className="flex">
          <strong className="basis-4/12">Requisition Number</strong>{" "}
          <span className="basis-8/12">
            {selectedApproval.header.requisitionNumber}
          </span>
        </div>
        <div className="flex">
          <strong className="basis-4/12">Buyer ID</strong>{" "}
          <span className="basis-8/12">
            {selectedApproval.header.buyerID}
          </span>
        </div>
        <div className="flex">
          <strong className="basis-4/12">Vendor</strong>{" "}
          <span className="basis-8/12">
            {selectedApproval.header.vendor}
          </span>
        </div>
        <div className="flex">
          <strong className="basis-4/12">Delivery Address</strong>{" "}
          <span className="basis-8/12">
            {selectedApproval.header.deliveryAddress}
          </span>
        </div>
        <div className="flex">
          <strong className="basis-4/12">Summary by account</strong>{" "}
          <span className="basis-8/12">
            {selectedApproval.detail.account}
          </span>
        </div>
        <div className="flex">
          <strong className="basis-4/12">Expenses</strong>{" "}
          <span className="basis-8/12">
            ${selectedApproval.detail.amount}
          </span>
        </div>
      </div>
    ) : ""} 
</>)
}

export default ApprovalList;