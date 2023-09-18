import React, { Component } from "react";
import { Link } from 'react-router-dom'

export default class NewsItems extends Component {

  render() {
    let {title, description, imageUrl, newsUrl, author, date, source} = this.props;
    return (
      <>
        <div className="m-4 fs-6">
            <div className="card">
              <div style={{display: 'flex', justifyContent: 'center', position: 'absolute', right: '0'}}>
                <span className="badge rounded-0 rounded-bottom-0 rounded-end-1 bg-danger z-3 p-2">{source}</span>
              </div>
                <img src={imageUrl} className="card-img-top" alt="..."/>
                <div className="card-body">
                    <h5 className="card-title fw-semibold">{title}...</h5>
                    <p className="card-text">{description}...</p>
                    <p className="card-text para fw-semibold">By {author} <br /> On {new Date(date).toGMTString()}</p>
                    <div className="card-text d-flex align-items-center justify-content-between">
                      <Link to={newsUrl} target="_blank" rel="noreferrer" className="btn btn-sm btn-dark fw-light para">Read More</Link>
                      <p className="card-text fs-6 fw-light text-secondary">3min ago</p>
                    </div>
                </div>
            </div>
        </div>
      </>
    );
  }
}
