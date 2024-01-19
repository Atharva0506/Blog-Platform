"use client";
import Link from "next/link";
import Logo from "./logo";
import { GithubIcon, LinkedinIcon, MoonIcon, SunIcon } from "../Icons";
import siteMetadata from "@/utils/siteMetaData";
import { useThemeSwitch } from "@/hooks/useThemeSwitch";
import { useState, useEffect } from "react";
import { cx } from "@/utils";
import { Avatar, Menu, MenuItem, Tooltip, IconButton } from "@mui/material";
import { UserAuth } from "@/context/Auth";
function Navbar() {
  const [mode, setMode] = useThemeSwitch();
  const [click, setClick] = useState(false);
  const { user, logOut } = UserAuth();
  const [loading, setLoading] = useState(true);
  const [anchorEl, setAnchorEl] = useState(null);

  const toggle = () => {
    setClick(!click);
  };
  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };
  const handleSignOut = async () => {
    try {
      await logOut();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const checkAuthentication = async () => {
      await new Promise((resolve) => setTimeout(resolve, 50));
      setLoading(false);
    };

    checkAuthentication();
  }, [user]);
  return (
    <header className="w-full p-4  px-5 sm:px-10 flex items-center justify-between">
      <Logo />

      <button
        className="inline-block sm:hidden z-50"
        onClick={toggle}
        aria-label="Hamburger Menu"
      >
        <div className="w-6 cursor-pointer transition-all ease duration-300">
          <div className="relative">
            <span
              className="absolute top-0 inline-block w-full h-0.5 bg-dark dark:bg-light rounded transition-all ease duration-200"
              style={{
                transform: click
                  ? "rotate(-45deg) translateY(0)"
                  : "rotate(0deg) translateY(6px)",
              }}
            >
              &nbsp;
            </span>
            <span
              className="absolute top-0 inline-block w-full h-0.5 bg-dark dark:bg-light rounded transition-all ease duration-200"
              style={{
                opacity: click ? 0 : 1,
              }}
            >
              &nbsp;
            </span>
            <span
              className="absolute top-0 inline-block w-full h-0.5 bg-dark dark:bg-light rounded transition-all ease duration-200"
              style={{
                transform: click
                  ? "rotate(45deg) translateY(0)"
                  : "rotate(0deg) translateY(-6px)",
              }}
            >
              &nbsp;
            </span>
          </div>
        </div>
      </button>

      <nav
        className=" w-max py-3 px-6 sm:px-8 border border-solid border-dark rounded-full font-medium capitalize  items-center flex  sm:hidden
    fixed top-6 right-1/2 translate-x-1/2 bg-light/80 backdrop-blur-sm z-50
    transition-all ease duration-300
    "
        style={{
          top: click ? "1rem" : "-5rem",
        }}
      >
        <Link href="/" className="mr-2">
          Home
        </Link>
        <Link href="/about" className="mx-2">
          About
        </Link>
        <button
          onClick={() => setMode(mode === "light" ? "dark" : "light")}
          className={cx(
            "w-6 h-6 ease ml-2 flex items-center justify-center rounded-full p-1",
            mode === "light" ? "bg-dark text-light" : "bg-light text-dark"
          )}
          aria-label="theme-switcher"
        >
          {mode === "light" ? (
            <MoonIcon className={"fill-dark"} />
          ) : (
            <SunIcon className={"fill-dark"} />
          )}
        </button>
      </nav>

      <nav
        className=" w-max py-3 px-8 border border-solid border-dark rounded-full font-medium capitalize  items-center hidden sm:flex
    fixed top-6 right-1/2 translate-x-1/2 bg-light/80 backdrop-blur-sm z-50"
      >
        <Link href="/" className="mr-2">
          Home
        </Link>
        <Link href="/about" className="mx-2">
          About
        </Link>
        <button
          onClick={() => setMode(mode === "light" ? "dark" : "light")}
          className={cx(
            "w-6 h-6 ease ml-2 flex items-center justify-center rounded-full p-1",
            mode === "light" ? "bg-dark text-light" : "bg-light text-dark"
          )}
          aria-label="theme-switcher"
        >
          {mode === "light" ? (
            <MoonIcon className={"fill-dark"} />
          ) : (
            <SunIcon className={"fill-dark"} />
          )}
        </button>
      </nav>
      <div className=" sm:flex items-center">
        {loading ? null : !user ? (
          <ul className="flex">
            <li className="p-2 cursor-pointer">
              <Link href="/sign-up">Sign Up</Link>
            </li>
          </ul>
        ) : (
          <div className="flex items-center">
            {user.photoURL ? (
              <Tooltip title={user.displayName}>
                <IconButton onClick={handleMenuOpen}>
                  <Avatar alt={user.displayName} src={user.photoURL} />
                </IconButton>
              </Tooltip>
            ) : null}
            <Menu
              id="user-menu"
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleMenuClose}
              MenuListProps={{
                "aria-labelledby": "user-menu-button",
              }}
            >
              <MenuItem onClick={handleSignOut}>Sign out</MenuItem>
            </Menu>
          </div>
        )}
      </div>
    </header>
  );
}

export default Navbar;
