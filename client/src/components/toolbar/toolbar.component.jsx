import { Link } from "react-router-dom";

// SVG icon imports
import { ReactComponent as BackArrow } from "../../assets/back-arrow.svg";
import { ReactComponent as Browser } from "../../assets/browser.svg";
import { ReactComponent as Addition } from "../../assets/addition.svg";
import { ReactComponent as Search } from "../../assets/search.svg";
import { ReactComponent as Delete } from "../../assets/delete.svg";
import { ReactComponent as Output } from "../../assets/output.svg";
import { ReactComponent as Print } from "../../assets/print.svg";
import { ReactComponent as Display } from "../../assets/display.svg";
import { ReactComponent as Pdf } from "../../assets/pdf.svg";
import { ReactComponent as Save } from "../../assets/save.svg";
import { ReactComponent as Revise } from "../../assets/revise.svg";

const Toolbar = ({ onSearchClick }) => {
  return (
    <div className="toolbar-container flex basis-20 bg-white w-full shadow-lg items-center p-2 bg-whitesmoke">
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
        <button 
        className="flex flex-col justify-around items-center h-full px-2 pl-5"
        onClick={() => {
          onSearchClick();
        }}>
          <Search />
          <p>Search</p>
        </button>
      </div>
      <div className="text-gray-400 text-xs h-4/6">
        <button className="flex flex-col justify-around items-center h-full px-2 pr-5 border-r-2">
          <Browser />
          <p>Browse</p>
        </button>
      </div>
      <div className="text-gray-400 text-xs h-4/6">
        <button className="flex flex-col justify-around items-center h-full pl-5 px-2 ">
          <Addition />
          <p>Add</p>
        </button>
      </div>
      <div className="text-gray-400 text-xs h-4/6">
        <button className="flex flex-col justify-around items-center h-full  px-2">
          <Revise />
          <p>Update</p>
        </button>
      </div>
      <div className="text-gray-400 text-xs h-4/6">
        <button className="flex flex-col justify-around items-center h-full  px-2 pr-5 border-r-2">
          <Delete />
          <p>Delete</p>
        </button>
      </div>
      <div className="text-gray-400 text-xs h-4/6">
        <button className="flex flex-col justify-around items-center h-full  px-2 pl-5">
          <Output />
          <p>Output</p>
        </button>
      </div>
      <div className="text-gray-400 text-xs h-4/6">
        <button className="flex flex-col justify-around items-center h-full  px-2">
          <Print />
          <p>Print</p>
        </button>
      </div>
      <div className="text-gray-400 text-xs h-4/6">
        <button className="flex flex-col justify-around items-center h-full  px-2">
          <Display />
          <p>Display</p>
        </button>
      </div>
      <div className="text-gray-400 text-xs h-4/6">
        <button className="flex flex-col justify-around items-center h-full  px-2">
          <Pdf />
          <p>PDF</p>
        </button>
      </div>
      <div className="text-gray-400 text-xs h-4/6">
        <button className="flex flex-col justify-around items-center h-full  px-2">
          <Save />
          <p>Save</p>
        </button>
      </div>
    </div>
  );
};

export default Toolbar;
