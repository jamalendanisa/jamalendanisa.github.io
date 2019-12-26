import React, { Component } from "react"
import { Map } from "react-leaflet"
import ReactLeafletSearch from "react-leaflet-search";
import MapboxLayer from "./mapbox-layer";

import "leaflet/dist/leaflet.css";
import "./map.css";

class CustomOpenStreetMap {
  constructor(options = { providerKey: null, searchBounds: [] } ) {
    let { searchBounds } = options;

    let boundsUrlComponent = "";
    let regionUrlComponent = "";

    if (searchBounds.length) {
      const reversed = searchBounds.map((el) => {return el.reverse()});
      this.bounds = [].concat([],...reversed).join(",");
      boundsUrlComponent = `&bounded=1&viewbox=${this.bounds}`;
    }

    if ('region' in options) {
      regionUrlComponent = `&countrycodes=${options.region}`;
    }

    this.url = `https://nominatim.openstreetmap.org/search?format=json&addressdetails=1&polygon_svg=1&namedetails=1${boundsUrlComponent}${regionUrlComponent}&q=`;
  }

  async search(query) {
    const response = await fetch(this.url + query)
      .then(res => res.json());
    return this.formatResponse(response)
  }

  formatResponse(response) {
    const resources = response;
    const count = response.length;
    const info = (count > 0) ? resources.map(e => ({      
      bounds: e.boundingbox.map(bound => Number(bound)),
      latitude: parseFloat(e.lat),
      longitude: parseFloat(e.lon),
      name: e.display_name,
    })) : 'Not Found';
    console.log(info)
    return {
      info: info,
      raw: response
    }
  }
}


export default class MapNews extends Component {
  constructor(props) {
    super(props)
    this.provider = new CustomOpenStreetMap();
    this.state = {
      count: 0,
      hasLocation: false,
      latlng: [ 35.6649973, 139.7029883 ],
      zoom: 13,
      token: "pk.eyJ1IjoiamFtYWxlbmRhIiwiYSI6ImNrNGd5dDFldDE0YW4zbm13emk1MXZocnMifQ.mP0GU33Vt4JKfQhqMOUZSQ",
      style: "mapbox://styles/jamalenda/ck4gzh2uq6cnv1cmyamwjgbjd"
    } 
  }

  render = () => {
    if (this.mapRef) {
      this
        .mapRef
        .leafletElement
        .invalidateSize()
    }

    return (
      <div id='地図' className="map-container">
        <h2 className="map-title">世界地図</h2>　
        <Map style={{height: "500px"}}
          onLocationfound={this.handleLocationFound}
          ref={(ref) => this.mapRef = ref}
          center={this.state.latlng}
          zoom={this.state.zoom}
          className="news-map"
          scrollWheelZoom={true}
          onClick={this.handleClick}
        > 
        <MapboxLayer
          accessToken={this.state.token}
          style={this.state.style}
        />
        <ReactLeafletSearch
          customProvider={this.provider}
          position="topleft"
          inputPlaceholder="検索"
          search = {[]}
          showMarker={true}
          zoom={14}
          showPopup={true}
          closeResultsOnClick={true}
          openSearchOnLoad={false}
        />
        </Map>
      </div>
    );
  }
}