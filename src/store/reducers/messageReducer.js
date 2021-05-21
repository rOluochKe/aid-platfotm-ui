const initState = {
  notification: null,
  messages: [],
  loading: true,
  message_count: 0,
  chat_messages: [],
  chat_loading: true,
  processing: false,
  read_status: [],
};

const messageReducer = (state = initState, action) => {
  switch (action.type) {
    case "MESSAGE_SUCCESS":
      return {
        ...state,
        notification: action.message,
      };
    case "MESSAGE_ERROR":
      return {
        ...state,
        notification: action.message,
      };
    case "GET_MESSAGES_SUCCESS":
      return {
        ...state,
        messages: action.data,
        loading: false,
      };
    case "GET_MESSAGES_ERROR":
      return {
        ...state,
        notification: action.message,
        loading: false,
      };
    case "NOTIFICATION_SUCCESS":
      return {
        ...state,
        message_count: action.data,
      };
    case "NOTIFICATION_ERROR":
      return {
        ...state,
        notification: action.message,
      };
    case "CHAT_MESSAGE_SUCCESS":
      return {
        ...state,
        chat_messages: action.data,
        chat_loading: false,
      };
    case "CHAT_MESSAGE_ERROR":
      return {
        ...state,
        notification: action.message,
        chat_loading: false,
      };
    case "PROCESSING":
      return {
        ...state,
        processing: true,
      };
    case "DONE":
      return {
        ...state,
        processing: false,
      };
    case "READ_STATUS_SUCCESS":
      return {
        ...state,
        read_status: action.data,
      };
    case "READ_STATUS_ERROR":
      return {
        ...state,
        notification: action.message,
      };
    default:
      return state;
  }
};

export default messageReducer;
