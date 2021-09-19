import React, { Component } from "react";
import ReactGA from "react-ga";
import $ from "jquery";
import "./App.css";
import Header from "./Components/Header";
import Footer from "./Components/Footer";
import About from "./Components/About";
import Map from "./Components/Map";
import Portfolio from "./Components/Portfolio";
import DisplayedMap from "./Components/DisplayedMap";
import firebase from './firebase';
import Tindercard from "./Components/TinderCard";


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      foo: "bar",
      resumeData: {},
      colour: "",
    };
    this.setColour = this.setColour.bind(this);
    ReactGA.initialize("UA-110570651-1");
    ReactGA.pageview(window.location.pathname);
  }

  setColour(colour) {
    this.setState({ colour: colour });
    console.log("colour", colour);
  }

  getResumeData() {
    $.ajax({
      url: "./resumeData.json",
      dataType: "json",
      cache: false,
      success: function (data) {
        this.setState({ resumeData: data });
      }.bind(this),
      error: function (xhr, status, err) {
        console.log(err);
        alert(err);
      },
    });
  }

  componentDidMount() {
    this.getResumeData();
    
  }

  render() {
    return (
      <div className="App">
        <Header data={this.state.resumeData.main} />
        {/* <About data={this.state.resumeData.main} /> */}
        <Tindercard />
        {/* <Map data={this.state.resumeData.map} /> */}
        <DisplayedMap iconColor = "808080" />
        {/* <Map data={this.state.resumeData.map} /> */}

        <Portfolio data={this.state.resumeData.portfolio} />
        <Footer data={this.state.resumeData.main} />
      </div>
    );
  }
}

export default App;
