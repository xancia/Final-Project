import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select";
import { ExtendedAnimeData, userType } from "@/vite-env";
import { RootState } from "./utility/store";
import { useSelector } from "react-redux";
  
  type ScoreSelectProps = {
      saveScore: (value: number) => void;
      anime: ExtendedAnimeData;
    };
  
  const ScoreSelect: React.FC<ScoreSelectProps> = ({saveScore, anime}) => {
    const userData = useSelector((state: RootState) => state.userData as userType | null)
    const currentAnime = anime && userData?.animeList?.find((userAnime) => userAnime.mal_id === anime.mal_id);
    console.log(anime)
    console.log(currentAnime)
      const handleValueChange = (value: string) => {
          saveScore(Number(value)); 
        };
  
    return (
      <div className="py-4">
      <Select onValueChange={handleValueChange}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder={currentAnime?.userScore !== undefined ? currentAnime?.userScore : "My Rating"} />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>My Rating</SelectLabel>
            <SelectItem value="1">1</SelectItem>
            <SelectItem value="2">2</SelectItem>
            <SelectItem value="3">3</SelectItem>
            <SelectItem value="4">4</SelectItem>
            <SelectItem value="5">5</SelectItem>
            <SelectItem value="6">6</SelectItem>
            <SelectItem value="7">7</SelectItem>
            <SelectItem value="8">8</SelectItem>
            <SelectItem value="9">9</SelectItem>
            <SelectItem value="10">10</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
      </div>
    );
  };
  
  export default ScoreSelect;