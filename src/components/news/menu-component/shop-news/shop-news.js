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

// This code below is for checking if news contents is overflowing or not
// and the folowing code is for hiding read-more button if the content isn't overflowing
// It works but when the read-more has been clicked then the button also disappear 
// Because the content is not overflowing anymore
// I apologize but I will hold this issue because I still couldn't figuring out the way
// Will surely find the way after i submitted the project first
// *I will still updating this project until it gets better

//   isOverflown = (i) => {
//     let details = document.querySelectorAll('.shop-detail');
//      if(details[i]){   
//       return details[i].scrollHeight > details[i].clientHeight || details[i].scrollWidth > details[i].clientWidth;
// 　　 }
//   }

//   componentDidUpdate () {

//   let details = document.querySelectorAll('.shop-detail');
//   let readMore = document.querySelectorAll('.read-more');
//   if(details){
//   details.forEach((detail,i)=>{
//     if(detail){  
//       if(!this.isOverflown(i)){
//         readMore[i].style.display = "none";
//       }else {
//         readMore[i].style.display = "block";
//       }    
//     }
//   })
//  }
// }

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
                  <div className="read-more-cont">
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