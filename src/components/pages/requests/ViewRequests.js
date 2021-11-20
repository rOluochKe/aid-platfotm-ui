import React, { useEffect, Suspense, lazy } from 'react'
import Navbar from '../../layouts/navbar'
import { isLoggedIn } from '../../../services/utilities'
import { Redirect, Link } from 'react-router-dom'
import { connect } from 'react-redux'
import moment from 'moment'
import '../../../styles/myActivities.css'
import { getRequest } from '../../../store/actions/requestAction'
import Loader from './loader'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Footer from '../../layouts/footer'

const AllMapRequests = lazy(() => import('../../maps/map'))

const ViewRequests = (props) => {
  const { getRequest, requests, loading } = props

  useEffect(() => {
    getRequest()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  if (!isLoggedIn()) return <Redirect to='/' />
  if (loading) return <Loader />

  return (
    <div>
      <Navbar ownProps={props} />
      <div className='container mt-3 mb-5'>
        <ToastContainer />
        <div className='row'>
          <div className='col-md-6'>
            <h2>View All Requests</h2>
            {requests && requests.length !== 0 ? (
              requests.map((request) => {
                return (
                  <div className='text-left' key={request.id}>
                    <div className='card bg-light mb-3'>
                      <div className='card-body'>
                        <h4 className='card-heading'>{request.title}</h4>
                        <p className='card-text'>{request.description}</p>
                        <p className='card-text'>
                          Owner:{' '}
                          <strong>
                            {request.user.firstname} {request.user.lastname}
                          </strong>
                        </p>
                        <p className='card-text'>
                          Request Type: <strong>{request.reqtype}</strong>
                        </p>
                        <div className='card-text'>
                          {request.status === 0 ? (
                            <p>
                              Status:
                              <span className='text-danger'> Unfulfilled</span>
                            </p>
                          ) : (
                            <p>
                              Status:
                              <span className='text-success'> Fulfilled</span>
                            </p>
                          )}
                        </div>
                        <p className='card-text'>
                          Location: <strong>{request.address}</strong>
                        </p>
                        <p className='card-text'>
                          Date Created:{' '}
                          <strong>
                            {moment(request.created_at).format('LLLL')}
                          </strong>
                        </p>
                        {request.status === 0 ? (
                          <div className='d-flex mb-2'>
                            <Link
                              to={`/request/${request.id}/${request.title
                                .toLowerCase()
                                .split(' ')
                                .join('-')}`}
                              className='btn btn-info btn-sm mr-1'
                            >
                              Volunteer for this Request
                            </Link>
                          </div>
                        ) : (
                          <div className='d-flex mb-2'>
                            <Link
                              to={`/request/${request.id}/${request.title
                                .toLowerCase()
                                .split(' ')
                                .join('-')}`}
                              className='btn btn-info btn-sm mr-1'
                            >
                              Volunteer for this Request
                            </Link>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                )
              })
            ) : (
              <div className='alert alert-primary text-left' role='alert'>
                There are no requests yet!
              </div>
            )}
          </div>
          <div className='col-md-6'>
            <h2>Locations on Map</h2>
            <div className='maps-height'>
              <Suspense fallback={<div>Loading...</div>}>
                {requests && <AllMapRequests requests={requests} />}
              </Suspense>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    requests: state.request.requests,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getRequest: () => dispatch(getRequest()),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ViewRequests)
