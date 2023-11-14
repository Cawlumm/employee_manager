import React, { useState } from "react";

// Importing icons
import { ReactComponent as ThumbsUp } from "../assets/thumbs-up.svg";
import { ReactComponent as Message } from "../assets/message.svg";
import { ReactComponent as Check } from "../assets/check.svg";
import { ReactComponent as DotMenuBlack } from "../assets/dotmenublack.svg";
import { ReactComponent as Pencil } from "../assets/pencil.svg";
import { ReactComponent as MagnifyingGlass } from "../assets/search.svg";
import PageLogo from "../assets/pagelogo3.jpg";

// Importing components
import DisplayWidget from "../components/display-widget/display-widget.component";
import SideBar from "../components/sidebar/sidebar.component";
import DropdownMenu from "../components/dropdown-menu/dropdown-menu.component";
import MenuLinks from "../components/menu-links/menu-links-component";

const LandingMenu = () => {

  return (
    // Main container
    <div className="landing-menu-container flex">
      {/* Sidebar component */}
      <SideBar className="" />

      <div className="menu-right-container flex flex-col p-3 w-full">
        {/* Header */}
        <div className="bg-blue-400 p-3 shadow-lg">
          <p className="text-white font-bold text-6xl">
            City of Simpsonville, SC - Train
          </p>
        </div>

        {/* Body */}
        <div className="widgets-body-container relative flex sm:flex-row flex-col w-full py-3 w-full h-full">
          {/* Left Section */}
          <div className="widgets-container-left flex flex-col h-full basis-2/3 w-full sm:pr-4">
            {/* Display widgets */}
            <div className="display-widgets-container flex sm:flex-row flex-col w-full sm:h-1/5 justify-between">
              <DisplayWidget
                icon={<ThumbsUp />}
                title="Approvals"
                count={0}
                margin="mb-4 sm:mr-4 "
                bgColor="bg-emerald-700"
              />
              <DisplayWidget
                icon={<Message />}
                title="Notifications"
                count={0}
                margin="mb-4 sm:mr-4"
                bgColor="bg-amber-600"
              />
              <DisplayWidget
                icon={<Check />}
                title="Alerts"
                count={0}
                margin="mb-4 sm:mr-0"
                bgColor="bg-lime-600"
              />
            </div>

            {/* Menu container */}
            <div className="menu-container flex md:flex-col sm:flex-row lg:flex-row flex-col w-full sm:h-4/5">
              {/* Left DropdownMenu */}
              <div className="flex flex-col basis-1/2 bg-white m-1 rounded shadow-2xl sm:overflow-scroll">
                <div className="flex justify-between p-2">
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
                  <DropdownMenu
                    title="Menu"
                    options={[
                      {
                        label: "Actions",
                        value: "actions",
                        options: [
                          {
                            label: "Personal Actions Inquiry",
                            value: "actions inquiery",
                          },
                        ],
                      },
                      {
                        label: "Financials",
                        value: "financials",
                        options: [
                          {
                            label: "Human Capital Management",
                            value: "hcm",
                            options: [
                              {
                                label: "Employee Recruitment",
                                value: "recruitment",
                              },
                              {
                                label: "Employee Onboarding",
                                value: "onboarding",
                              },
                              {
                                label: "Training and Development",
                                value: "training",
                              },
                              {
                                label: "Employee Benefits",
                                value: "benefits",
                                options: [
                                  {
                                    label: "Health Insurance",
                                    value: "health_insurance",
                                  },
                                  {
                                    label: "Retirement Plans",
                                    value: "retirement_plans",
                                  },
                                ],
                              },
                              {
                                label: "Employee Reports",
                                value: "employee_reports",
                                options: [
                                  {
                                    label: "Attendance Reports",
                                    value: "attendance_reports",
                                  },
                                  {
                                    label: "Performance Reports",
                                    value: "performance_reports",
                                  },
                                ],
                              },
                            ],
                          },
                          {
                            label: "Accounting",
                            value: "accounting",
                            options: [
                              { label: "Bookkeeping", value: "bookkeeping" },
                              { label: "Payroll", value: "payroll" },
                              { label: "Tax Planning", value: "tax_planning" },
                            ],
                          },
                          {
                            label: "Investments",
                            value: "investments",
                            options: [
                              { label: "Stocks", value: "stocks" },
                              { label: "Bonds", value: "bonds" },
                            ],
                          },
                        ],
                      },
                    ]}
                  />
                </div>
              </div>

              {/* Right container */}
              <div className="flex flex-col basis-1/2 bg-white m-1 rounded shadow-2xl overflow-auto">
                <div className="flex justify-between p-2">
                  <p className="text-lg">Favorites</p>
                  <div className="flex">
                    <Pencil />
                    <DotMenuBlack className="" />
                  </div>
                </div>
              </div>
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
