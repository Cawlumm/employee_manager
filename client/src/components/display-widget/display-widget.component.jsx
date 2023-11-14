import React, { useState, useRef } from "react";

import { ReactComponent as DotMenu } from "../../assets/dotmenu.svg";

const DisplayWidget = ({ icon, title, count, margin, bgColor }) => {
  const [isloading, setisloading] = useState(false);
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const buttonRef = useRef(null);
  const popupRef = useRef(null);

  const handleTogglePopup = () => {
    setIsPopupOpen(!isPopupOpen);
  };
  // TODO: Work on options popups
  return (
    <div className="flex basis-1/3 ">
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
        <button ref={buttonRef} onClick={handleTogglePopup} className=" absolute top-2 right-2 cursor-pointer"><DotMenu  /></button>

      </div>
    </div>
    {isPopupOpen && (<div ref={popupRef} className={`absolute top-0 right-[${(buttonRef.current.getBoundingClientRect().left) + window.pageXOffset}px] text-black`}>Hello</div>)}

    </div>

  );
};
export default DisplayWidget;
