import React, { Component } from "react";

export default class NewsItems extends Component {

  render() {
    let {title, description, imageUrl, newsUrl} = this.props;
    return (
      <>
        <div className="container my-3">
            <div className="card" style={{width: '18rem'}}>
                <img src={!imageUrl?"https://media.cnn.com/api/v1/images/stellar/prod/230906120920-03-donald-trump-082423.jpg?c=16x9&q=w_800,c_fill":imageUrl} className="card-img-top" alt=""/>
                <div className="card-body">
                    <h5 className="card-title">{title}..</h5>
                    <p className="card-text">{description}..</p>
                    <a href={newsUrl} target="_blank" rel="noreferrer" className="btn btn-sm btn-dark">Read More</a>
                </div>
            </div>
        </div>
      </>
    );
  }
}
