import React, { Component } from "react";
import NewsItems from "./NewsItems";
import Spinner from "./Spinner";
import PropTypes from "prop-types";
import InfiniteScroll from "react-infinite-scroll-component";

export default class News extends Component {
  static defaultProps = {
    country: "in",
    pageSize: "15",
    category:
      "National Newsline - Online News Capsule | For anyone, for any field",
  };

  static propsTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string,
  };

  capitalize = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  constructor(props) {
    super(props);
    this.state = {
      articles: [],
      loading: true,
      page: 1,
      totalResults: 0,
    };
    document.title = `${this.capitalize(
      this.props.category
    )} - National Newsline | Online News Capsule | For anyone, for any field`;
  }

  async updateNews() {
    this.props.setProgress(10);
    const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=ce4296d3bfc845c18aa5b5438df799ef&page=${this.state.page}&pageSize=${this.props.pageSize}`;
    let data = await fetch(url);
    this.props.setProgress(30);
    let parsedData = await data.json();
    this.props.setProgress(70);
    this.setState({
      articles: parsedData.articles,
      totalResults: parsedData.totalResults,
      loading: false,
    });
    this.props.setProgress(100);
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

  fetchMoreData = async () => {
    this.setState({ page: this.state.page + 1 });
    const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=ce4296d3bfc845c18aa5b5438df799ef&page=${this.state.page}&pageSize=${this.props.pageSize}`;
    let data = await fetch(url);
    let parsedData = await data.json();
    this.setState({
      articles: this.state.articles.concat(parsedData.articles),
      totalResults: parsedData.totalResults,
    });
  };

  render() {
    return (
      <>
        <div className="m-5">
          <div className="lh-sm my-5 text-center">
            <div className="my-5">
              <h1 className="head">
                <span className="text-danger">N</span>ational{" "}
                <span className="text-danger">N</span>
                <span className="text-primary">ewsline</span>
              </h1>
              <h3 className="my-2 fs">
                Top{" "}
                <span className="text-success">
                  {this.capitalize(this.props.category)}
                </span>{" "}
                Headlines
              </h3>
            </div>
          </div>
          {/* {this.state.loading && <Spinner />} */}
          <InfiniteScroll
            dataLength={this.state.articles.length}
            next={this.fetchMoreData}
            hasMore={this.state.articles.length !== this.state.totalResults}
            loader={<Spinner />}
          >
            <div className="container">
              <div className="row my-5">
                {!this.state.loading &&
                  this.state.articles.map((element) => {
                    return (
                      <div className="col-md-4" key={element.url}>
                        <NewsItems
                          title={
                            element.title ? element.title.slice(0, 45) : ""
                          }
                          description={
                            element.description
                              ? element.description.slice(0, 100)
                              : ""
                          }
                          newsUrl={element.url}
                          imageUrl={element.urlToImage}
                          author={element.author ? element.author : "(Unknown)"}
                          date={
                            element.publishedAt ? element.publishedAt : "..."
                          }
                          source={
                            element.source.name ? element.source.name : "..."
                          }
                        />
                      </div>
                    );
                  })}
              </div>
            </div>
          </InfiniteScroll>
        </div>
      </>
    );
  }
}
