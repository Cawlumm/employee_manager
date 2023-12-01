

const DateSelect = ({ list }) => {
    const dates = list.map((object, index) => (
      <option key={index} value={object.created}>
        {object.created}
      </option>
    ));
  
    return (
      <select className="basis-5/6 border-2 border-black cursor-pointer">
        <option value="">All Dates</option>
        {dates}
      </select>
    );
  };
  

export default DateSelect;
