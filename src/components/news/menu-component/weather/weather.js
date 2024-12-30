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
          weather?.list.map((weather,i) => {
            let weather_icon = weather.weather[0].main.toUpperCase()
       
            if(weather_icon === "CLOUDS")
              weather_icon = weather_icon.replace("CLOUDS", "CLOUDY");
            if(weather_icon === "CLEAR") {
              const currentHour = moment.tz(weather.dt, 'X', 'Asia/Tokyo').locale('ja').format("H")
              if ( currentHour < 18 )
                weather_icon = weather_icon.replace("CLEAR", "CLEAR_DAY");
              else
                weather_icon = weather_icon.replace("CLEAR", "CLEAR_NIGHT");
            }
            return (
              <div key={i}
                data-aos="fade-up"
                data-aos-delay="50"
                data-aos-duration="1000"
                data-aos-mirror="true"
                className={ i % 2 === 0 ? 'weather-box' : 'weather-box down'} >

                <div className="weather-i">
                  <ReactAnimatedWeather
                    icon={weather_icon}
                    color={'white'}
                    size= {80}
                    animate= {true}
                  />
                  <div>
                   {weather.weather[0].main.toUpperCase()}
                  </div>
                </div>
                <div className="weather-date">
                  {moment.tz(weather.dt, 'X', 'Asia/Tokyo').locale('ja').format("MMM Do ha z")}
                </div>
                <div className="weather-summary">{weather.weather.description}</div>
                <div className="weather-temp"> 
                  <div>高温: {weather.main.temp_max}°C</div>
                  <div>低温: {weather.main.temp_min}°C</div>
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