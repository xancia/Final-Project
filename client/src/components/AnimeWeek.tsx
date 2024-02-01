import { JakanData } from "jakan"
import AnimeCard from "./AnimeCard"
import { ExtendedAnimeData } from "@/vite-env";

interface AnimeCardProps {
    day: ExtendedAnimeData[];
  }

const AnimeWeek: React.FC<AnimeCardProps> = ({day}) => {
  const hasAnime = day && Array.isArray(day) && day.length > 0;

  const getDaySingularForm = (dayString:string | undefined) => {
    if (dayString?.endsWith('s')) {
      return dayString.slice(0, -1); // Removes the last character if it's an 's'
    }
    return dayString;
  };

  const dayOfWeek = getDaySingularForm(day[0].broadcast?.day);

  const getDayOfWeek = () => {
    const date = new Date();
    const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    return days[date.getDay()];
  };
  
  const currentDay = getDayOfWeek();



  return (
    <div className="flex flex-col">
            {hasAnime &&  
            <>
            <div className="pb-3 pt-10">
                <p className={`text-4xl md:text-6xl font-bold ${currentDay == dayOfWeek ? 'text-blue-500' : ''}`}>{dayOfWeek}</p>
            </div>
            <span className={`h-1 w-full mb-4 ${currentDay == dayOfWeek ? 'bg-blue-500' : 'bg-black dark:bg-white'}`}></span>
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