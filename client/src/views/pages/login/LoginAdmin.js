import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useHistory } from 'react-router'
import {
  CButton,
  CCard,
  CCardBody,
  CCardGroup,
  CCol,
  CContainer,
  CForm,
  CInput,
  CInputGroup,
  CInputGroupPrepend,
  CInputGroupText,
  CRow,
  CImg
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import axios from 'axios'
import Swal from 'sweetalert2'


const Login = () => {
  const router = useHistory()
  const [nik, setNik] = useState('')
  const [password, setPassword] = useState('')

  
  const userLogin = async (evt) => {
    try {
      evt.preventDefault()
      await axios({
        url: 'http://localhost:3001/admin/login',
        method: 'POST',
        data: { nik, password }
      })
      .then(({ data }) => {
        localStorage.setItem('admin_id', data.id)
        localStorage.setItem('admin_access_token', data.access_token)
        Swal.fire({
          title: 'Login Success',
          icon: 'success',
          showConfirmButton: false,
          timer: 2000
        })
        router.push('/dashboard/admin')
      })
    } catch ({ response }) {
      Swal.fire({
        title: 'Sorry...',
        text: response.data.message,
        icon: 'error',
        showConfirmButton: false,
        timer: 2000
      })
    }
  }

  const changePage = (str) => {
    router.push(`/${str}`)
  }

  return (
    <div className="c-app c-default-layout flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md="8">
            <CCardGroup>
              <CCard className="p-4">
                <CCardBody>
                  <CForm onSubmit={userLogin}>
                    <h1 style={{ textAlign: 'center' }}>Login Admin</h1>
                    <CRow>
                      <CCol className="mt-3" style={{ textAlign: 'center' }} md="4">
                        <CImg src="avatars/logo.jpeg" width={100} />
                      </CCol>
                      <CCol md="8">
                        <p className="text-muted">Sign In to your account</p>
                        <CInputGroup className="mb-3">
                          <CInputGroupPrepend>
                            <CInputGroupText>
                              <CIcon name="cil-user" />
                            </CInputGroupText>
                          </CInputGroupPrepend>
                          <CInput type="text" placeholder="NIK" onChange={e => setNik(e.target.value)}/>
                        </CInputGroup>
                        <CInputGroup className="mb-4">
                          <CInputGroupPrepend>
                            <CInputGroupText>
                              <CIcon name="cil-lock-locked" />
                            </CInputGroupText>
                          </CInputGroupPrepend>
                          <CInput type="password" placeholder="Password" onChange={e => setPassword(e.target.value)}/>
                        </CInputGroup>
                        <CButton color="primary" type="submit" block>Login</CButton>
                        <CRow>
                          <CCol md="6" className="mt-2">
                            <CButton color="link" onClick={() => changePage('forgot')}>Forgot password ?</CButton>
                          </CCol>
                          <CCol md="6" className="mt-2">
                            <CButton color="link" onClick={() => changePage('login')}>Login As User</CButton>
                          </CCol>
                        </CRow>
                        {/* <CRow>
                          <CCol xs="6">
                          </CCol>
                          <CCol xs="4" className="text-right">
                          </CCol>
                        </CRow> */}
                      </CCol>
                    </CRow>
                  </CForm>
                </CCardBody>
              </CCard>
            </CCardGroup>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  )
}

export default Login
