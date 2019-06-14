import React, { Component } from "react";
import { Fade, Zoom, Slide } from "react-reveal";
import classes from "./LoadingScreen.module.sass";

class LoadingScreen extends Component {
  render() {
    return (
      <Fade when={this.props.visible}>
        <div className={classes.mainLoadingDiv}>
          <div className={classes.skCubeGrid}>
            <div className={classes.skCube + " " + classes.skCube1} />
            <div className={classes.skCube + " " + classes.skCube2} />
            <div className={classes.skCube + " " + classes.skCube3} />
            <div className={classes.skCube + " " + classes.skCube4} />
            <div className={classes.skCube + " " + classes.skCube5} />
            <div className={classes.skCube + " " + classes.skCube6} />
            <div className={classes.skCube + " " + classes.skCube7} />
            <div className={classes.skCube + " " + classes.skCube8} />
            <div className={classes.skCube + " " + classes.skCube9} />
          </div>
        </div>
      </Fade>
    );
  }
}

export default LoadingScreen;
