import React, { useState } from "react";
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from "react-places-autocomplete";
import "../../../styles/request.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import loader from "../../../images/loader.gif";

const ReqForm = ({ createRequest, processing }) => {
  const [title, setTitle] = useState("");
  const [type, setType] = useState("");
  const [description, setDescription] = useState("");
  const [address, setAddress] = useState("");
  const [error, setError] = useState("");
  const [lat, setLat] = useState("");
  const [lng, setLng] = useState("");

  const handleSelect = (value) => {
    geocodeByAddress(value)
      .then((results) => {
        getLatLng(results[0])
          .then((latlng) => {
            setAddress(value);
            setLat(latlng.lat);
            setLng(latlng.lng);
          })
          .catch((error) => console.log({ latlng: error }));
      })
      .catch((error) => console.log({ geocodeError: error }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // setup form validation
    // check if all fields are filled
    if (!title && !type && !description && !address && !lat && !lng) {
      setError("*All fields are required");
      return false;
    }
    if (!title) {
      setError("*Title is required");
      return false;
    }
    if (!type) {
      setError("*Type of request is required");
      return false;
    }
    if (type === "0") {
      setError("*Select a valid request type");
      return false;
    }
    if (!description) {
      setError("*Enter a description 300 characters max.");
      return false;
    }
    if (!address || !lat || !lng) {
      setError("*Invalid location. Please follow the instruction provided");
      return false;
    }

    if (title && type && description && address && lat && lng) {
      const request = {
        title,
        reqtype: type,
        description,
        lat,
        lng,
        address,
        status: 0,
      };

      // send data to be processed
      createRequest(request);

      // clear error
      setError("");
      setTitle("");
      setType("");
      setDescription("");
      setAddress("");
      setLat("");
      setLng("");
    }
  };
  return (
    <div className="pl-3 mt-4">
      <div className="card mb-3">
        <form className="card-body request-form">
          <ToastContainer />
          <h3 className="text-left">Create a request</h3>
          <p className="text-left text-danger">{error}</p>
          <div className="row input-group">
            <div className="col-12 mb-3">
              <label>
                Title<span className="text-danger">*</span>{" "}
                <small>{title.length !== 0 ? `(${title.length})` : null}</small>
              </label>
              <input
                type="text"
                className="form-control"
                maxLength="50"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="title"
                aria-label="title"
              />
            </div>
          </div>
          <div className="row input-group">
            <div className="col-12 mb-3">
              <label>
                Type<span className="text-danger">*</span>
              </label>
              <select
                type="text"
                className="form-control"
                onChange={(e) => setType(e.target.value)}
              >
                <option value="0">select request type...</option>
                <option value="one-time">One-time task</option>
                <option value="material">Material need</option>
              </select>
            </div>
          </div>
          <div className="row input-group">
            <div className="col-12 mb-3">
              <label>
                Description<span className="text-danger">*</span>{" "}
                <small>
                  {description.length !== 0 ? `(${description.length})` : null}
                </small>
              </label>
              <textarea
                className="form-control"
                rows="5"
                maxLength="300"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
          </div>
          <div className="row input-group">
            <div className="col-12 mb-3">
              <PlacesAutocomplete
                value={address}
                onChange={setAddress}
                onSelect={handleSelect}
              >
                {({
                  getInputProps,
                  suggestions,
                  getSuggestionItemProps,
                  loading,
                }) => (
                  <div className="text-left">
                    <label>
                      Location<span className="text-danger">* </span>
                      <small>
                        (start typing and select your location from the drop down
                        options below)
                      </small>
                    </label>
                    <input
                      {...getInputProps()}
                      type="text"
                      className="form-control"
                      placeholder="location"
                      aria-label="location"
                    />
                    <div className="autocomplete-dropdown mb-2 text-left pl-3">
                      {loading ? <div>loading...</div> : null}
                      {suggestions.map((suggestion, index) => {
                        const style = {
                          backgroundColor: suggestion.active ? "#083E9E" : "#fff",
                          color: suggestion.active ? "#fff" : "#083E9E",
                          cursor: suggestion.active ? "pointer" : "pointer",
                        };
                        return (
                          <div
                            {...getSuggestionItemProps(suggestion, { style })}
                            key={index}
                          >
                            {suggestion.description}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}
              </PlacesAutocomplete>
            </div>
          </div>
          <div className="row pr-4">
            <div className="col-12 mb-3">
              {processing ? (
                <img
                  src={loader}
                  style={{ height: "70px" }}
                  alt="processing-loader"
                />
              ) : (
                <button
                  type="button"
                  className="form-control btn btn-primary"
                  onClick={handleSubmit}
                >
                  Submit Request
                </button>
              )}
            </div>
          </div>
        </form>
      </div>

      <div className="card mb-4">
        <div className="card-body">
          <div className="row pl-3">
            <h6>
              <strong>Legend:</strong>
            </h6>
          </div>
          <div className="row">
            <ul className="ul-list">
              <li className="mb-2">
                <img
                  src="https://maps.google.com/mapfiles/kml/pushpin/grn-pushpin.png"
                  style={{ height: "30px" }}
                  alt="marker"
                />
                <span className="legend-text">
                  Material Need: i.e. A homeless woman on is in needs of blanket.
                </span>
              </li>
              <li>
                <img
                  src="https://maps.google.com/mapfiles/kml/pushpin/red-pushpin.png"
                  style={{ height: "30px" }}
                  alt="marker"
                />
                <span className="legend-text">
                  One Time Need: i.e. To help carry a piece of heavy furniture.
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReqForm;
