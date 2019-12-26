import React,  { Component } from "react";
import moment from "moment";
import "moment/locale/ja";

import "./cms-news.css";

export default class CMSNews extends Component {

  render = () => {
    const { cmsNews, pending, error } = this.props;
   
    return(
      <div id="ニュース" className="cms-container">
        <h2 className="cms-title">ＣＭＳニュース</h2>
        { error && <img alt="error" className="error" src="images/error.png" /> }
        { pending && <img alt="pending" className="pending" src="images/loader.gif" /> }

        <div className="cms-list">
        { !pending && !error && cmsNews &&
          cmsNews.map((data,i) =>{
            return (
              <div key={i} className="cms-news">
                <div className="cms-date">
                  <div className="cms-date-ymh">
                    {moment(data.created_at).locale('ja').format("YYYY")+"年"}
                    {moment(data.created_at).locale('ja').format("MMMDo")}
                  </div>
                  <div className="cms-date-time">
                    {moment(data.created_at).locale('ja').format("HH:mm:ss")}
                  </div> 
                </div>
                <div className="cms-content">
                  {data.news_content}
                </div>
              </div>            
            )
          })       
        }
      </div>
    </div>
    ) 
  }
}