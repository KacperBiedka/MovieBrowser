import React, { Component } from "react";
import { connect } from "react-redux";
import { NavLink } from "react-router-dom";
import * as actionTypes from "../../store/actionTypes";
import classes from "./Navbar.module.sass";

class Navbar extends Component {
  state = {
    searchValue: ""
  };

  changeInputState = e => {
    this.setState({
      searchValue: e.target.value
    });
    console.log(e.target.value);
  };

  submitSearchValue = () => {
    this.props.getSearchValue(this.state.searchValue);
  };

  render() {
    return (
      <div className={classes.mainNavDiv}>
        <div className={classes.inputDiv}>
          <input
            className={classes.searchInput}
            placeholder="search"
            type="text"
            onChange={this.changeInputState}
            value={this.state.searchValue}
          />
          <div className={classes.searchIconDiv}>
            <NavLink style={{ textDecoration: "none" }} to="/search">
              <i
                onClick={this.submitSearchValue}
                className={"material-icons " + classes.searchIcon}
              >
                search
              </i>
            </NavLink>
          </div>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getSearchValue: search => dispatch(actionTypes.getSearchValue(search))
  };
};

export default connect(
  null,
  mapDispatchToProps
)(Navbar);
