import { Icon } from "@iconify/react";
import { useState } from "react";
import { ModeToggle } from "./utility/mode-toggle";
import { Link } from "react-router-dom";
import { Button } from "./ui/button";
import { RootState } from "./utility/store";
import { userType } from "@/vite-env";
import { useSelector } from "react-redux";

export const NavBar = () => {
  const [nav, setNav] = useState(false);
  const userData = useSelector((state: RootState) => state.userData as userType | null)
  const isLoggedIn = userData && Object.keys(userData).length > 0;

  const links = [
    {
      id: 1,
      link: "home",
      href: "/",
    },
    {
      id: 2,
      link: "Browse",
      href: "/browse",
    },
    {
      id: 3,
      link: "Schedule",
      href: "/schedule",
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
        </ul>
      </div>
      <div className="hidden md:flex md:items-center">
      {isLoggedIn ? (
          <>
            <Link to='/library' className="mr-4">
              <p>Library</p>
            </Link>
            <ModeToggle />
          </>
        ) : (
          <>
            <Button className="mr-4" asChild>
              <Link to='/login'>Log in</Link>
            </Button>
            <ModeToggle />
          </>
        )}

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
          <Button className="mt-4" asChild>
            <a href="/login">Log In</a>
          </Button>
        </ul>
      )}
    </div>
  );
};
