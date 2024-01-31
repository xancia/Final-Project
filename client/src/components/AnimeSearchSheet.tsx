import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Input } from "./ui/input";
import { useState } from "react";
import { Jakan } from "jakan";
import { ExtendedAnimeData } from "@/vite-env";
import AnimeCard from "./AnimeCard";
import { ScrollArea } from "./ui/scroll-area";

const AnimeSearchSheet = () => {
  const jakan = new Jakan().withMemory().forSearch();
  const [input, setinput] = useState("");
  const [anime, setAnime] = useState<ExtendedAnimeData[] | null>(null);
  async function handleSubmit() {
    const animeData = await jakan.anime(input);
    setAnime(animeData.data);
  }
  return (
    <Sheet>
      <SheetTrigger>Browse</SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Anime Search</SheetTitle>
          <SheetDescription>
            <Input
              placeholder="search"
              value={input}
              onChange={(e) => setinput(e.target.value)}
              onKeyDown={(e) => {
                e.key === "Enter" && handleSubmit();
              }}
            />
          </SheetDescription>
        </SheetHeader>
        <ScrollArea className="w-full py-4 h-full">
        {Array.isArray(anime) &&
                anime.map((anime) => <div key={anime.mal_id} className="py-2"><AnimeCard anime={anime} /></div>)}
                </ScrollArea>
      </SheetContent>
    </Sheet>
  );
};

export default AnimeSearchSheet;
