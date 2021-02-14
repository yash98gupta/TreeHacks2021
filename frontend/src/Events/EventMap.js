import React, { Component } from 'react';
import { Map, GoogleApiWrapper, InfoWindow, Marker} from 'google-maps-react';

const mapStyles = {
  width: '60vw',
  height: '92vh'
};

export class EventMap extends Component {
    state = {
        showingInfoWindow: false,  // Hides or shows the InfoWindow
        activeMarker: {},          // Shows the active marker upon click
        selectedPlace: {}          // Shows the InfoWindow to the selected place upon a marker
      };

      onMarkerClick = (props, marker, e) =>
      this.setState({
        selectedPlace: props,
        activeMarker: marker,
        showingInfoWindow: true
      });
  
    onClose = props => {
      if (this.state.showingInfoWindow) {
        this.setState({
          showingInfoWindow: false,
          activeMarker: null
        });
      }
    };

  render() {
    let markers = this.props.event

     let  maps=(<Map
        google={this.props.google}
        zoom={14}
        style={mapStyles}
        initialCenter={
          {
            lat: 37.4254,
            lng: -122.1700
          }
        }
      >
      {markers.map(marker => {
        
            return (
                <Marker
                    key={marker._id.$oid}
                    onClick={this.onMarkerClick}
                    position={{ lat: parseFloat(marker.lat), lng: parseFloat(marker.lon)}}
                    name={marker.event}
                />
            )
        })}
        <InfoWindow
                marker={this.state.activeMarker}
                visible={this.state.showingInfoWindow}
                onClose={this.onClose}        
                >
                <div>
                    <h4>{this.state.selectedPlace.name}</h4>
                    </div>
        </InfoWindow>
    </Map>
      )

    return (
        <div>
            {maps}
        </div>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: 'AIzaSyCfg41uXVjcDp98ErLKDY9DT3cXzgSyfeo'
})(EventMap);

