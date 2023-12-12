import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../contexts/auth.context";
import { ReactComponent as UserImg } from "../../assets/user.svg";

const User = () => {
  // State varaibales
  const [isHovering, setIsHovering] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const { currentUser, logoutUser, isAuthenticated } = useAuth();
  let hoverTimeout;

  // Event handlers
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
    setIsOpen(!isOpen);
  };

  return (
    <div className="flex items-center">
      {/* User profile image */}

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

      {/* User popup */}
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

      {/* Main user dropdown */}
      {isOpen && (
        <div
          className="absolute top-[50px] right-[1vw] z-10 bg-white w-[80%] max-w-[450px] h-auto shadow-lg rounded-sm p-2 border-grey-200 bg-whitesmoke"
          onMouseDown={(e) => e.preventDefault()}
        >
          <div className="flex flex-col text-sm text-black">
            <div className="flex flex-col justify-around text-md my-3 px-3 ">
              <div className="flex flex-row justify-start items-center border-b-2 border-gray pb-2 mb-2">
                <div class="w-14 h-14 mr-4 bg-green-500 rounded-full flex items-center justify-center text-white text-2xl font-bold">
                  CL
                </div>
                <div className="">
                  <div className="font-bold">
                    {isAuthenticated ? `Hi ${currentUser.username}!` : "Guest"}
                  </div>
                  <div className="italic">
                    {isAuthenticated ? currentUser.email : ""}
                  </div>
                </div>
              </div>

              {/* Sign Out or Sign In button */}
              <div className="flex justify-end ">
                {isAuthenticated ? (
                  <button
                    onClick={handleLogout}
                    className="border-black-300 border-2 bg-gray-200 p-2 text-gray-600 font-bold hover:text-blue-500"
                  >
                    Sign Out
                  </button>
                ) : (
                  <Link
                    to="/authentication"
                    className="border-black-300 border-2 bg-gray-200 p-2 text-gray-600 font-bold hover:text-blue-500"
                    onClick={handleMouseClick}
                  >
                    Sign In
                  </Link>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default User;
