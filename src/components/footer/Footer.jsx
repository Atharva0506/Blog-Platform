import React from "react";
import styles from "./footer.module.css";
import Image from "next/image";
import Link from "next/link";

const Footer = () => {
  return (
    <div className={styles.container}>
      <div className={styles.info}>
        <div className={styles.logo}>
          <Image src="/logo.png" alt="lama blog" width={50} height={50} />
          <h1 className={styles.logoText}>blog</h1>
        </div>
        <p className={styles.desc}>
        Explore a tapestry of knowledge and inspiration on our blog projects home page. From travel tales to tech trends, our diverse collection of posts invites you to embark on a journey of discovery, one click at a time.
        </p>
      </div>
      <div className={styles.links}>
        <div className={styles.list}>
          <span className={styles.listTitle}>Links</span>
          <Link href="/">Homepage</Link>
          <Link href="/">Blog</Link>
        </div>
        <div className={styles.list}>
          <span className={styles.listTitle}>Tags</span>
          <Link href="/">Style</Link>
          <Link href="/">Fashion</Link>
          <Link href="/">Coding</Link>
          <Link href="/">Travel</Link>
        </div>
        <div className={styles.list}>
          <span className={styles.listTitle}>Social</span>
          <Link href="https://github.com/Atharva0506/Blog-Platform/">Github</Link>
          <Link href="https://www.linkedin.com/in/atharva-naik-527b74255/">Linkidn</Link>
        </div>
      </div>
    </div>
  );
};

export default Footer;
