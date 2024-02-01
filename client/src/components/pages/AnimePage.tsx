/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/exhaustive-deps */
import { useParams } from "react-router-dom";
import { Jakan } from "jakan";
import { useEffect, useState } from "react";
import { NavBar } from "../NavBar";
import Container from "../utility/Container";
import { ExtendedAnimeData, userType } from "@/vite-env";
import { Icon } from "@iconify/react/dist/iconify.js";
import { RootState } from "../utility/store";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import {
  addSavedAnime,
  removeSavedAnime,
  setUserData,
} from "../utility/userDataSlice";
import { Button } from "../ui/button";
import ScoreSelect from "../ScoreSelect";
import { baseURL } from "@/App";

const AnimePage = () => {
  const { id } = useParams();
  const animeID = Number(id);
  const jakan = new Jakan().withMemory().forSearch();
  const [anime, setAnime] = useState<ExtendedAnimeData | null>(null);
  const userData = useSelector(
    (state: RootState) => state.userData as userType | null
  );
  const isAnimeSaved = userData?.animeList?.some(
    (item) => item.mal_id === anime?.mal_id
  );
  const dispatch = useDispatch();
  const defaultEmbedUrl = "";
  const modifiedEmbedUrl =
    (anime &&
      anime.trailer?.embed_url?.replace("autoplay=1", "autoplay=1&mute=1")) ||
    defaultEmbedUrl;

  useEffect(() => {
    async function getAnime() {
      const animeData = await jakan.anime(animeID);
      setAnime(animeData.data);
    }

    if (animeID) {
      getAnime();
    }
  }, [animeID]);

  function convertDateString(dateStr: any) {
    const date = new Date(dateStr);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  }

  const premiereDate = convertDateString(anime?.aired?.from);

  async function handleClick() {
    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("No token found");

      const animeData = {
        mal_id: anime?.mal_id,
        image: anime?.images?.jpg.image_url,
        title: anime?.title,
        broadcastTime: anime?.broadcast?.time,
        broadcastTimeZone: anime?.broadcast?.timezone,
        score: anime?.score,
      };

      const response = await axios.post(
        baseURL + "/api/users/anime",
        animeData,
        {
          headers: {
            Authorization: token,
          },
        }
      );
      dispatch(addSavedAnime(animeData));
      console.log("Anime added:", response.data);
    } catch (error) {
      console.error("Error adding anime:", error);
    }
  }

  async function handleRemove() {
    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("No token found");

      const animeData = { mal_id: anime?.mal_id };

      await axios.delete(baseURL + "/api/users/anime", {
        headers: {
          Authorization: token,
        },
        data: animeData, // Axios DELETE sends data in the 'data' field
      });

      dispatch(removeSavedAnime(anime?.mal_id));

      console.log("Anime removed:", anime?.mal_id);
    } catch (error) {
      console.error("Error removing anime:", error);
    }
  }

  const saveScore = async (userScore: number) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("No token found");

      // Error Handling for checking Anime
      if (!anime || anime.mal_id === undefined) {
        console.error("Anime data is not available");
        return;
      }

      const scoreData = {
        mal_id: anime.mal_id,
        userScore: userScore,
      };

      const response = await axios.put(
        baseURL + "/api/users/anime",
        scoreData,
        {
          headers: { Authorization: token },
        }
      );

      dispatch(setUserData(response.data));

      console.log("Score updated:", response.data);
    } catch (error) {
      console.error("Error updating score:", error);
    }
  };

  console.log(anime);

  return (
    <div>
      <NavBar />
      {anime && (
        <div className="pt-20">
          <Container className="flex-col sm:flex-row">
            <div className="flex flex-col m-4 p-2">
              <img
                src={anime.images?.jpg.image_url}
                alt=""
                className="rounded-sm"
              />
              <div className="flex items-center pt-4 px-2">
                <Icon className="" icon="ic:baseline-star-rate" />
                <div className="px-2 flex flex-col">
                  <div className="flex flex-row items-center">
                    <p className="text-xl pl-2 font-bold">{anime.score}</p>
                    <p className="text-slate-400 mt-1">/10</p>
                  </div>
                  <p className="pl-2">{anime.scored_by} ratings</p>
                </div>
              </div>
              <div>
                {anime && userData && (
                  <ScoreSelect saveScore={saveScore} anime={anime} />
                )}
              </div>
              <div className="flex flex-col py-4">
                <p className="font-bold">Original Title</p>
                <p>{anime.title_japanese}</p>
              </div>
              <div className="flex flex-col py-4">
                <p className="font-bold">Status</p>
                {anime.airing ? (
                  <p>Currently Airing</p>
                ) : (
                  <p>Finished Airing</p>
                )}
              </div>
              <div className="flex flex-col py-4">
                <p className="font-bold">Premiere</p>
                <p>{premiereDate}</p>
              </div>
              <div className="flex flex-col py-4">
                <p className="font-bold">Season</p>
                <p>
                  {anime.season} {anime.year}
                </p>
              </div>
            </div>
            <div className="flex flex-col p-2 w-full">
              <div className="flex justify-between">
                <div>
                  <p className="font-bold text-2xl">{anime.title}</p>
                  <p className="font-xl">{anime.title_english}</p>
                </div>

                <div className="flex items-center">
                  {isAnimeSaved ? (
                    <button className="" onClick={handleRemove}>
                      <Icon
                        className="text-4xl"
                        icon="material-symbols:bookmark-sharp"
                      />
                    </button>
                  ) : (
                    <button className="" onClick={handleClick}>
                      <Icon
                        className="text-4xl"
                        icon="material-symbols:bookmark-outline-sharp"
                      />
                    </button>
                  )}
                </div>
              </div>
              <div className="flex flex-col bg-gray-200 dark:bg-slate-900 rounded-md mt-4">
                <div className="flex flex-row justify-evenly p-4">
                  <div>
                    <div className="flex flex-col items-center">
                      <p className="text-sm text-gray-600 dark:text-slate-400">
                        Format
                      </p>
                      <p className="font-bold">{anime.type}</p>
                    </div>
                  </div>
                  <div>
                    <div className="flex flex-col items-center">
                      <p className="text-sm text-gray-600 dark:text-slate-400">
                        Source
                      </p>
                      <p className="font-bold">{anime.source}</p>
                    </div>
                  </div>
                  <div>
                    <div className="flex flex-col items-center">
                      <p className="text-sm text-gray-600 dark:text-slate-400">
                        Episodes
                      </p>
                      <p className="font-bold">{anime.episodes}</p>
                    </div>
                  </div>
                  <div>
                    <div className="flex flex-col items-center">
                      <p className="text-sm text-gray-600 dark:text-slate-400">
                        Run time
                      </p>
                      <p className="font-bold">{anime.duration}</p>
                    </div>
                  </div>
                </div>
                {anime.trailer?.embed_url ? (
                  <div className="flex flex-col items-center">
                    <p className="text-2xl font-bold py-2">Trailer</p>
                    <iframe
                      className="w-full min-h-[325px] md:max-w-xl mx-auto aspect-ratio-16/9"
                      src={modifiedEmbedUrl}
                      allow="encrypted-media"
                      allowFullScreen
                    ></iframe>
                  </div>
                ) : (
                  <div className="flex justify-center items-center py-4">
                    <p className="px-1">No trailer found</p>{" "}
                    <Icon icon="noto-v1:disappointed-face" />
                  </div>
                )}
                <div className="p-4">
                  <p className="py-2 font-bold">Studio</p>
                  {anime.studios?.map((studio) => (
                    <Button key={studio.mal_id} className="rounded-lg" asChild>
                      <a
                        href={studio.url}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {studio.name}
                      </a>
                    </Button>
                  ))}
                </div>
                <div className="p-4">
                  <p className="py-2 font-bold">Tags</p>
                  {anime.genres?.map((genre) => (
                    <Button
                      key={genre.mal_id}
                      className="rounded-lg mr-2"
                      asChild
                    >
                      <a
                        href={genre.url}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {genre.name}
                      </a>
                    </Button>
                  ))}
                </div>
              </div>
            </div>
          </Container>
        </div>
      )}
    </div>
  );
};

export default AnimePage;
