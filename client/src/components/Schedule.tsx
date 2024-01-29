/* eslint-disable react-hooks/exhaustive-deps */
import {Jakan, JakanData} from "jakan";
import { useEffect, useState } from "react";
import AnimeCard from "./AnimeCard";


const Schedule = () => {
// Build a JakanMisc client
const miscClient = new Jakan().withMemory().forMisc();

const [monday, setMonday] = useState<JakanData[] | null>(null)

async function getSchedule() {
    const mondaySchedule = await miscClient.schedules({
        filter: "monday",
    });
    console.log(mondaySchedule)
    setMonday(mondaySchedule.data)
    

}

useEffect(() => {
  getSchedule()
}, [])


  return (
    <div>
        <div className="flex flex-wrap gap-4 w-full">
            {Array.isArray(monday) && monday.map((anime:JakanData) => (
                <AnimeCard key={anime.mal_id} anime={anime}/>
            ))}
        </div>
    </div>
  )
}

export default Schedule