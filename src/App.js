import "./App.css";
import React, { Component } from "react";
import Navbar from "./Components/Navbar";
import News from "./Components/News";
import {
  BrowserRouter as Router,
  Route,
  Routes
} from "react-router-dom";
import LoadingBar from 'react-top-loading-bar';

export default class App extends Component {
  pageSize = 15;

  state = {
    progress: 0
  }

  setProgress = (progress)=> {
    this.setState({progress: progress})
  }

  render() {
    return (
      <>
      <Router>
        <div className="fw-light">
          <Navbar />
          <LoadingBar color='#f11946' height={3} progress={this.state.progress}/>
          <Routes>
            <Route exact path="/general" element={<News setProgress={this.setProgress}  key="general" pageSize={this.pageSize} country="in" category="general" />}/>
            <Route exact path="/" element={<News setProgress={this.setProgress}  key="home" pageSize={this.pageSize} country="in" category="general" />}/>
            <Route exact path="/business" element={<News setProgress={this.setProgress}  key="business" pageSize={this.pageSize} country="in" category="business" />}/>
            <Route exact path="/entertainment" element={<News setProgress={this.setProgress}  key="entertainment" pageSize={this.pageSize} country="in" category="entertainment" />}/>
            <Route exact path="/health" element={<News setProgress={this.setProgress}  key="health" pageSize={this.pageSize} country="in" category="health" />}/>
            <Route exact path="/science" element={<News setProgress={this.setProgress}  key="science" pageSize={this.pageSize} country="in" category="science" />}/>
            <Route exact path="/sports" element={<News setProgress={this.setProgress}  key="sports" pageSize={this.pageSize} country="in" category="sports" />}/>
            <Route exact path="/technology" element={<News setProgress={this.setProgress}  key="technology" pageSize={this.pageSize} country="in" category="technology" />}/>
          </Routes>
        </div>
      </Router>
      </>
    );
  }
}
