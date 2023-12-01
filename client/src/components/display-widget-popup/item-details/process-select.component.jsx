

const ProcessSelect = ({ list }) => {
    const processCodes = list.map((object, index) => (
      <option key={index} value={object.title}>
        {object.title}
      </option>
    ));
  
    return (
      <select className="basis-5/6 border-2 border-black cursor-pointer">
        <option value="">All Process Codes</option>
        {processCodes}
      </select>
    );
  };
  

export default ProcessSelect;
