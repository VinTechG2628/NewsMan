import React, { Component } from "react";
import { Link } from 'react-router-dom'

export default class NewsItems extends Component {

  render() {
    let {title, description, imageUrl, newsUrl} = this.props;
    return (
      <>
        <div className="my-3 fs-6">
            <div className="card">
                <img src={!imageUrl?"https://gaadiwaadi.com/wp-content/uploads/2023/06/2023-Honda-Rebel-300.jpg":imageUrl} className="card-img-top" alt=""/>
                <div className="card-body">
                    <h5 className="card-title fw-normal">{title}...</h5>
                    <p className="card-text">{description}...</p>
                    <Link to={newsUrl} target="_blank" rel="noreferrer" className="btn btn-sm btn-dark fw-light">Read More</Link>
                </div>
            </div>
        </div>
      </>
    );
  }
}
