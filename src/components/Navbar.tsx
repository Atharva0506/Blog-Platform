"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { UserAuth } from "@/context/Auth";
import { Avatar, Menu, MenuItem, Tooltip, IconButton } from "@mui/material";

function Navbar() {
  const { user, logOut } = UserAuth();
  const [loading, setLoading] = useState(true);
  const [anchorEl, setAnchorEl] = useState(null);

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
    <div className="h-20 w-full border-b-2 flex items-center justify-between p-2">
      <ul className="flex">
        <li className="p-2 cursor-pointer">
          <Link href="/">Home</Link>
        </li>
        <li className="p-2 cursor-pointer">
          <Link href="/about">About</Link>
        </li>
        {!user ? null : (
          <li className="p-2 cursor-pointer">
            <Link href="/profile">Profile</Link>
          </li>
        )}
      </ul>

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
  );
}

export default Navbar;
