import React,  { Component } from "react";
import ReactAnimatedWeather from 'react-animated-weather';
import moment from "moment-timezone";
import 'moment/locale/ja';

import "./weather.css";

export default class Weather extends Component {

  render = () => {
    const { weather, pending, error } = this.props;
    
    return(
      <div id="天気" className="weather-container">
        <h2 className="weather-title">東京の天気</h2>
        { error && <img alt="error" className="error" src="images/error.png" /> }
        { pending && <img alt="pending" className="pending" src="images/loader.gif" /> }

        <div className="weather-list">
        {!pending && !error && weather &&
          weather.daily.data.map((weather,i) => {
            return (
              <div key={i}
                data-aos="fade-up"
                data-aos-delay="50"
                data-aos-duration="1000"
                data-aos-mirror="true"
                className={ i % 2 === 0 ? 'weather-box' : 'weather-box down'} >

                <ReactAnimatedWeather
                  icon={weather.icon.replace(/-/g, '_').toUpperCase()}
                  color={'white'}
                  size= {80}
                  animate= {true}
                />

                <div className="weather-date">
                  {moment.tz(weather.time, 'X', 'Asia/Tokyo').locale('ja').format("MMM Do")}
                </div>
                <div className="weather-summary">{weather.summary}</div>
                <div className="weather-temp"> 
                  <div>高温: {weather.temperatureHigh}°C</div>
                  <div>低温: {weather.temperatureLow}°C</div>
                </div>
             </div>
            )
          }).filter(function (e, i) {
              return  i !== 7;
            })
        }
        </div> 
      </div>
    )
  }
}