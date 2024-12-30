import React,  { Component } from "react";
import LazyLoad from "react-lazyload";

import "./shop-news.css";

export default class ShopNews extends Component {

  readMore = i => {
    const readMore = document.querySelectorAll(".read-more"); 
    const detail = document.querySelectorAll(".shop-detail"); 

    if (detail[i].classList.contains('close')) {
      detail[i].classList.remove('close');
      readMore[i].innerHTML = "閉じる"
    } else {
      detail[i].classList.add('close');
      readMore[i].innerHTML = "もっとみる"
    } 
  }

  render = () => {
    const { shopNews, pending, error } = this.props;
   
    return(
      <div id="ショプニュース" className="shop-container">
        <h2 className="shop-title">ショプニュース</h2>
        { error && <img alt="error" className="error" src="images/error.png" /> }
        { pending && <img alt="pending" className="pending" src="images/loader.gif" /> }

        <div className="shop-list">
        {!pending && !error && shopNews &&
          shopNews.map((shop,i) =>{
            return (
             <LazyLoad key={i} once={true}>
                <div className="shop-news">
                  <div className="shop-imgcont">
                    <img src={shop.image} className="shop-image" alt = ""/> 
                  </div>  
                  <div className="shop-detailcont">
                    <div className="shop-head">
                    <div className="shop-newstitle"> {shop.title}</div>
                    <div className="shop-date"> {shop.date}</div>
                    </div>
                    <div className="shop-detail close">{shop.detail}</div>
                  </div>
                  <div className="read-more-cont" ref={ref => (this.span = ref)}>
                    <button onClick={()=>this.readMore(i)}
                      className="read-more">もっとみる</button>
                  </div>
                </div>
              </LazyLoad>
            )
          })       
        }
        </div> 
      </div>
    )
  }  
}