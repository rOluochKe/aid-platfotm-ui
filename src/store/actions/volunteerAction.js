import axios from 'axios'
import { toast } from 'react-toastify'
import { setAuthToken } from '../../services/utilities'

const successMsg = (message) => toast.success(message)
const errorMsg = (message) => toast.error(message)

export const makeVolunteer = (volunteer, ownProps) => {
  return (dispatch) => {
    dispatch({ type: 'PROCESSING' })
    axios({
      method: 'POST',
      url: 'https://aid-platform-ror-api.herokuapp.com/api/v1/volunteers',
      headers: {
        'Content-Type': 'application/json',
        Authorization: setAuthToken(),
      },
      data: volunteer,
    })
      .then((response) => {
        const { message } = response.data
        dispatch({ type: 'VOLUNTEER_SUCCESS', message })
        dispatch({ type: 'DONE' })
        successMsg(message)
        setTimeout(() => {
          ownProps.history.push('/users/activities')
        }, 2000)
      })
      .catch((error) => {
        const { message } = error.response.data
        errorMsg(message)
        dispatch({ type: 'VOLUNTEER_ERROR', message })
        dispatch({ type: 'DONE' })
      })
  }
}

export const getMyVolunteerings = () => {
  return (dispatch) => {
    axios({
      method: 'GET',
      url: `https://aid-platform-ror-api.herokuapp.com/api/v1/my-volunteerings`,
      headers: {
        'Content-Type': 'application/json',
        Authorization: setAuthToken(),
      },
    })
      .then((response) => {
        const { data } = response
        dispatch({ type: 'MY_VOLUNTEERINGS_SUCCESS', data })
      })
      .catch((error) => {
        const { message } = error.response.data
        dispatch({ type: 'MY_VOLUNTEERINGS_ERROR', message })
      })
  }
}
