import { userType } from "@/vite-env"
import { NavBar } from "../NavBar"
import { RootState } from "../utility/store"
import { useSelector } from "react-redux"
import LibraryAnimeCard from "../LibraryAnimeCard"

const Library = () => {
    const userData = useSelector((state: RootState) => state.userData as userType | null)

  return (
    <div>
        <NavBar />
        <div className="pt-20 px-4">
            <p className="py-10 text-4xl capitalize">{userData?.username}'s Saved Anime</p>
            <div className="flex flex-wrap gap-4 w-full">
            {userData?.animeList?.map((anime) => (
                <LibraryAnimeCard key={anime.mal_id} anime={anime}/>
            ))}
            </div>
        </div>
    </div>
  )
}

export default Library