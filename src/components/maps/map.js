import React, { Fragment } from 'react'
import {
  GoogleMap,
  Marker,
  InfoWindow,
  useLoadScript,
} from '@react-google-maps/api'
import { Link } from 'react-router-dom'
import Spinner from './spinner'
import green from '../../images/green-icon.png'
import red from '../../images/red-icon.png'

// set map container size
const containerStyle = {
  width: '100%',
  height: '100%',
}

const Map = ({ requests }) => {
  // pass google map api key to load the Google Maps script
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_API_KEY,
  })

  // make api call to backend to get requests details and location
  const place = {
    lat: 1.2921,
    lng: 36.8219,
  }

  const displayMap = () => {
    return (
      <Fragment>
        <GoogleMap mapContainerStyle={containerStyle} center={place} zoom={13}>
          {requests.map((request) => {
            if (request.reqtype === 'material') {
              return (
                <Marker key={request.id} position={place} icon={green}>
                  <InfoWindow>
                    <Link
                      to={`/request/${request.id}/${request.title
                        .toLowerCase()
                        .split(' ')
                        .join('-')}`}
                    >
                      <h6 className='text-left map-req-title'>
                        {request.title}
                      </h6>
                    </Link>
                  </InfoWindow>
                </Marker>
              )
            } else {
              return (
                <Marker key={request.id} position={place} icon={red}>
                  <InfoWindow>
                    <Link
                      to={`/request/${request.id}/${request.title
                        .toLowerCase()
                        .split(' ')
                        .join('-')}`}
                    >
                      <h6 className='text-left map-req-title'>
                        {request.title}
                      </h6>
                    </Link>
                  </InfoWindow>
                </Marker>
              )
            }
          })}
        </GoogleMap>
      </Fragment>
    )
  }
  return isLoaded ? displayMap() : <Spinner />
}

export default Map
