import React from "react";
import { Fade } from "react-reveal";
import classes from "./LoadingScreen.module.sass";

const LoadingScreen = props => {
  return (
    <Fade when={props.visible}>
      <div
        className={classes.mainLoadingDiv}
        style={{ display: props.display }}
      >
        <div className={classes.loadingContainer}>
          <div className={classes.loadingDiv} />
        </div>
      </div>
    </Fade>
  );
};

export default LoadingScreen;
