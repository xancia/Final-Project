import { ExtendedAnimeData } from "@/vite-env";
import { Icon } from "@iconify/react/dist/iconify.js";
import { Link } from "react-router-dom";


interface AnimeCardProps {
  anime: ExtendedAnimeData;
}

const AnimeCard: React.FC<AnimeCardProps> = ({ anime }) => {
  const imageUrl = anime.images?.jpg.image_url;



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

        <button className="absolute top-0 right-0 bg-gray-600 hover:bg-gray-400 text-white font-bold py-1 px-1 rounded-sm z-10">
          <Icon
            className="text-xl"
            icon="material-symbols:bookmark-outline-sharp"
          />
        </button>

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
