import React,  { Component } from "react";
import News from "../news/news.js";
import "../news/news.css";

class App extends Component {
  render() {
    return (
      <div style={{position: 'absolute'}}>
        <div id="loader" className="animated infinite tada delay-2s">
          <img src="/images/welcome.png" alt="" />
        </div>
        <News/>
      </div>
    );
  }
}
    
export default App;