import { Icon } from "@iconify/react";
import { useState } from "react";
import { ModeToggle } from "./utility/mode-toggle";
import { Link } from "react-router-dom";
import { Button } from "./ui/button";
import { RootState } from "./utility/store";
import { userType } from "@/vite-env";
import { useDispatch, useSelector } from "react-redux";
import { setUserData } from "./utility/userDataSlice";
import AnimeSearchSheet from "./AnimeSearchSheet";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

export const NavBar = () => {
  const [nav, setNav] = useState(false);
  const dispatch = useDispatch();
  const userData = useSelector(
    (state: RootState) => state.userData as userType | null
  );
  const isLoggedIn = userData && Object.keys(userData).length > 0;

  const logout = () => {
    localStorage.removeItem("token");
    dispatch(setUserData(null));
  };

  const links = [
    {
      id: 1,
      link: "home",
      href: "/",
    },
  ];

  return (
    <div className="flex justify-between items-center w-full h-20 fixed px-4 z-20 bg-gray-50 dark:bg-slate-950 text-slate-900 dark:text-white">
      <div className="flex">
        <Link to="/">
          <h1 className="font-pacifico text-4xl ml-2">Anime Tracker</h1>
        </Link>

        <ul className="hidden ml-4 md:flex md:items-center">
          {links.map(({ id, link, href }) => (
            <li
              key={id}
              className="px-4 cursor-pointer capitalize font-medium text-slate-900 dark:text-white hover:scale-105 duration-200"
            >
              <Link to={href}>{link}</Link>
            </li>
          ))}
          <li className="px-4 cursor-pointer capitalize font-medium text-slate-900 dark:text-white hover:scale-105 duration-200">
            <AnimeSearchSheet />
          </li>
        </ul>
      </div>
      <div className="hidden md:flex md:items-center">
        <Popover>
          <PopoverTrigger>
            <Icon
              className="text-5xl mr-4"
              icon="material-symbols:account-circle"
            />
          </PopoverTrigger>
          <PopoverContent className="flex justify-evenly">
            {isLoggedIn ? (
              <>
                <Button className="" asChild>
                  <Link to="/library">
                    <p className="">Library</p>
                  </Link>
                </Button>
                <Button className="" onClick={logout} asChild>
                  <Link to="/login">Log out</Link>
                </Button>
                <ModeToggle />
              </>
            ) : (
              <>
                <Button className="" asChild>
                  <Link to="/login">Log in</Link>
                </Button>
                <Button className="" asChild>
                  <Link to="/register">Register</Link>
                </Button>
                <ModeToggle />
              </>
            )}
          </PopoverContent>
        </Popover>
      </div>
      <div
        onClick={() => setNav(!nav)}
        className="cursor-pointer pr-4 z-10 text-gray-500 md:hidden"
      >
        {nav ? (
          <Icon className="text-3xl" icon="material-symbols:cancel-outline" />
        ) : (
          <Icon icon="lucide:align-justify" className="text-3xl" />
        )}
      </div>

      {nav && (
        <ul className="flex flex-col justify-center items-center absolute top-0 left-0 w-full h-screen bg-gradient-to-b from-gray-50 to-gray-300 dark:from-slate-950 dark:to-slate-800 text-slate-900 dark:text-white z-11">
          <ModeToggle />
          {links.map(({ id, link, href }) => (
            <li
              key={id}
              className="px-4 cursor-pointer capitalize py-6 text-4xl"
            >
              <Link to={href} onClick={() => setNav(false)}>
                {link}
              </Link>
            </li>
          ))}

          {isLoggedIn ? (
            <>
              <Button className="mb-4" asChild>
                <Link to="/library">
                  <p className="">Library</p>
                </Link>
              </Button>
              <Button className="" onClick={logout} asChild>
                <Link to="/login">Log out</Link>
              </Button>
            </>
          ) : (
            <>
              <Button className="" asChild>
                <Link to="/login">Log in</Link>
              </Button>
            </>
          )}
        </ul>
      )}
    </div>
  );
};
