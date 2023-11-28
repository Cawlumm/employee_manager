import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../contexts/auth.context";
import { ReactComponent as UserImg } from "../../assets/user.svg";
import { ReactComponent as Exit } from "../../assets/x.svg";

const User = () => {
  const [isHovering, setIsHovering] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const { currentUser, logoutUser, isAuthenticated } = useAuth();
  let hoverTimeout;

  const handleMouseEnter = () => {
    hoverTimeout = setTimeout(() => {
      setIsHovering(true);
    }, 1000); // 1000 milliseconds = 1 seconds
  };
  const handleMouseLeave = () => {
    clearTimeout(hoverTimeout);
    setIsHovering(false);
  };
  const handleMouseClick = () => {
    handleMouseLeave();
    setIsOpen(!isOpen);
  };
  const handleBlur = () => {
    if (isOpen) {
      setIsOpen(!isOpen);
    }
  };
  const handleLogout = async () => {
    await logoutUser();
  };

  return (
    <div className="flex items-center">
      <button
        className=""
        onClick={handleMouseClick}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onBlur={handleBlur}
      >
        <UserImg
          className={`bg-green-600 rounded-full mx-1 p-1 cursor-pointer `}
        />
      </button>
      {isHovering && isAuthenticated && (
        <div className="user-popup-container overflow-hidden absolute top-16 right-1 max-w-[cal(-8px + 100vw)] z-10 p-1 rounded shadow bg-green-600 opacity-90">
          <div className="flex flex-col justify-center text-sm">
            <div className="font-bold">
              <p>Employee Account</p>
            </div>
            <div className="">
              <p>{currentUser.username}</p>
            </div>
            <div className="">
              <p>{currentUser.email}</p>
            </div>
          </div>
        </div>
      )}
      {isOpen && (
        <div
          className="absolute top-20 sm:right-12 z-10 right-0 bg-white w-1/5 min-w-[300px] h-auto shadow-lg rounded-sm p-2 border-grey-200 bg-whitesmoke"
          onMouseDown={(e) => e.preventDefault()}
        >
          <div className="flex flex-col text-sm text-black">
            <div className="flex justify-end ">
              <Exit
                className="cursor-pointer"
                onClick={handleMouseClick}
              />
            </div>
            <div className="flex justify-around text-md my-5">
              <UserImg
                className={`bg-green-600 rounded-full mx-1 p-1 cursor-pointer `}
              />
              <div className="">
                <div className="">
                    {isAuthenticated ? `Hi ${currentUser.username}!` : "Guest"}
                </div>
                <div className="font-bold">
                    {isAuthenticated ? currentUser.email : "Please Login"}
                </div>
              </div>
              <div className="my-auto">
              {isAuthenticated ? (
                <button
                  onClick={handleLogout}
                  className="p-2 hover:text-blue-500"
                >
                  Logout
                </button>
              ) : (
                <Link
                  to="/authentication"
                  className=" border-gray-500 border-2 p-2 hover:bg-green-600 hover:text-white"
                  onClick={handleMouseClick}
                >
                  Login
                </Link>
              )}
            </div>
            </div>

            {/* <div className="mx-auto">
              {isAuthenticated && (
                <button className="rounded-full border-gray-500 border-2 p-2 hover:bg-green-600 hover:border-green-600 hover:text-white hover:border-white">
                  Manage your Account
                </button>
              )}
            </div> */}

          </div>
        </div>
      )}
    </div>
  );
};

export default User;
