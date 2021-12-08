import React, { useEffect, Suspense, lazy } from 'react'
import '../../../styles/dashboard.css'
import Navbar from '../../layouts/navbar'
import { isLoggedIn } from '../../../services/utilities'
import { Redirect } from 'react-router-dom'
import Spinner from '../../maps/spinner'
import { connect } from 'react-redux'
import { getRequest, createRequest } from '../../../store/actions/requestAction'
import { getUserLocation } from '../../../store/actions/userAction'
import Loader from './loader'
import Footer from '../../layouts/footer'

const Map = lazy(() => import('../../maps/map'))
const Form = lazy(() => import('./reqForm'))

const Dashboard = (props) => {
  const {
    getRequest,
    requests,
    loading,
    processing,
    createRequest,
    getUserLocation,
    mesg,
  } = props

  useEffect(() => {
    if (mesg !== '' && mesg !== 'loading') {
      getRequest()
      getUserLocation()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mesg])

  useEffect(() => {
    getRequest()
    getUserLocation()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  if (!isLoggedIn()) return <Redirect to='/' />
  if (loading) return <Loader />

  return (
    <div>
      <Navbar ownProps={props} />
      <div className='dashboard'>
        <div className='row d-flex'>
          <Suspense fallback={<Spinner />}>
            <div className='col-12 col-md-5 order-2 order-md-1'>
              <Form createRequest={createRequest} processing={processing} />
            </div>
            <div className='col-12 col-md-7 order-1 order-md-2'>
              <div className='maps-height'>
                {requests && <Map requests={requests} />}
              </div>
            </div>
          </Suspense>
        </div>
      </div>
      <Footer />
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    requests: state.request.requests,
    loading: state.request.loading,
    processing: state.request.processing,
    userLocation: state.user.userLocation,
    mesg: state.request.notification,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getRequest: () => dispatch(getRequest()),
    createRequest: (request) => dispatch(createRequest(request)),
    getUserLocation: () => dispatch(getUserLocation()),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard)
