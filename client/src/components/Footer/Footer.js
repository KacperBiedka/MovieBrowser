import React from "react";
import classes from "./Footer.module.sass";

const Footer = () => {
  return (
    <div className={classes.mainFooterDiv}>
      <a
        rel="noopener noreferrer"
        target="_blank"
        href="https://www.themoviedb.org/documentation/api/terms-of-use/"
        className={classes.footerDescribtion}
      >
        This product uses the TMDb API but is not endorsed or certified by TMDb.
      </a>
      <div className={classes.logoContainer}>
        <img
          className={classes.logo}
          alt=""
          src="https://www.themoviedb.org/assets/2/v4/logos/powered-by-rectangle-green-dcada16968ed648d5eb3b36bbcfdd8cdf804f723dcca775c8f2bf4cea025aad6.svg"
        />
      </div>
    </div>
  );
};

export default Footer;
