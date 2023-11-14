import { useOpen } from "../../contexts/open.contex";

import { ReactComponent as Home } from "../../assets/home.svg";
import { ReactComponent as Star } from "../../assets/star.svg";
import { ReactComponent as DotVector } from "../../assets/dot-vetor.svg";
import { ReactComponent as Pages } from "../../assets/pages.svg";
import { ReactComponent as Gear } from "../../assets/gear.svg";
import { ReactComponent as Pencil } from "../../assets/pencil.svg";

// Define an array of menu items
const menuItems = [
  { icon: <Home className="w-7" />, label: "Home Page" },
  { icon: <DotVector className="w-7" />, label: "Landing Menu" },
  { icon: <Star className="w-7" />, label: "Favorites" },
  { icon: <Pages className="w-7" />, label: "Pages" },
  { icon: <Pencil className="w-7" />, label: "Edit Layout" },
];

const settingsItems = [{ icon: <Gear className="w-7" />, label: "Manage Admin" }];

const SideBar = () => {
  const { isOpen } = useOpen();

  return (
    <aside
      className={`bg-white h-[calc(100vh)] sm: sm:static sm:block sm:opacity-100 ${
        isOpen ? "absolute w-46 z-10 opacity-75" : "hidden w-20"
      }`}
    >
      <div className="flex flex-col justify-start h-full">
        {/* Render the list dynamically */}
        <ul className="flex w-full flex-col basis-10/12 items-center justify-start">
          {menuItems.map((item, index) => (
            <li
              key={index}
              className="flex items-center justify-start w-full py-4 pl-7 hover:bg-gray-200 cursor-pointer"
            >
              {item.icon}
              {isOpen && <p className="ml-2 text-gray-700">{item.label}</p>}
            </li>
          ))}
        </ul>

        {/* Second list */}
        <ul className="mt-auto flex w-full flex-col basis-2/12 items-center justify-start">
          {settingsItems.map((item, index) => (
            <li
              key={index}
              className="flex items-center justify-start w-full py-4 pl-7 hover:bg-gray-200"
            >
              {item.icon}
              {isOpen && <p className="ml-2 text-gray-700">{item.label}</p>}
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
};

export default SideBar;
