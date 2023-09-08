import React, { Component } from "react";

export default class Spinner extends Component {
  render() {
    return (
      <>
      <div className="container text-center p-5">
        <button className="btn btn-md btn-secondary p-2" type="button" disabled>
            <span className="spinner-border spinner-border-sm mx-2" aria-hidden="true"></span>
            <span role="status">Loading...</span>
        </button>
      </div>
      </>
    );
  }
}
