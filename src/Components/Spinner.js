import React, { Component } from "react";
import loaded from "../img/spinner.gif";

export default class Spinner extends Component {
  render() {
    return (
      <>
      <div className="text-center">
        <img src={loaded} alt="loading" className="my-3" style={{width: '2.5rem'}}/>
      </div>
      </>
    );
  }
}
