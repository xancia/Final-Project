import { ExtendedAnimeData, userType } from "@/vite-env";
import { Icon } from "@iconify/react/dist/iconify.js";
import { Link } from "react-router-dom";
import axios from 'axios';
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "./utility/store";
import { addSavedAnime, removeSavedAnime } from "./utility/userDataSlice";

interface AnimeCardProps {
  anime: ExtendedAnimeData;
}

const AnimeCard: React.FC<AnimeCardProps> = ({ anime }) => {
    const dispatch = useDispatch()
  const imageUrl = anime.images?.jpg.image_url;
  const userData = useSelector((state: RootState) => state.userData as userType | null)
  const isAnimeSaved = userData?.animeList?.some(item => item.mal_id === anime.mal_id);

  async function handleClick() {
    try {
      const token = localStorage.getItem('token');
      if (!token) throw new Error('No token found');

      // Preparing the payload
      const animeData = {
        mal_id: anime.mal_id,
        image: anime.images?.jpg.image_url,
        title: anime.title,
        broadcastTime: anime.broadcast?.time,
        broadcastTimeZone: anime.broadcast?.timezone,
        score: anime.score
      };

      // Sending a POST request to the server
      const response = await axios.post('http://localhost:8080/api/users/anime', animeData, {
        headers: {
          Authorization: token
        }
      });
      dispatch(addSavedAnime(animeData))
      console.log('Anime added:', response.data);
    } catch (error) {
      console.error('Error adding anime:', error);
    }
  }

  async function handleRemove() {
    try {
        const token = localStorage.getItem('token');
        if (!token) throw new Error('No token found');
    
        // Preparing the payload
        const animeData = { mal_id: anime.mal_id };
    
        // Sending a DELETE request to the server
        await axios.delete('http://localhost:8080/api/users/anime', {
          headers: {
            Authorization: token
          },
          data: animeData // Axios DELETE sends data in the 'data' field
        });
    
        // Dispatch action to update Redux state
        dispatch(removeSavedAnime(anime.mal_id));
    
        console.log('Anime removed:', anime.mal_id);
      } catch (error) {
        console.error('Error removing anime:', error);
      }
  }


  return (
    <div className="relative w-[175px] overflow-hidden rounded shadow-lg bg-white">
      {anime.broadcast && (
        <div className="bg-gray-200 text-sm text-gray-700 px-2 py-1 text-center">
          {anime.broadcast.time} ({anime.broadcast.timezone})
        </div>
      )}

      <div className="relative h-[250px]">
        <img
          src={imageUrl}
          alt={anime.title}
          className="w-full h-full object-cover"
        />

        {isAnimeSaved ?
        <button className="absolute top-0 right-0 bg-gray-600 hover:bg-gray-400 text-white font-bold py-1 px-1 rounded-sm z-10" onClick={handleRemove}>
        <Icon
          className="text-xl"
          icon='material-symbols:bookmark-sharp'
        />
      </button>
        
        :
        <button className="absolute top-0 right-0 bg-gray-600 hover:bg-gray-400 text-white font-bold py-1 px-1 rounded-sm z-10" onClick={handleClick}>
          <Icon
            className="text-xl"
            icon='material-symbols:bookmark-outline-sharp'
          />
        </button>}


        <Link to={`/anime/${anime.mal_id}`}>
          <div className="absolute inset-0 bg-black bg-opacity-0 flex items-center justify-center opacity-0 hover:opacity-100 hover:bg-opacity-50 transition duration-300 ease-in-out">
            <p className="text-white text-lg font-bold  text-center">{anime.title}</p>
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

export default AnimeCard;
