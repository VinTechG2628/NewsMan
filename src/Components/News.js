import React, { Component } from "react";
import NewsItems from "./NewsItems";

export default class News extends Component {
  constructor() {
    super();
    this.state = {
      articles: [],
      loading: false,
      page: 1,
    };
  }

  async componentDidMount() {
    let url =
      "https://newsapi.org/v2/everything?q=tesla&from=2023-08-08&sortBy=publishedAt&apiKey=21c383857cf74a4e939e85289499fef4&pageSize=20";
    let data = await fetch(url);
    let parsedData = await data.json();
    console.log(parsedData);
    this.setState({
      articles: parsedData.articles,
      totalResults: parsedData.totalResults,
    });
  }

  handlePreviousClick = async () => {
    console.log("P");

    let url = `https://newsapi.org/v2/everything?q=tesla&from=2023-08-08&sortBy=publishedAt&apiKey=21c383857cf74a4e939e85289499fef4&page=${
      this.state.page - 1
    }&pageSize=20`;
    let data = await fetch(url);
    let parsedData = await data.json();
    console.log(parsedData);
    this.setState({
      page: this.state.page - 1,
      articles: parsedData.articles,
    });
  };

  handleNextClick = async () => {
    console.log("N");

    if (this.state.page + 1 > Math.ceil(this.state.totalResults / 20)) {

    }
    else {
      let url = `https://newsapi.org/v2/everything?q=tesla&from=2023-08-08&sortBy=publishedAt&apiKey=21c383857cf74a4e939e85289499fef4&page=${
        this.state.page + 1
      }&pageSize=20`;
      let data = await fetch(url);
      let parsedData = await data.json();
      console.log(parsedData);
      this.setState({
        page: this.state.page + 1,
        articles: parsedData.articles,
      });
    }
  };

  render() {
    return (
      <>
        <div className="container my-5">
          <h1 className="m-3">Newsman Headlines</h1>
          <div className="row my-5">
            {this.state.articles.map((element) => {
              return (
                <div className="col-md-3" key={element.url}>
                  <NewsItems
                    title={element.title ? element.title.slice(0, 45) : ""}
                    description={
                      element.description
                        ? element.description.slice(0, 85)
                        : ""
                    }
                    newsUrl={element.url}
                    imageUrl={element.urlToImage}
                  />
                </div>
              );
            })}
          </div>
          <div className="container d-flex justify-content-between">
            <button
              disabled={this.state.page <= 1}
              type="button"
              className="btn btn-sm btn-dark"
              onClick={this.handlePreviousClick}
            >
              &larr; Previous
            </button>
            <button
              type="button"
              className="btn btn-sm btn-dark"
              onClick={this.handleNextClick}
            >
              Next &rarr;
            </button>
          </div>
        </div>
      </>
    );
  }
}
