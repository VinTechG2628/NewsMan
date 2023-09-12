import React, { Component } from "react";
import NewsItems from "./NewsItems";
import Spinner from "./Spinner";
import PropTypes from "prop-types";

export default class News extends Component {
  static defaultProps = {
    country: "in",
    pageSize: "15",
    category: "general",
  };

  static propsTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string,
  };

  constructor() {
    super();
    this.state = {
      articles: [],
      loading: false,
      page: 1,
    };
  }

  async updateNews() {
    const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=21c383857cf74a4e939e85289499fef4&page=${this.state.page}&pageSize=${this.props.pageSize}`;
    this.setState({ loading: true });
    let data = await fetch(url);
    let parsedData = await data.json();
    this.setState({
      articles: parsedData.articles,
      totalResults: parsedData.totalResults,
      loading: false,
    });
  }

  async componentDidMount() {
    this.updateNews();
  }

  handlePreviousClick = async () => {
    this.setState({ page: this.state.page - 1 });
    this.updateNews();
  };

  handleNextClick = async () => {
    this.setState({ page: this.state.page + 1 });
    this.updateNews();
  };

  render() {
    return (
      <>
        <div className="container my-5">
          <div className="lh-sm my-5 text-center">
            <h1 className="head my-5">
              <span className="text-danger">N</span>ational{" "}
              <span className="text-danger">N</span>
              <span className="text-primary">ewsline</span>
            </h1>
          </div>
          {this.state.loading && <Spinner />}
          <div className="row my-5">
            {!this.state.loading &&
              this.state.articles.map((element) => {
                return (
                  <div className="col-md-4" key={element.url}>
                    <NewsItems
                      title={element.title ? element.title.slice(0, 45) : ""}
                      description={
                        element.description
                          ? element.description.slice(0, 85)
                          : ""
                      }
                      newsUrl={element.url}
                      imageUrl={element.urlToImage}
                      author={element.author ? element.author : "(Unknown)"}
                      date={element.publishedAt ? element.publishedAt : "..."}
                      source={element.source.name ? element.source.name : "..."}
                    />
                  </div>
                );
              })}
          </div>
          <div className="container d-flex justify-content-between">
            <button
              disabled={this.state.page <= 1}
              type="button"
              className="btn btn-sm btn-dark fw-light"
              onClick={this.handlePreviousClick}
            >
              &larr; Previous
            </button>
            <button
              type="button"
              className="btn btn-sm btn-dark fw-light"
              onClick={this.handleNextClick}
              disabled={
                this.state.page + 1 >
                Math.ceil(this.state.totalResults / this.props.pageSize)
              }
            >
              Next &rarr;
            </button>
          </div>
        </div>
      </>
    );
  }
}
