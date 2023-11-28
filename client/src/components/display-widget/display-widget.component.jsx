import React, { useState, useRef } from "react";

import { ReactComponent as DotMenu } from "../../assets/dotmenu.svg";
import DisplayWidgetPopup from "../display-widget-popup/display-widget-popup.component";

import { httpGetNotificationsLength } from "../../hooks/requests";

const DisplayWidget = ({ icon, title, margin, bgColor }) => {
  const [isloading, setIsLoading] = useState(false);
  const [count, setCount] = useState(0);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [isOptionsOpen, setIsOptionsOpen] = useState(false);

  const buttonRef = useRef(null);
  const popupRef = useRef(null);

  useEffect(() => {
    const fetchNotificationsLength = async () => {
      setIsLoading(true);

      try {
        const data = httpGetNotificationsLength(title, userId);
        setCount(data.notificationCount); 
      } catch (error) {
        console.error("Error fetching data:", error);
      }

      setIsLoading(false);
    };

    fetchNotificationsLength();
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
            isloading && "opacity-50"
          }`}
        >
          <div className="basis-1/2">
            {icon && React.cloneElement(icon, { className: "p-1" })}
            {isloading ? (
              <p className="text-white text-bold text-lg p-1">Loading...</p>
            ) : (
              <p className="text-white text-bold text-lg p-1">{title}</p>
            )}
          </div>
          <div className="basis-1/2 text-center">
            {!isloading && (
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
