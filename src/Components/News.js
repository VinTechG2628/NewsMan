import React, { useEffect, useState } from "react";
import NewsItems from "./NewsItems";
import Spinner from "./Spinner";
import PropTypes from "prop-types";
import InfiniteScroll from "react-infinite-scroll-component";

const News = (props) => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);

  const capitalize = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  const updateNews = async () => {
    props.setProgress(10);
    const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page}&pageSize=${props.pageSize}`;
    setLoading(true);
    let data = await fetch(url);
    props.setProgress(30);
    let parsedData = await data.json();
    props.setProgress(70);
    setArticles(parsedData.articles);
    setTotalResults(parsedData.totalResults);
    setLoading(false);
    props.setProgress(100);
  };

  useEffect(() => {
    document.title = `${capitalize(props.category)} - National Newsline | Online News Capsule | For everyone, Of any field!`;
    updateNews();
  }, []);

  const fetchMoreData = async () => {
    const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page+1}&pageSize=${props.pageSize}`;
    setPage(page + 1 );
    let data = await fetch(url);
    let parsedData = await data.json();
    setArticles(articles.concat(parsedData.articles));
    setTotalResults(parsedData.totalResults);
  };

  return (
    <>
      <div className="m-5">
        <div className="lh-sm my-5 text-center">
          <div className="my-5">
            <h1 className="head" style={{marginTop: '5rem'}}>
              <span className="text-danger">N</span>ational{" "}
              <span className="text-danger">N</span>
              <span className="text-primary">ewsline</span>
            </h1>
            <h3 className=" fs">
              Top{" "}
              <span className="text-success">
                {capitalize(props.category)}
              </span>{" "}
              Headlines
            </h3>
          </div>
        </div>
        {loading && <Spinner />}
        <InfiniteScroll
          dataLength={articles.length}
          next={fetchMoreData}
          hasMore={articles.length !== totalResults}
          loader={<Spinner />}
        >
          <div className="container">
            <div className="row my-2">
              {!loading && articles.map((element) => {
                  return (
                    <div className="col-md-4" key={element.url}>
                      <NewsItems
                        title={element.title ? element.title.slice(0, 45) : ""}
                        description={
                          element.description
                            ? element.description.slice(0, 100)
                            : ""
                        }
                        newsUrl={element.url}
                        imageUrl={element.urlToImage}
                        author={element.author ? element.author : "(Unknown)"}
                        date={element.publishedAt ? element.publishedAt : "..."}
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
};

export default News;

News.defaultProps = {
  country: "in",
  pageSize: "15",
  category:
    "National Newsline - Online News Capsule | For anyone, for any field",
};

News.propsTypes = {
  country: PropTypes.string,
  pageSize: PropTypes.number,
  category: PropTypes.string,
};
