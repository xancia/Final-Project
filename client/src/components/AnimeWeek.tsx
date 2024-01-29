import { JakanData } from "jakan"
import AnimeCard from "./AnimeCard"
import { ExtendedAnimeData } from "@/vite-env";

interface AnimeCardProps {
    day: ExtendedAnimeData[];
  }

const AnimeWeek: React.FC<AnimeCardProps> = ({day}) => {
  return (
    <div className="flex flex-col">
            <div className="py-10">
                <p className="text-4xl">{day[0].broadcast?.day}</p>
            </div>
            <div className="flex flex-wrap gap-4 w-full">
            {Array.isArray(day) && day.map((anime:JakanData) => (
                <AnimeCard key={anime.mal_id} anime={anime}/> 
            ))}
            </div>
        </div>
  )
}

export default AnimeWeek