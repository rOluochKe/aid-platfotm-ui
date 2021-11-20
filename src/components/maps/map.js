import React, { useState, Fragment } from 'react'
import {
  GoogleMap,
  Marker,
  InfoWindow,
  // useLoadScript,
} from '@react-google-maps/api'
import { Link } from 'react-router-dom'
// import Spinner from './spinner'
import green from '../../images/green-icon.png'
import red from '../../images/red-icon.png'

// set map container size
const containerStyle = {
  width: '100%',
  height: '100%',
  minHeight: '100vh',
}

const Map = ({ requests, userLocation }) => {
  // pass google map api key to load the Google Maps script
  // const { isLoaded } = useLoadScript({
  //   googleMapsApiKey: process.env.REACT_APP_API_KEY,
  // })

  // set up useState hook
  const [selectedPlace, setSelectedPlace] = useState(null)
  const [markerMap, setMarkerMap] = useState({})
  const [infoWindowOpen, setInfoWindowOpen] = useState(false)

  // mapping all of the places to actual Marker objects
  const markerLoadHandler = (marker, place) => {
    return setMarkerMap((prevState) => {
      return { ...prevState, [place.id]: marker }
    })
  }

  const markerClickHandler = (event, place) => {
    // remember which place was clicked
    setSelectedPlace(place)

    // this close the first marker infoWindow Window on the click of the second marker
    if (infoWindowOpen) {
      setInfoWindowOpen(false)
    }

    setInfoWindowOpen(true)
  }

  const showMap = () => {
    return (
      <Fragment>
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={userLocation}
          zoom={13}
        >
          {console.log(requests, 'places')}
          {requests.map((request) =>
            // request.reqtype === 'Material need'
            request.reqtype === 'material' ? (
              <Marker
                key={request.id}
                position={{ lat: request.lat, lng: request.lng }}
                onLoad={(marker) => markerLoadHandler(marker, request)}
                onClick={(event) => markerClickHandler(event, request)}
                icon={green}
              />
            ) : (
              <Marker
                key={request.id}
                position={{ lat: request.lat, lng: request.lng }}
                onLoad={(marker) => markerLoadHandler(marker, request)}
                onClick={(event) => markerClickHandler(event, request)}
                icon={red}
              />
            )
          )}

          {infoWindowOpen && selectedPlace && (
            <InfoWindow
              anchor={markerMap[selectedPlace.id]}
              onCloseClick={() => setInfoWindowOpen(false)}
            >
              <div>
                <h6 className='text-left'>{selectedPlace.title}</h6>
                <p className='text-left'>
                  <i>{selectedPlace.address}</i>
                </p>
                <p className='text-left'>{`${selectedPlace.user.firstname} ${selectedPlace.user.lastname}`}</p>
                <div className='d-flex justify-content-between'>
                  <p className=''>
                    <strong>Type: </strong>
                    {selectedPlace.reqtype} need
                  </p>
                  {selectedPlace.status === 0 ? (
                    <p className=''>
                      <strong>Status: </strong>
                      <span className='text-danger'>Unfulfilled</span>
                    </p>
                  ) : (
                    <p className=''>
                      <strong>Status: </strong>
                      <span className='text-success'>Fulfilled</span>
                    </p>
                  )}
                </div>
                <p className='text-left'>{selectedPlace.description}</p>
                <Link
                  className='btn btn-secondary btn-sm'
                  to={`/request/${selectedPlace.id}/${selectedPlace.title
                    .toLowerCase()
                    .split(' ')
                    .join('-')}`}
                >
                  Fulfill this need
                </Link>
              </div>
            </InfoWindow>
          )}
        </GoogleMap>
      </Fragment>
    )
  }
  // return isLoaded ? showMap() : <Spinner />
  return showMap()
}

export default Map
