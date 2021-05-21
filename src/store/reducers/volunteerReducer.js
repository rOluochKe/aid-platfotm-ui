const initState = {
  notification: null,
  volunteer_btn: false,
  my_volunteerings: [],
  my_volunteerings_loading: true,
};

const volunteerReducer = (state = initState, action) => {
  switch (action.type) {
    case "VOLUNTEER_SUCCESS":
      return {
        ...state,
        notification: action.message,
      };
    case "VOLUNTEER_ERROR":
      return {
        ...state,
        notification: action.message,
      };
    case "PROCESSING":
      return {
        ...state,
        volunteer_btn: true,
      };
    case "DONE":
      return {
        ...state,
        volunteer_btn: false,
      };
    case "MY_VOLUNTEERINGS_SUCCESS":
      return {
        ...state,
        my_volunteerings: action.data,
        my_volunteerings_loading: false,
      };
    case "MY_VOLUNTEERINGS_ERROR":
      return {
        ...state,
        notification: action.message,
      };
    default:
      return state;
  }
};

export default volunteerReducer;
