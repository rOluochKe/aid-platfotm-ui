const initState = {
  notification: false,
  user_counter: [],
  user_loading: true,
  userLocation: { lat: 9.082, lng: 8.6753 }, // set user default location while google fetch the exact location
};

const userReducer = (state = initState, action) => {
  switch (action.type) {
    case "USER_COUNTER_SUCCESS":
      return {
        ...state,
        user_counter: action.data,
        user_loading: false,
      };
    case "USER_COUNTER_ERROR":
      return {
        ...state,
        notification: action.message,
      };
    case "PROCESSING":
      return {
        ...state,
        notification: true,
      };
    case "DONE":
      return {
        ...state,
        notification: false,
      };
    case "LOGIN_SUCCESS":
      return {
        ...state,
        notification: action.message,
      };
    case "LOGIN_ERROR":
      return {
        ...state,
        notification: action.message,
      };
    case "SIGNUP_SUCCESS":
      return {
        ...state,
        notification: action.message,
      };
    case "SIGNUP_ERROR":
      return {
        ...state,
        notification: action.message,
      };
    case "USER_LOGOUT":
      return {
        ...state,
      };
    case "USER_LOCATION":
      return {
        ...state,
        userLocation: action.location,
      };
    case "DEFAULT_LOCATION":
      return {
        ...state,
        userLocation: action.location,
      };
    default:
      return state;
  }
};

export default userReducer;
