import React from 'react';
import { get } from 'lodash';
import fancy from '../../../../../styles/fancy-map.json';
import ID from '../../../../../helpers/ID';
import config from '../../../../../config';
import StandaloneAutocomplete from "../PlacesAutocomplete/StandaloneAutocomplete";

import {
  compose,
  withProps,
  lifecycle
} from "recompose";

import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker,
} from "react-google-maps";

const GoogleComponent = props => (
  <GoogleMap
    ref={props.onMapMounted}
    defaultZoom={14}
    center={props.center}
    onBoundsChanged={props.onBoundsChanged}
    defaultOptions={{styles: fancy}}
  >
    <StandaloneAutocomplete
      ref={props.onSearchBoxMounted}
      bounds={props.bounds}
      onPlaceChanged={props.onPlacesChanged}
    >
      <input
        id={props.searchBoxInputId}
        type="text"
        className={props.inputClassName}
        placeholder='Introduceti adresa'
        defaultValue={props.location.formattedAddress}
        style={{
          boxSizing: `border-box`,
          border: `1px solid transparent`,
          width: props.width,
          height: `32px`,
          marginTop: `10px`,
          padding: `0 12px`,
          borderRadius: `3px`,
          boxShadow: `0 2px 6px rgba(0, 0, 0, 0.3)`,
          fontSize: `14px`,
          outline: `none`,
          textOverflow: `ellipses`,
          position: 'absolute',
          top: '0',
          left: props.left,
        }}
      />
    </StandaloneAutocomplete>
    {
      props.markers.map((marker, index) =>
        <Marker key={index} position={marker.position} />
      )}

    <Marker position={(props.location.lng !== null) ? {lat: props.location.lat, lng: props.location.lng} : null } />

  </GoogleMap>
);

const MapInput = compose(
  withProps({
    googleMapURL: config.googleMapsApiV3Url,
    loadingElement: <div style={{ height: `100%` }} />,
    containerElement: <div style={{ height: `400px`, position: 'relative'}} />,
    mapElement: <div style={{ height: `100%` }} />,
    searchBoxInputId: ID(),
  }),
  lifecycle({
    componentWillMount() {
      const refs = {};
      const {
        restrictions,
      } = this.props;

      this.setState({
        restrictions,
        bounds: null,
        markers: [],
        width: '400px',
        left: '0',
        moldova: {
          lat: 0,
          lng: 0
        },
        center: {
          lat: 46.9999648,
          lng: 28.7881367
        },
        onMapMounted: ref => {
          refs.map = ref;
        },
        onBoundsChanged: () => {
          this.setState({
            bounds: refs.map.getBounds(),
            center: refs.map.getCenter(),
          })
        },
        onSearchBoxMounted: ref => {
          refs.autocomplete = ref;
        },
        onPlacesChanged: () => {
          const places = [refs.autocomplete.getPlace()];

          const { sendCoordinates } = this.props;

          if (places[0].address_components !== undefined) {
            const bounds = new window.google.maps.LatLngBounds();

            places.forEach(place => {
              if (place.geometry.viewport) {
                bounds.union(place.geometry.viewport)
              } else {
                bounds.extend(place.geometry.location)
              }
            });

            const nextMarkers = places.map(place => ({
              position: place.geometry.location,
            }));

            const nextCenter = get(nextMarkers, '0.position', this.state.center);

            this.setState({
              center: nextCenter,
              markers: [nextMarkers[0]],
            });

            const latitude = this.state.markers.map(x => x.position.lat())[0];
            const longitude = this.state.markers.map(x => x.position.lng())[0];

            const {
              address_components: firstPlaceAddressComponents,
            } = places[0];

            /**
             * Take formatted address directly from search box input
             * value, because when the address is not found we get an
             * alternative, and the search string changes.
             *
             * FIXME
             * Find a better solution to find the right place details.
             */
            const formattedAddress = document.getElementById(
              this.props.searchBoxInputId
            ).value;

            const addressComponents = firstPlaceAddressComponents instanceof Array
              ? firstPlaceAddressComponents.map(({
                 long_name: longName,
                 short_name: shortName,
                 types,
               }) => ({
                longName,
                shortName,
                types,
              })) : null;

            sendCoordinates(
              latitude,
              longitude,
              formattedAddress,
              addressComponents
            );
          }
          else {
            sendCoordinates(
              null,
              null,
              '',
              null
            );
          }
        },
      });
    },
  }),
  withScriptjs,
  withGoogleMap
)( GoogleComponent );


export default MapInput;
