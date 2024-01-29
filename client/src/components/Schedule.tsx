/* eslint-disable react-hooks/exhaustive-deps */
import { Jakan } from "jakan";
import { useEffect, useState } from "react";
import AnimeWeek from "./AnimeWeek";
import { ExtendedAnimeData } from "@/vite-env";
import axios from 'axios';

const Schedule = () => {
  // Build a JakanMisc client
  const miscClient = new Jakan().withMemory().forMisc();

  const [monday, setMonday] = useState<ExtendedAnimeData[] | null>(null);
  const [tuesday, setTuesday] = useState<ExtendedAnimeData[] | null>(null);
  const [wednesday, setWednesday] = useState<ExtendedAnimeData[] | null>(null);
  const [thursday, setThursday] = useState<ExtendedAnimeData[] | null>(null);
  const [friday, setFriday] = useState<ExtendedAnimeData[] | null>(null);
  const [saturday, setSaturday] = useState<ExtendedAnimeData[] | null>(null);
  const [sunday, setSunday] = useState<ExtendedAnimeData[] | null>(null);
  const delay = (ms: number | undefined) =>
    new Promise((res) => setTimeout(res, ms));

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

      await delay(2000);
    }

    await delay(2000)
    const saturdayData = await fetchCustomDay('saturday');
    setSaturday(saturdayData); 


    await delay(2000)
    const sundayData = await fetchCustomDay('sunday');
    setSunday(sundayData); 
  }


  useEffect(() => {
    getSchedule();

  }, []);

  return (
    <div className="px-4">
      {Array.isArray(monday) && <AnimeWeek day={monday} />}
      {Array.isArray(tuesday) && <AnimeWeek day={tuesday} />}
      {Array.isArray(wednesday) && <AnimeWeek day={wednesday} />}
      {Array.isArray(thursday) && <AnimeWeek day={thursday} />}
      {Array.isArray(friday) && <AnimeWeek day={friday} />}
      {Array.isArray(saturday) && <AnimeWeek day={saturday} />}
      {Array.isArray(sunday) && <AnimeWeek day={sunday} />}
    </div>
  );
};

export default Schedule;
