import axios from 'axios'
import { setAuthToken } from '../../services/utilities'
import { toast } from 'react-toastify'

const successMsg = (message) => toast.success(message)
const errorMsg = (message) => toast.error(message)

export const requestCounter = () => {
  return (dispatch) => {
    axios({
      method: 'GET',
      url: 'https://aid-platform-ror-api.herokuapp.com/api/v1/request-counter',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => {
        const { data } = response.data
        dispatch({ type: 'REQUEST_COUNTER_SUCCESS', data })
      })
      .catch((error) => {
        const { message } = error.response.data
        dispatch({ type: 'REQUEST_COUNTER_ERROR', message })
      })
  }
}

export const getRequest = () => {
  return (dispatch) => {
    axios({
      method: 'GET',
      url: 'https://aid-platform-ror-api.herokuapp.com/api/v1/requests',
      headers: {
        'Content-Type': 'application/json',
        Authorization: setAuthToken(),
      },
    })
      .then((response) => {
        const { data } = response
        dispatch({ type: 'GET_REQUEST_SUCCESS', data })
      })
      .catch((error) => {
        const { message } = error.response.data
        dispatch({ type: 'GET_REQUEST_ERROR', message })
      })
  }
}

export const singleRequest = (id) => {
  return (dispatch) => {
    axios({
      method: 'GET',
      url: `https://aid-platform-ror-api.herokuapp.com/api/v1/requests/${id}`,
      headers: {
        'Content-Type': 'application/json',
        Authorization: setAuthToken(),
      },
    })
      .then((response) => {
        const { data } = response
        dispatch({ type: 'SINGLE_REQUEST_SUCCESS', data })
      })
      .catch((error) => {
        const { message } = error.response.data
        dispatch({ type: 'SINGLE_REQUEST_ERROR', message })
      })
  }
}

export const getMyRequests = () => {
  return (dispatch) => {
    axios({
      method: 'GET',
      url: `https://aid-platform-ror-api.herokuapp.com/api/v1/my-requests`,
      headers: {
        'Content-Type': 'application/json',
        Authorization: setAuthToken(),
      },
    })
      .then((response) => {
        const { data } = response.data
        dispatch({ type: 'MY_REQUESTS_SUCCESS', data })
      })
      .catch((error) => {
        const { message } = error.response.data
        dispatch({ type: 'MY_REQUESTS_ERROR', message })
      })
  }
}

export const markAsFulfilled = (id) => {
  return (dispatch) => {
    dispatch({ type: 'PROCESSING' })
    axios({
      method: 'PATCH',
      url: `https://aid-platform-ror-api.herokuapp.com/api/v1/requests/${id}`,
      headers: {
        'Content-Type': 'application/json',
        Authorization: setAuthToken(),
      },
    })
      .then((response) => {
        const { message } = response.data
        dispatch({ type: 'MARK_AS_FULFILLED_SUCCESS', message })
        dispatch({ type: 'DONE' })
      })
      .catch((error) => {
        const { message } = error.response.data
        dispatch({ type: 'MARK_AS_FULFILLED_ERROR', message })
        dispatch({ type: 'DONE' })
      })
  }
}

export const republishRequest = (id) => {
  return (dispatch) => {
    dispatch({ type: 'PROCESSING' })
    axios({
      method: 'PATCH',
      url: `https://aid-platform-ror-api.herokuapp.com/api/v1/republish/${id}`,
      headers: {
        'Content-Type': 'application/json',
        Authorization: setAuthToken(),
      },
    })
      .then((response) => {
        const { message } = response.data
        dispatch({ type: 'REPUBLISH_REQUEST_SUCCESS', message })
        dispatch({ type: 'DONE' })
        successMsg(message)
      })
      .catch((error) => {
        const { message } = error.response.data
        dispatch({ type: 'REPUBLISH_REQUEST_ERROR', message })
        dispatch({ type: 'DONE' })
        errorMsg(message)
      })
  }
}

export const deleteRequest = (id) => {
  return (dispatch) => {
    dispatch({ type: 'PROCESSING' })
    axios({
      method: 'DELETE',
      url: `https://aid-platform-ror-api.herokuapp.com/api/v1/requests/${id}`,
      headers: {
        'Content-Type': 'application/json',
        Authorization: setAuthToken(),
      },
    })
      .then((response) => {
        const { message } = response.data
        dispatch({ type: 'DELETE_REQUEST_SUCCESS', message })
        dispatch({ type: 'DONE' })
      })
      .catch((error) => {
        const { message } = error.response.data
        dispatch({ type: 'DELETE_REQUEST_ERROR', message })
        dispatch({ type: 'DONE' })
      })
  }
}

export const createRequest = (request) => {
  return (dispatch) => {
    dispatch({ type: 'PROCESSING' })
    axios({
      method: 'POST',
      url: 'https://aid-platform-ror-api.herokuapp.com/api/v1/requests',
      headers: {
        'Content-Type': 'application/json',
        Authorization: setAuthToken(),
      },
      data: request,
    })
      .then((response) => {
        const { message } = response.data
        dispatch({ type: 'CREATE_REQUEST_SUCCESS', message })
        dispatch({ type: 'DONE' })
        successMsg(message)
      })
      .catch((error) => {
        const { message } = error.response.data
        dispatch({ type: 'CREATE_REQUEST_ERROR', message })
        dispatch({ type: 'DONE' })
        errorMsg(message)
      })
  }
}
