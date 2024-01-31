/* eslint-disable react-hooks/exhaustive-deps */
import { Jakan } from "jakan";
import { useEffect, useState } from "react";
import AnimeWeek from "./AnimeWeek";
import { ExtendedAnimeData, userType } from "@/vite-env";
import axios from 'axios';
import { Switch } from "./ui/switch";
import { Label } from "./ui/label";
import { RootState } from "./utility/store";
import { useSelector } from "react-redux";



const Schedule = () => {
  // Build a JakanMisc client
  const miscClient = new Jakan().withMemory().forMisc();
  const userData = useSelector((state: RootState) => state.userData as userType | null)
  const [monday, setMonday] = useState<ExtendedAnimeData[] | null>(null);
  const [tuesday, setTuesday] = useState<ExtendedAnimeData[] | null>(null);
  const [wednesday, setWednesday] = useState<ExtendedAnimeData[] | null>(null);
  const [thursday, setThursday] = useState<ExtendedAnimeData[] | null>(null);
  const [friday, setFriday] = useState<ExtendedAnimeData[] | null>(null);
  const [saturday, setSaturday] = useState<ExtendedAnimeData[] | null>(null);
  const [sunday, setSunday] = useState<ExtendedAnimeData[] | null>(null);
  const delay = (ms: number | undefined) =>
    new Promise((res) => setTimeout(res, ms));
    const [isFilterActive, setIsFilterActive] = useState(false)

    

    async function fetchCustomDay(day:string) {
        try {
          const response = await axios.get(`https://api.jikan.moe/v4/schedules/${day}`);
          return response.data.data; 
        } catch (error) {
          console.error(`Error fetching schedule for ${day}:`, error);
          return null;
        }
      }

  async function getSchedule() {
    const days = [
      "monday",
      "tuesday",
      "wednesday",
      "thursday",
      "friday",
    ] as const;
    const setters = [
      setMonday,
      setTuesday,
      setWednesday,
      setThursday,
      setFriday,
    ];

    for (let i = 0; i < days.length; i++) {
      try {
        const schedule = await miscClient.schedules({ filter: days[i] });
        setters[i](schedule.data);
      } catch (error) {
        console.error("Error fetching schedule:", error);
      }

      await delay(1000);
    }

    await delay(1000)
    const saturdayData = await fetchCustomDay('saturday');
    setSaturday(saturdayData); 


    await delay(1000)
    const sundayData = await fetchCustomDay('sunday');
    setSunday(sundayData); 
  }


  useEffect(() => {
    getSchedule();

  }, []);

  function handleChange() {
    setIsFilterActive(!isFilterActive)
  }

  const filterAnimeList = (animeList:ExtendedAnimeData[]) => {
    if (!isFilterActive || !userData) {
      return animeList; // Return the original list if filter is not active or userData is not available
    }
    return animeList.filter((anime:ExtendedAnimeData) => 
      userData?.animeList?.some(savedAnime => savedAnime.mal_id === anime.mal_id)
    );
  };

  return (
    <div className="px-8">
      {userData && 
      <div className="flex items-center space-x-2 pt-4">
        <Switch onCheckedChange={handleChange}/>
        <Label className="text-xl">Filter</Label>
      </div>}
      {Array.isArray(monday) && <AnimeWeek day={filterAnimeList(monday)} />}
      {Array.isArray(tuesday) && <AnimeWeek day={filterAnimeList(tuesday)} />}
      {Array.isArray(wednesday) && <AnimeWeek day={filterAnimeList(wednesday)} />}
      {Array.isArray(thursday) && <AnimeWeek day={filterAnimeList(thursday)} />}
      {Array.isArray(friday) && <AnimeWeek day={filterAnimeList(friday)} />}
      {Array.isArray(saturday) && <AnimeWeek day={filterAnimeList(saturday)} />}
      {Array.isArray(sunday) && <AnimeWeek day={filterAnimeList(sunday)} />}
    </div>
  );
};

export default Schedule;
