// Importing icons
import { ReactComponent as ThumbsUp } from "../assets/thumbs-up.svg";
import { ReactComponent as Message } from "../assets/message.svg";
import { ReactComponent as Check } from "../assets/check.svg";
import { ReactComponent as DotMenuBlack } from "../assets/dotmenublack.svg";
import { ReactComponent as Pencil } from "../assets/pencil.svg";

import PageLogo from "../assets/pagelogo3.jpg";

// Importing components
import DisplayWidget from "../components/display-widget/display-widget.component";
import SideBar from "../components/sidebar/sidebar.component";
import MenuLinks from "../components/menu-links/menu-links-component";
import LinksWidget from "../components/links-widget/links-widget.component";
import FavoritesWidget from "../components/favorites-widget/favorites-widget.component";

const LandingMenu = () => {
  return (
    // Main container
    <div className="landing-menu-container flex h-full">
      <div className="h-[95%]">
        {/* Sidebar component */}
        <SideBar className="" />
      </div>
      <div className="menu-right-container flex flex-col p-3 w-full h-[95%]">
        {/* Header */}
        <div className="bg-blue-400 p-3 shadow-lg">
          <p className="text-white font-bold text-6xl">
            City of Simpsonville, SC - Train
          </p>
        </div>

        {/* Body */}
        <div className="widgets-body-container flex sm:flex-col md:flex-col lg:flex-row w-full py-3 w-full h-full">
          {/* Left Section */}
          <div className="widgets-container-left flex flex-col h-full basis-2/3 w-full lg:pr-4">
            {/* Display widgets */}
            <div className="display-widgets-container flex sm:flex-col md:flex-row lg:flex-row w-full sm:h-1/5 lg:min-h-[150px] md:min-h-[150px] justify-between">
              <DisplayWidget
                icon={<ThumbsUp />}
                title="Approvals"
                count={0}
                margin="mb-4 lg:mr-4 md:mr-4 "
                bgColor="bg-emerald-700"
              />
              <DisplayWidget
                icon={<Message />}
                title="Notifications"
                count={0}
                margin="mb-4 lg:mr-4 md:mr-4"
                bgColor="bg-amber-600"
              />
              <DisplayWidget
                icon={<Check />}
                title="Alerts"
                count={0}
                margin="mb-4 lg:mr-0"
                bgColor="bg-lime-600"
              />
            </div>

            {/* Menu container */}
            <div className="menu-container flex md:flex-col sm:flex-col lg:flex-row w-full h-full lg:h-4/5 md:max-h-[200px] lg:max-h-[500px] lg:min-h-[500px]">
              {/* Left DropdownMenu */}
              <LinksWidget />

              {/* Right container */}
              <FavoritesWidget />
            </div>
          </div>

          {/* Right Section */}
          <div className="widget-container-right flex flex-col basis-1/3 ">
            <div className="flex flex-col basis-1/3 bg-white m-1 rounded shadow-2xl">
              <div className="flex w-full justify-end ">
                <Pencil />
                <DotMenuBlack className="" />
              </div>
              <div className="flex bg-cover bg-amber-100 items-center h-full">
                <img
                  src={PageLogo}
                  alt="Example"
                  className="max-w-ls opacity-75 bg-cover h-fit w-fit"
                />
              </div>
            </div>
            <div className="flex flex-col basis-2/3 bg-white m-1 rounded shadow-2xl">
              <MenuLinks pencil={<Pencil />} dotMenuBlack={<DotMenuBlack />} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingMenu;
