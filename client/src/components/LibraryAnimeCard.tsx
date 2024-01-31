import { Icon } from "@iconify/react/dist/iconify.js";
import axios from "axios";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { removeSavedAnime } from "./utility/userDataSlice";
import { animeListType } from "@/vite-env";

interface LibraryAnimeCardProps {
  anime: animeListType;
}
const LibraryAnimeCard: React.FC<LibraryAnimeCardProps> = ({ anime }) => {
  const dispatch = useDispatch();

  async function handleRemove() {
    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("No token found");

      // Preparing the payload
      const animeData = { mal_id: anime.mal_id };

      // Sending a DELETE request to the server
      await axios.delete("http://localhost:8080/api/users/anime", {
        headers: {
          Authorization: token,
        },
        data: animeData, // Axios DELETE sends data in the 'data' field
      });

      dispatch(removeSavedAnime(anime.mal_id));

      console.log("Anime removed:", anime.mal_id);
    } catch (error) {
      console.error("Error removing anime:", error);
    }
  }

  const getBgColorClass = (score:number) => {
    if (score >= 7) {
      return "bg-green-600 hover:bg-green-400";
    } else if (score >= 5) {
      return "bg-yellow-600 hover:bg-yellow-400";
    } else {
      return "bg-red-600 hover:bg-red-400";
    }
  };

  return (
    <div className="relative w-[175px] overflow-hidden rounded shadow-lg bg-white">
      <div className="relative h-[250px]">
        <img
          src={anime.image}
          alt={anime.title}
          className="w-full h-full object-cover"
        />

        {anime.userScore && (
          <div
            className={`absolute top-0 left-0 ${getBgColorClass(
              anime.userScore
            )} text-white font-bold py-1 px-1 rounded-sm z-10`}
          >
            {anime.userScore}
          </div>
        )}

        <button
          className="absolute top-0 right-0 bg-gray-600 hover:bg-gray-400 text-white font-bold py-1 px-1 rounded-sm z-10"
          onClick={handleRemove}
        >
          <Icon className="text-xl" icon="material-symbols:bookmark-sharp" />
        </button>

        <Link to={`/anime/${anime.mal_id}`}>
          <div className="absolute inset-0 bg-black bg-opacity-0 flex items-center justify-center opacity-0 hover:opacity-100 hover:bg-opacity-50 transition duration-300 ease-in-out">
            <p className="text-white text-lg font-bold  text-center">
              {anime.title}
            </p>
          </div>
        </Link>
      </div>

      {anime.score && (
        <div className="absolute bottom-0 left-0 right-0 p-2 text-center text-white bg-black bg-opacity-50">
          Score: {anime.score}
        </div>
      )}
    </div>
  );
};

export default LibraryAnimeCard;
