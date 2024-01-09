// Import necessary dependencies and components
import { useState, useEffect } from "react";
import { useOpen } from "../../contexts/open.contex";
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import { ReactComponent as MagnifyingGlass } from "../../assets/mg.svg";
import { ReactComponent as QuestionMark } from "../../assets/questionm.svg";
import { ReactComponent as Logo } from "../../assets/logo.svg";
import User from "../user/user.component";

// Functional component for the header
const Header = () => {
  // Access the context for handling the open state of the menu
  const { isOpen, setIsOpen } = useOpen();
  const location = useLocation();
  // Determine if the current page is the home page
  const isHomePage = useLocation().pathname === "/";
  const [pageTitle, setPageTitle] = useState("Menu Landing Page");

  useEffect(() => {
    // Update the page title when the location changes
    switch (location.pathname) {
      case "/":
        setPageTitle("Menu Landing Page");
        break;
      case "/actions":
        setPageTitle("Personal Actions");
        break;
      case "/actions-inquiry":
        setPageTitle("Personal Actions Inquiry");
        break;
      default:
        setPageTitle("Authentication");
    }
  }, [location.pathname]);

  // Handle the toggle of the menu
  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  // Handle blur events (closing the menu)
  const handleBlur = () => {
    if (isOpen) {
      setIsOpen(!isOpen);
    }
  };

  return (
    <>
      {/* Header container with dynamic styling based on whether it's the home page */}
      <div className="header-container bg-blue-900 text-white h-auto p-2 flex flex-row items-center justify-between shadow-lg">
        {/* Hamburger menu button, displayed only on the home page */}
        {isHomePage && (
          <div className="hamburger-container flex basis-1/14 justify-center items-center p-1 px-5">
            <button onClick={handleToggle} onBlur={handleBlur} className="">
              {/* Hamburger icon elements */}
              <span
                className={`bg-white block transition-all duration-300 ease-out 
                  h-0.5 w-6 rounded-sm ${
                    isOpen ? "rotate-45 translate-y-1" : "-translate-y-0.5"
                  }`}
              ></span>
              <span
                className={`bg-white block transition-all duration-300 ease-out 
                  h-0.5 w-6 rounded-sm my-0.5 ${
                    isOpen ? "opacity-0" : "opacity-100"
                  }`}
              ></span>
              <span
                className={`bg-white block transition-all duration-300 ease-out 
                  h-0.5 w-6 rounded-sm ${
                    isOpen ? "-rotate-45 -translate-y-1" : "translate-y-0.5"
                  }`}
              ></span>
            </button>
          </div>
        )}

        {/* Logo and title, wrapped in a Link for navigation */}
        <div className="flex basis-1/6 px-1 items-center justify-start">
          <Link to="/">
            <Logo />
          </Link>
          <h1 className="lg:text-base md:text-sm sm:text-xs :hidden font-bold px-3 hidden sm:inline">
            {pageTitle}
          </h1>
        </div>

        {/* Search input and magnifying glass icon */}
        <div className="flex basis-2/3 w-full items-center justify-around">
          <input
            type="text"
            placeholder="Search"
            className="w-11/12 px-1 p-1 bg-blue-700 text-lg font-bold border-none placeholder-white focus:outline-none"
          />
          <MagnifyingGlass className="w-1/12" />
        </div>

        {/* Question mark icon and user component */}
        <div className="flex basis-1/12 justify-end">
          <QuestionMark className="mx-1 my-auto" />
          <User />
        </div>
      </div>
    </>
  );
};

// Export the Header component
export default Header;
