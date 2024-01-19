import React from "react";
import styles from "./featured.module.css";
import Image from "next/image";

const Featured = () => {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>
        <b>Hey, dev here!</b> Discover my stories and creative ideas.
      </h1>
      <div className={styles.post}>
        <div className={styles.imgContainer}>
          <Image src="/p1.jpeg" alt="" fill className={styles.image} />
        </div>
        <div className={styles.textContainer}>
          <h1 className={styles.postTitle}>JourneyPages: Unveiling a Tapestry of Knowledge and Inspiration on Our Blog Project Home</h1>
          <p className={styles.postDesc}>
          Welcome to our blogosphere, where words come to life! Dive into a world of captivating stories, insightful articles, and thought-provoking discussions right on our homepage, where curiosity meets creativity
          </p>
          <button className={styles.button}>Read More</button>
        </div>
      </div>
    </div>
  );
};

export default Featured;
