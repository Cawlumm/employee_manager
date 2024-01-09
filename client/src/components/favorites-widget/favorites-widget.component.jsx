// Importing React Api
import { useState, useEffect } from "react";

// Importing Icons
import { ReactComponent as DotMenuBlack } from "../../assets/dotmenublack.svg";
import { ReactComponent as Pencil } from "../../assets/pencil.svg";

// Importing Components
import ProgressLoader from "../progress-loader/progress-loader.component";

// Importing Methods
import { httpGetSavedFavoriteLinks } from "../../hooks/requests";

// Importing Contexts
import { useAuth } from "../../contexts/auth.context";

const FavoritesWidget = () => {
  // User state
  const { currentUser } = useAuth();

  // State varaibles
  const [favoriteLinks, setFavoriteLinks] = useState();

  // Fetch favorites on component mount
  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        const response = await httpGetSavedFavoriteLinks(currentUser?.userId);
        setFavoriteLinks(response);
      } catch (error) {
        console.error("Error fetching favorites:", error.message);
      }
    };

    fetchFavorites();
  }, []);
  
  return (
    <div className="flex flex-col basis-1/2 bg-white m-1 rounded shadow-2xl ">
      {favoriteLinks ? (
        <>
          <div className="flex justify-between p-2">
            <p className="text-lg">Favorites</p>
            <div className="flex">
              <Pencil />
              <DotMenuBlack className="" />
            </div>
          </div>
          <div>
            <div className="flex flex-col">
              {favoriteLinks.map((link, index) => (
                <a key={index} href={link.path} className="mx-2 py-3">
                  <span className="ml-1 cursor-pointer">{link.pathName}</span>
                </a>
              ))}
            </div>
          </div>
        </>
      ) : (
        <ProgressLoader />
      )}
    </div>
  );
};

export default FavoritesWidget;
