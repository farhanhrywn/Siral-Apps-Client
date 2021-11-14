import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import { useHistory } from 'react-router'
import axios from 'axios'
import Swal from 'sweetalert2'

const initialState = {
  sidebarShow: 'responsive',
  isSuccessCreateAccount: false,
  error: null,
  dataUser: {}
}


export function createAccount(data) {
  return (dispatch) => {
    axios({
      url: 'http://localhost:3001/pasien/register',
      method: 'POST',
      data
    })
    .then(({ data }) => {
      useHistory().push('/login')
      Swal.fire({
        title: 'Register Success',
        icon: 'success',
        showConfirmButton: false,
        timer: 2000
      })
      // dispatch({ type: 'set_success_create_account', payload: data })
    })
    .catch(err => {
      dispatch({ type: 'set_error', payload: err })
    })
  }
}

export function login(data) {
  return (dispatch) => {
    axios({
      url: 'http://localhost:3001/pasien/login',
      method: 'POST',
      data
    })
    .then(({ data }) => {
      dispatch({ type: 'set_access_token', payload: data })
    })
    .catch(error => {
      console.log(error.response.data)
      // dispatch({ type: 'set_error', payload: err })
    })
  }
}

const changeState = (state = initialState, { type, ...rest }) => {
  switch (type) {
    case 'set':
      return {...state, ...rest }
    case 'set_success_create_account':
      return {...state, isSuccessCreateAccount: true}
    case 'set_error':
      // console.log(rest)
      return {...state, error: rest.payload}
    case 'set_access_token':
      return {...state, dataUser: rest.payload }
    default:
      return state
  }
}

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(changeState, composeEnhancers(applyMiddleware(thunk)))
export default store