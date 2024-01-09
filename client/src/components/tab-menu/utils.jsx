
// Component to render form for given employee
const renderFormFields = (employee) => {
  // Input fields array, all values for each input/label/span in the form
  const inputFields = [
    {
      label: "Job Class",
      id: "jobClass",
      type: "text",
      value: employee?.jobClass,
      span: `${employee?.title}`,
    },
    {
      label: "Summary Job Class",
      id: "summaryJobClass",
      value: employee?.summaryJobClass,
      type: "text",
    },
    {
      label: "Position",
      id: "position",
      type: "text",
      value: employee?.position,
      span: "SENIOR RECREATION LEADER",
    },
    {
      label: "Pay Type",
      id: "payType",
      type: "text",
      value: employee?.payType,
      span: employee?.payTypeSummary,
    },
    {
      label: "Effective Date",
      id: "effectiveDate",
      type: "text",
      value: employee?.effectiveDate,
      span: employee?.endDate || "to 12/12/9999",
    },
    {
      label: "Primary Job/Position",
      id: "primaryPosition",
      type: "checkbox",
      checked: employee?.primaryPosition,
      customContainerStyles: "align-start mb-3",
    },
    {
      label: "Position Start",
      id: "positionStart",
      type: "text",
      value: employee?.positionStart,
    },
    {
      label: "Location",
      id: "location",
      type: "text",
      value: employee?.location,
      customInputStyles:
        "basis-3/4 border-solid border-gray-300 bg-whitesmoke border-2 h-6 mx-3",
    },
    {
      label: "Group",
      id: "group",
      type: "text",
      value: employee?.group,
      customInputStyles:
        "basis-3/4 border-solid border-gray-300 bg-whitesmoke border-2 h-6 mx-3",
    },
    {
      label: "Status",
      id: "status",
      type: "text",
      value: employee?.status,
      customInputStyles:
        "basis-3/4 border-solid border-gray-300 bg-whitesmoke border-2 h-6 mx-3",
    },
    {
      label: "Risk Code",
      id: "riskCode",
      type: "text",
      span: employee?.riskCodeSummary,
      value: employee?.riskCode,
    },
    {
      label: "Pay Start",
      id: "payStart",
      type: "text",
      value: employee?.payStart,
    },
    {
      label: "Pay Freq",
      id: "payFreq",
      type: "text",
      value: employee?.payFreq,
    },
    {
      label: "Calc Code",
      id: "calcCode",
      type: "text",
      value: employee?.calcCode,
      customInputStyles:
        "basis-2/4 w-8 border-solid border-gray-300 bg-whitesmoke border-2 h-6 mx-3",
    },
    {
      label: "Num Pays",
      id: "numPays",
      type: "text",
      value: employee?.numPays,
    },
    {
      label: "Days/Year",
      id: "daysYear",
      type: "text",
      value: employee?.daysYear,
    },
    {
      label: "Sched Hours",
      id: "schHours",
      type: "text",
      value: employee?.schHours,
    },
    {
      label: "Pay Basis",
      id: "payBasis",
      type: "text",
      value: employee?.payBasis,
      customInputStyles:
        "basis-2/4 w-6 border-solid border-gray-300 bg-whitesmoke border-2 h-6 mx-3",
    },
    {
      label: "Hours/Day",
      id: "hoursDay",
      type: "text",
      value: employee?.hoursDay,
    },
    { label: "Factor", id: "factor", type: "text", value: employee?.factor },
    { label: "Remain", id: "remain", type: "text", value: employee?.remain },
    {
      label: "Pay Status",
      id: "payStatus",
      type: "text",
      value: employee?.payStatus,
    },
    {
      label: "FTE %",
      id: "FTE",
      type: "text",
      span: "Recurring Pay",
      value: employee?.FTE,
    },
    {
      label: "Hourly Rate",
      id: "hourlyRate",
      type: "text",
      span: employee?.hourlyRate,
      value: employee?.hourlyRate,
    },
    {
      label: "Daily Rate",
      id: "dailyRate",
      type: "text",
      span: employee?.dailyRate,
      value: employee?.dailyRate,
    },
    {
      label: "Period Pay",
      id: "periodPay",
      type: "text",
      span: employee?.periodPay,
      value: employee?.periodPay,
    },
    {
      label: "Anual Pay",
      id: "anualPay",
      type: "text",
      span: employee?.anualPay,
      value: employee?.anualPay,
    },
    {
      label: "Remaining",
      id: "remaining",
      type: "text",
      value: employee?.remaining,
    },
    {
      label: "Reference",
      id: "reference",
      type: "text",
      value: employee?.reference,
    },
  ];
  return (
    <div className="flex mt-2" key={employee.id}>
      {/* Content associated with the active tab */}
      <>
        <div className="flex basis-1/2 flex-col ">
          {/* Right Content */}
          {inputFields.slice(0, 13).map((field) => (
            <div
              key={field.id}
              className={`flex my-1 ${field.customContainerStyles}`}
            >
              <label className="basis-1/4" htmlFor={field.id}>
                {field.label}
              </label>
              <input
                className={`${
                  field.customInputStyles ||
                  "basis-1/4 border-solid border-gray-300 bg-whitesmoke border-2 h-6 mx-3"
                }`}
                checked={field.checked}
                type={field.type}
                id={field.id}
                value={field.value || ""}
              />
              <span className="basis-2/4 ">{field.span}</span>
            </div>
          ))}
        </div>

        {/* Left Content */}
        <div className="flex flex-col basis-1/2">
          <div className="flex ">
            <div className="flex flex-col">
              {/* Left Top Content */}
              {inputFields.slice(13, 18).map((field) => (
                <div
                  key={field.id}
                  className={`flex my-1 ${field.customContainerStyles}`}
                >
                  <label className="basis-2/4" htmlFor={field.id}>
                    {field.label}
                  </label>
                  <input
                    className={`${
                      field.customInputStyles ||
                      "basis-2/4 border-solid border-gray-300 bg-whitesmoke border-2 h-6 mx-3"
                    }`}
                    type={field.type}
                    id={field.id}
                    value={field.value || ""}
                  />
                </div>
              ))}
            </div>
            <div>
              {/* Right Top Content */}
              {inputFields.slice(18, 22).map((field) => (
                <div
                  key={field.id}
                  className={`flex my-1 ${field.customContainerStyles}`}
                >
                  <label className="basis-2/4" htmlFor={field.id}>
                    {field.label}
                  </label>
                  <input
                    className={`${
                      field.customInputStyles ||
                      "basis-2/4 border-solid border-gray-300 bg-whitesmoke border-2 h-6 mx-3"
                    }`}
                    type={field.type}
                    id={field.id}
                    value={field.value || ""}
                  />
                </div>
              ))}
            </div>
          </div>

          <div>
            {/* Right Bottom Content */}
            <div className="border-b-2 mt-5">
              <h2>Pay Amounts</h2>
            </div>
            {inputFields.slice(22, 29).map((field) => (
              <div
                key={field.id}
                className={`flex my-1 ${field.customContainerStyles}`}
              >
                <label className="basis-1/4" htmlFor={field.id}>
                  {field.label}
                </label>
                <input
                  className={`${
                    field.customInputStyles ||
                    "basis-2/4 border-solid border-gray-300 bg-whitesmoke border-2 h-6 mx-3"
                  }`}
                  type={field.type}
                  id={field.id}
                  value={field.value || ""}
                />
                <span className="basis-2/4 ">{field.span}</span>
              </div>
            ))}
          </div>
        </div>
      </>
    </div>
  );
};

export default renderFormFields;
