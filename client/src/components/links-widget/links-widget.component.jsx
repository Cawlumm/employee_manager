// Import React Apis
import { useEffect, useState } from "react";

// Import Icons
import { ReactComponent as MagnifyingGlass } from "../../assets/search.svg";
import { ReactComponent as DotMenuBlack } from "../../assets/dotmenublack.svg";

// Import Components
import DropdownMenu from "../dropdown-menu/dropdown-menu.component";
import ProgressLoader from "../progress-loader/progress-loader.component";

// Import Methods
import { httpGetSavedOptions } from "../../hooks/requests";
const LinksWidget = () => {
  const [options, setOptions] = useState();

  useEffect(() => {
    const fetchOptions = async () => {
      const response = await httpGetSavedOptions();
      console.log(response);
      setOptions(response);
    };

    fetchOptions();
  }, []);

  return (
    <div className="flex flex-col basis-1/2 bg-white m-1 rounded shadow-2xl sm:overflow-scroll ">
      {options ? (
        <>
          <div className="flex justify-between p-2 ">
            <p className="text-lg">Landing Menu</p>
            <DotMenuBlack className="" />
          </div>
          {/* Search Bar */}
          <div>
            <div className="flex items-center w-full p-2">
              <input
                type="text"
                placeholder="Search..."
                className="border p-2 focus:outline-none w-full"
              />
              <button className="text-white p-2 ">
                <MagnifyingGlass />
              </button>
            </div>
          </div>
          {/* DropdownMenu component */}
          <div>
            <DropdownMenu options={options} />
          </div>
        </>
      ) : (
        <ProgressLoader />
      )}
    </div>
  );
};

export default LinksWidget;
