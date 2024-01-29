/* eslint-disable react-hooks/exhaustive-deps */
import { Jakan } from "jakan";
import { useEffect, useState } from "react";
import AnimeWeek from "./AnimeWeek";
import { ExtendedAnimeData } from "@/vite-env";

const Schedule = () => {
  // Build a JakanMisc client
  const miscClient = new Jakan().withMemory().forMisc();

  const [monday, setMonday] = useState<ExtendedAnimeData[] | null>(null);
  const [tuesday, setTuesday] = useState<ExtendedAnimeData[] | null>(null);
  const [wednesday, setWednesday] = useState<ExtendedAnimeData[] | null>(null);
  const [thursday, setThursday] = useState<ExtendedAnimeData[] | null>(null);
  const [friday, setFriday] = useState<ExtendedAnimeData[] | null>(null);
  const delay = (ms: number | undefined) =>
    new Promise((res) => setTimeout(res, ms));

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
    </div>
  );
};

export default Schedule;
