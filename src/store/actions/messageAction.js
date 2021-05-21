import axios from "axios";
import { setAuthToken } from "../../services/utilities";

export const sendMessage = (mesg) => {
  return (dispatch) => {
    dispatch({ type: "PROCESSING" });
    axios({
      method: "POST",
      url: "http://localhost:3001/api/v1/messages",
      headers: {
        "Content-Type": "application/json",
        Authorization: setAuthToken(),
      },
      data: mesg,
    })
      .then((response) => {
        const { message } = response.data;
        dispatch({ type: "MESSAGE_SUCCESS", message });
        dispatch({ type: "DONE" });
      })
      .catch((error) => {
        const { message } = error.response.data;
        dispatch({ type: "MESSAGE_ERROR", message });
        dispatch({ type: "DONE" });
      });
  };
};

export const getMessages = () => {
  return (dispatch) => {
    axios({
      method: "GET",
      url: "http://localhost:3001/api/v1/my-messages",
      headers: {
        "Content-Type": "application/json",
        Authorization: setAuthToken(),
      },
    })
      .then((response) => {
        const { data } = response;
        dispatch({ type: "GET_MESSAGES_SUCCESS", data });
      })
      .catch((error) => {
        const { message } = error.response.data;
        dispatch({ type: "GET_MESSAGES_ERROR", message });
      });
  };
};

export const messageNotification = () => {
  return (dispatch) => {
    axios({
      method: "GET",
      url: "http://localhost:3001/api/v1/notifications",
      headers: {
        "Content-Type": "application/json",
        Authorization: setAuthToken(),
      },
    })
      .then((response) => {
        const { data } = response.data;
        dispatch({ type: "NOTIFICATION_SUCCESS", data });
      })
      .catch((error) => {
        const { message } = error.response.data;
        dispatch({ type: "NOTIFICATION_ERROR", message });
      });
  };
};

export const chatMessages = (request_id, user_id) => {
  return (dispatch) => {
    axios({
      method: "GET",
      url: `http://localhost:3001/api/v1/chat/${request_id}/${user_id}`,
      headers: {
        "Content-Type": "application/json",
        Authorization: setAuthToken(),
      },
    })
      .then((response) => {
        const { data } = response;
        dispatch({ type: "CHAT_MESSAGE_SUCCESS", data });
      })
      .catch((error) => {
        const { message } = error.response.data;
        dispatch({ type: "CHAT_MESSAGE_ERROR", message });
      });
  };
};

export const readStatus = (request_id, user_id) => {
  return (dispatch) => {
    axios({
      method: "PATCH",
      url: `http://localhost:3001/api/v1/read-status/${request_id}/${user_id}`,
      headers: {
        "Content-Type": "application/json",
        Authorization: setAuthToken(),
      },
    })
      .then((response) => {
        const { data } = response.data;
        dispatch({ type: "READ_STATUS_SUCCESS", data });
      })
      .catch((error) => {
        const { message } = error.response.data;
        dispatch({ type: "READ_STATUS_ERROR", message });
      });
  };
};
