import React from "react";
import styles from "./navbar.module.css";
import Link from "next/link";
import AuthLinks from "@/components/authLinks/AuthLinks";
import ThemeToggle from "@/components/themeToggle/ThemeToggle";

const Navbar = () => {
  return (
    <div className={styles.container}>
    <div className={styles.logo}>Blog</div>
    <div className={styles.links}>
      <ThemeToggle />
      <Link href="/" className={styles.link}>Home</Link>
      <Link href="https://github.com/Atharva0506/Blog-Platform/" className={styles.link}>About</Link>
      <AuthLinks />
    </div>
  </div>
  )
}

export default Navbar;