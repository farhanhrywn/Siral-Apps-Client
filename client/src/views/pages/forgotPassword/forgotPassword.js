import React, { useState } from 'react'
import { useHistory } from 'react-router'
import Swal from 'sweetalert2'
import {
  CButton,
  CCard,
  CCardBody,
  CCardFooter,
  CCol,
  CContainer,
  CForm,
  CInput,
  CInputGroup,
  CInputGroupPrepend,
  CInputGroupText,
  CRow
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import axios from 'axios'

const ForgotPassword = () => {
  const router = useHistory()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

const updatePassword = async () => {
  try {
    await axios({
      url: 'http://localhost:3001/pasien/verify',
      method: 'PATCH',
      data: { email, password }
    })
    .then(({ data }) => {
      Swal.fire({
        title: 'Success',
        text: `Please login with your new password`,
        icon: 'success',
        showConfirmButton: false,
        timer: 2000
      })
      router.push('/login')
    })
  } catch ({ response }) {
    Swal.fire({
      title: 'Sorry...',
      text: `Email ${email} not found`,
      icon: 'error',
      showConfirmButton: false,
      timer: 2000
    })
  }
}

  return (
    <div className="c-app c-default-layout flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md="9" lg="7" xl="6">
            <CCard className="mx-4">
              <CCardBody className="p-4">
                <CForm>
                  <h1>Change your password</h1>
                  <CInputGroup className="mb-3">
                    <CInputGroupPrepend>
                      <CInputGroupText>@</CInputGroupText>
                    </CInputGroupPrepend>
                    <CInput
                      type="text"
                      placeholder="your email"
                      autoComplete="email" 
                      onChange={e => setEmail(e.target.value)}
                    />
                  </CInputGroup>
                  <CInputGroup className="mb-4">
                    <CInputGroupPrepend>
                      <CInputGroupText>
                        <CIcon name="cil-lock-locked" />
                      </CInputGroupText>
                    </CInputGroupPrepend>
                    <CInput
                      type="password"
                      placeholder="your password"
                      onChange={e => setPassword(e.target.value)}
                    />
                  </CInputGroup>
                  <CButton
                    color="success"
                    block
                    onClick={() => updatePassword()}
                  >Update your password</CButton>
                </CForm>
              </CCardBody>
              {/* <CCardFooter className="p-4">
                <CRow>
                  <CCol xs="12" sm="6">
                    <CButton className="btn-facebook mb-1" block><span>facebook</span></CButton>
                  </CCol>
                  <CCol xs="12" sm="6">
                    <CButton className="btn-twitter mb-1" block><span>twitter</span></CButton>
                  </CCol>
                </CRow>
              </CCardFooter> */}
            </CCard>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  )
}

export default ForgotPassword
