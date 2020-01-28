import "./App.scss";
import Table from "./Table";
import JData from "./data";
import React, { Component } from "react";
import Home from "./Home";



class App extends Component {
  state = {};

  render() {
    return (
      <div className="container">

        <Home />
        <Table {...JData} />
      </div>
    );
  }


}

export default App;
