import React,  { Component } from "react";
import { connect } from "react-redux";
import { func } from "prop-types";
import { Link } from "react-scroll";
import LazyLoad from "react-lazyload";

import { getWeather, getShopNews, getCMSNews } from "../../actions";
import Weather from "./menu-component/weather/weather";
import MapNews from "./menu-component/map/map";
import ShopNews from "./menu-component/shop-news/shop-news";
import CMSNews from "./menu-component/cms-news/cms-news";

import "./news.css";

class News extends Component {

  constructor(props) {
    super(props);

    this.state = {
      active : '00',
      menu : ['天気', '地図', 'ショプニュース', 'ニュース']
    }
  }

  UNSAFE_componentWillMount = () => {
    const { fetchWeather, fetchShopNews, fetchCMSNews} = this.props;
    fetchWeather();
    fetchShopNews();
    fetchCMSNews();
  }

  componentDidMount = () => {
    setTimeout(function() {
      let loader = document.querySelector('#loader');
      let newsComponent = document.querySelector('.news-component');
      if(newsComponent){
        loader.classList.add('fade-out');
        newsComponent.classList.add('fade-in');
      }
    }, 5000); 
  }

  componentDidUpdate = () => {
    let video = document.querySelector("#video");
    if (video) {
      video.addEventListener("playing", function() {
          document.querySelector('.video').style.opacity = 0;
      });
    }
  }

  setActive = i =>{
    this.setState({active: i});
    let menu
    switch(i) {
    case 0:
      menu = document.querySelector('.weather-title');
      menu.classList.add('menu-active');
      menu.classList.remove('menu-inactive');
      break;
    case 1:
      menu = document.querySelector('.map-title');
      menu.classList.add('menu-active');
      menu.classList.remove('menu-inactive');
      break;
    case 2:
      menu = document.querySelector('.shop-title');
      menu.classList.add('menu-active');
      menu.classList.remove('menu-inactive');
      break;
    case 3:
      menu = document.querySelector('.cms-title');
      menu.classList.add('menu-active');
      menu.classList.remove('menu-inactive');
      break;
    default:
  }
}

  setInactive = i =>{
    this.setState({active: !i})
    let menu
    switch(i) {
      case 0:
        menu = document.querySelector('.weather-title');
        menu.classList.add('menu-inactive');
        menu.classList.remove('menu-active');
        break;
      case 1:
        menu = document.querySelector('.map-title');
        menu.classList.add('menu-inactive');
        menu.classList.remove('menu-active');
        break;
      case 2:
        menu = document.querySelector('.shop-title');
        menu.classList.add('menu-inactive');
        menu.classList.remove('menu-active');
        break;
      case 3:
        menu = document.querySelector('.cms-title');
        menu.classList.add('menu-inactive');
        menu.classList.remove('menu-active');
        break;
      default:
    }  
  }
  
  render = () => {
    const {
      weather, weatherPending, weatherError,
      shopNews, shopPending, shopError, 
      cmsNews, cmsPending, cmsError  } = this.props;
   
    return (
      <div className="news-component">
        <div className="news-header">
          <img className="logo" src="images/logo.png" alt=""/>
          <h1 className="headline" data-aos="fade-down">Jamalenda Test Page</h1>
          <img className="tokyo-icon" src="images/tokyo.png" alt=""/>
        </div>
        <div className="menu">
           { this.state.menu.map((menu, i) => { 
              return <Link key={i} onClick={()=>this.setActive(i)}
                to={menu} spy={true} 
                offset={-95}
                hashSpy={false}
                onSetActive={()=>this.setActive(i)}
                onSetInactive={()=>this.setInactive(i)}
                smooth={true} 
                duration={500}>
                {menu}
              </Link>
             })
            } 
        </div>
        <div data-aos="fade-in">
          <img className="video" 
          src="images/placeholder.png" alt=""/>
          <LazyLoad once={true}>
            <video 
              id="video" 
              data-setup='{}'
              preload="auto"
              autobuffer="" 
              autoPlay 
              muted 
              playsInline 
              loop>
              <source src="https://res.cloudinary.com/idealump/video/upload/v1577330844/idealump_kibf41.webm" type="video/webm"/>
            </video>
          </LazyLoad>
        </div>
        <div className="menu-section">
          <Weather
          weather={weather}
          pending={weatherPending}
          error={weatherError} />

          <MapNews />

          <ShopNews 
          shopNews={shopNews}
          pending={shopPending}
          error={shopError} />

          <CMSNews
          cmsNews={cmsNews}
          pending={cmsPending}
          error={cmsError} />
        </div>

        <div className="footer">
          <ul>
            <li>
              <a href="https://www.linkedin.com/in/anisa-jamalenda-43330710b">
                <i className="fab fa-linkedin-in icon"></i>
              </a>
            </li>
            <li>
              <a href="https://github.com/jamalendanisa">
                <i className="fab fa-github icon"></i>
              </a>
            </li>
          </ul>
          <div className="copyright">©2024 jamalenda</div>
        </div>
      </div>
    );
  }
}

News.propTypes = {
  fetchWeather: func.isRequired,
  fetchShopNews: func.isRequired,
  fetchCMSNews: func.isRequired
};

export const mapStateToProps = ({ news: { 
  weather, 
  shopNews, 
  cmsNews, 
  weatherPending, 
  weatherError,
  shopPending, 
  shopError,
  cmsPending, 
  cmsError,
 }}) => ({
  weather,
  shopNews,
  cmsNews,
  weatherPending, 
  weatherError,
  shopPending, 
  shopError,
  cmsPending, 
  cmsError,
});

export const mapDispatchToProps = (dispatch) => ({
  fetchWeather: () => dispatch(getWeather.request()),
  fetchShopNews: () => dispatch(getShopNews.request()),
  fetchCMSNews: () => dispatch(getCMSNews.request())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(News);