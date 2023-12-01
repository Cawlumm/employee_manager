import React, { useState, useRef, useEffect } from "react";

import { ReactComponent as DotMenu } from "../../assets/dotmenu.svg";
import DisplayWidgetPopup from "../display-widget-popup/display-widget-popup.component";

import { httpGetLength } from "../../hooks/requests";
import { useAuth } from "../../contexts/auth.context";

const DisplayWidget = ({ icon, title, margin, bgColor }) => {
  const { currentUser } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [count, setCount] = useState(0);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [isOptionsOpen, setIsOptionsOpen] = useState(false);

  const buttonRef = useRef(null);
  const popupRef = useRef(null);

  useEffect(() => {
    const fetchLength = async () => {
      setIsLoading(true);

      try {
        const data = await httpGetLength(
          title.toLowerCase(),
          currentUser.userId
        );
        setCount(data.notificationCount);
      } catch (error) {
        setIsLoading(false);
        console.error("Error fetching data:", error);
      }

      setIsLoading(false);
    };

    fetchLength();
  }, [title]);

  const handleTogglePopup = () => {
    setIsPopupOpen(!isPopupOpen);
  };
  const handleToggleOptions = () => {
    setIsOptionsOpen(!isOptionsOpen);
  };
  // TODO: Work on options popups
  return (
    <>
      <div
        className="flex basis-1/3 cursor-pointer"
        onClick={handleTogglePopup}
      >
        <div
          className={`flex p-3 w-full ${margin} rounded relative shadow-xl ${bgColor} ${
            isLoading && "opacity-50"
          }`}
        >
          <div className="basis-1/2">
            {icon && React.cloneElement(icon, { className: "p-1" })}
            {isLoading ? (
              <p className="text-white text-bold text-lg p-1">Loading...</p>
            ) : (
              <p className="text-white text-bold text-lg p-1">{title}</p>
            )}
          </div>
          <div className="basis-1/2 text-center">
            {!isLoading && (
              <p className="w-full text-white text-bold text-6xl">{count}</p>
            )}
            <button
              ref={buttonRef}
              onClick={handleToggleOptions}
              className=" absolute top-2 right-2 cursor-pointer"
            >
              <DotMenu />
            </button>
          </div>
        </div>
        {isOptionsOpen && (
          <div
            ref={popupRef}
            className={`absolute top-0 right-[${
              buttonRef.current.getBoundingClientRect().left +
              window.pageXOffset
            }px] text-black`}
          >
            Hello
          </div>
        )}
      </div>
      {isPopupOpen && (
        <DisplayWidgetPopup togglePopup={handleTogglePopup} title={title} />
      )}
    </>
  );
};
export default DisplayWidget;
