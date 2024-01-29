import { NavBar } from "../NavBar"
import Schedule from "../Schedule"


const Home = () => {
  return (
    <div>
        <NavBar />
        <div className="pt-20">
        <Schedule />
        </div>
    </div>
  )
}

export default Home