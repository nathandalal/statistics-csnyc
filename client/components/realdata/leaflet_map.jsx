import React from 'react'
import { Map, TileLayer, Marker, Popup } from 'react-leaflet'

export default class LeafletMap extends React.Component {
  constructor() {
    super();
    this.state = { zoom: 5 }
  }

  render() {
    const position = [this.props.lat, this.props.lng]
    return (
      <Map center={position} zoom={this.state.zoom} style={{height: this.props.height ? `${this.props.height}px` : "300px", width: "100%"}}>
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url='http://{s}.tile.osm.org/{z}/{x}/{y}.png'
        />
        <Marker position={position}>
          <Popup>
            <span>A pretty CSS3 popup. <br/> Easily customizable.</span>
          </Popup>
        </Marker>
      </Map>
    );
  }
}