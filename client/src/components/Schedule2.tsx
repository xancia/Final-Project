/* eslint-disable react-hooks/exhaustive-deps */

import { useEffect, useState } from "react";
import AnimeWeek from "./AnimeWeek";
import { ExtendedAnimeData, userType } from "@/vite-env";
import axios from 'axios';
import { Switch } from "./ui/switch";
import { Label } from "./ui/label";
import { RootState } from "./utility/store";
import { useSelector } from "react-redux";
import { Button } from "./ui/button";



const Schedule2 = () => {
  // Build a JakanMisc client
  const userData = useSelector((state: RootState) => state.userData as userType | null)
  const [monday, setMonday] = useState<ExtendedAnimeData[] | null>(() => {
    const storedData = localStorage.getItem('monday');
    return storedData ? JSON.parse(storedData) : null;
  });

  const [tuesday, setTuesday] = useState<ExtendedAnimeData[] | null>(() => {
    const storedData = localStorage.getItem('tuesday');
    return storedData ? JSON.parse(storedData) : null;
  });

  const [wednesday, setWednesday] = useState<ExtendedAnimeData[] | null>(() => {
    const storedData = localStorage.getItem('wednesday');
    return storedData ? JSON.parse(storedData) : null;
  });

  const [thursday, setThursday] = useState<ExtendedAnimeData[] | null>(() => {
    const storedData = localStorage.getItem('thursday');
    return storedData ? JSON.parse(storedData) : null;
  });

  const [friday, setFriday] = useState<ExtendedAnimeData[] | null>(() => {
    const storedData = localStorage.getItem('friday');
    return storedData ? JSON.parse(storedData) : null;
  });

  const [saturday, setSaturday] = useState<ExtendedAnimeData[] | null>(() => {
    const storedData = localStorage.getItem('saturday');
    return storedData ? JSON.parse(storedData) : null;
  });

  const [sunday, setSunday] = useState<ExtendedAnimeData[] | null>(() => {
    const storedData = localStorage.getItem('sunday');
    return storedData ? JSON.parse(storedData) : null;
  });
  const delay = (ms: number | undefined) =>
    new Promise((res) => setTimeout(res, ms));
    const [isFilterActive, setIsFilterActive] = useState(false)

    

    async function fetchCustomDay(day: string) {
        try {
          const storedData = localStorage.getItem(day);
          if (storedData) {
            return JSON.parse(storedData);
          }
      
          const response = await axios.get(`https://api.jikan.moe/v4/schedules/${day}`);
          localStorage.setItem(day, JSON.stringify(response.data.data)); 
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
        "saturday",
        "sunday"
      ] as const;
      const setters = [
        setMonday,
        setTuesday,
        setWednesday,
        setThursday,
        setFriday,
        setSaturday,
        setSunday
      ];
    
      for (let i = 0; i < days.length; i++) {
        try {
          const schedule = await fetchCustomDay(days[i]); 
          setters[i](schedule);
        } catch (error) {
          console.error("Error fetching schedule:", error);
        }
    
        await delay(1000);
      }
  }

  const handleClearCache = () => {
    const days = [
      'monday',
      'tuesday',
      'wednesday',
      'thursday',
      'friday',
      'saturday',
      'sunday'
    ];
  
    days.forEach(day => {
      localStorage.removeItem(day);
    });
  
    window.location.reload();
  };


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
        <div className="absolute top-[5.5rem] sm:top-[6.7rem] right-40 flex items-center space-x-2 pt-4">
            <Button onClick={handleClearCache}>Refresh</Button>
        </div>
      {userData && 
      <div className="absolute top-24 sm:top-28 right-10 flex items-center space-x-2 pt-4">
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

export default Schedule2;
