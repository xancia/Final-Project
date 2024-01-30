/* eslint-disable react-hooks/exhaustive-deps */
import { useParams } from "react-router-dom";
import {Jakan, JakanData} from "jakan";
import { useEffect, useState } from "react";
import { NavBar } from "../NavBar";
import Container from "../utility/Container";
import { ExtendedAnimeData } from "@/vite-env";
import { Icon } from "@iconify/react/dist/iconify.js";




const AnimePage = () => {
    const {id} = useParams();
    const animeID = Number(id)
    const jakan = new Jakan().withMemory().forSearch()
    const [anime, setAnime] = useState<ExtendedAnimeData | null>(null)
    console.log(id)

    async function getAnime() {
        const animeData = await jakan.anime(animeID)
        setAnime(animeData.data)
    }

    useEffect(() => {
        getAnime()
    }, [])
    
    console.log(anime)


  return (
    <div>
        <NavBar />
        {anime && 
        <div className="pt-20">
            <Container className="flex-col sm:flex-row">
                <div className="flex flex-col m-4 p-2">
                    <img src={anime.images?.jpg.image_url} alt="" />
                    <div className="flex items-center py-4 px-2">
                        <Icon className="" icon='ic:baseline-star-rate'/>
                        <p className="text-xl pl-2 font-bold pb-1">{anime.score}</p><p className="text-slate-400">/10</p>
                    </div>
                    <div>{anime.scored_by}</div>
                </div>
                <div className="flex flex-col m-4 p-2">2</div>
            </Container>
        </div>}
    </div>
  )
}

export default AnimePage