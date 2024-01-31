import { JakanData } from "jakan"
import AnimeCard from "./AnimeCard"
import { ExtendedAnimeData } from "@/vite-env";

interface AnimeCardProps {
    day: ExtendedAnimeData[];
  }

const AnimeWeek: React.FC<AnimeCardProps> = ({day}) => {
  const hasAnime = day && Array.isArray(day) && day.length > 0;
  return (
    <div className="flex flex-col">
            {hasAnime &&  
            <>
            <div className="pb-10 pt-4">
                <p className="text-4xl md:text-6xl font-bold underline">{day[0].broadcast?.day}</p>
            </div>
            <div className="flex flex-wrap gap-4 w-full">
            {day.map((anime:JakanData) => (
                <AnimeCard key={anime.mal_id} anime={anime}/> 
            ))}
            </div>
            </>
            }
        </div>
  )
}

export default AnimeWeek