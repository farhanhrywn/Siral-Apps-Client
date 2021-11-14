import React, { lazy, useEffect, useState } from 'react'
import { useHistory } from 'react-router'
import {
  CBadge,
  CButton,
  CButtonGroup,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CProgress,
  CRow,
  CCallout,
  CFormGroup,
  CSelect,
  CLabel,
  CInput,
  CTextarea
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import axios from 'axios'
import Swal from 'sweetalert2'


const AddAdmin = () => {
  const router = useHistory()
  const [form, setForm] = useState({
    nama: '',
    nik: '',
    jabatan: '',
    password: ''
  })

  const changeForm = (event) => {
    setForm({...form, [event.target.name]: event.target.value})
  }

  const saveForm = async () => {
    try {
      await axios({
        url: 'http://localhost:3001/admin',
        method: 'POST',
        data: form
      })
      .then(({ data }) => {
        Swal.fire({
          title: 'Success',
          text: 'Berhasil menambahkan admin',
          icon: 'success',
          showConfirmButton: false,
          timer: 2000
        })
        router.push('/dashboard/admin')
      })
    } catch ({ response }) {
      console.log(response)
    }
  }

  const isFormValid = () => {
    let arrOfValuesForm = Object.values(form)
    let isValueEmpty = arrOfValuesForm.some(val => val === '' || val === undefined)
    if(isValueEmpty) {
      return true
    }
    return false
  }

  // useEffect(() => {
  //   setForm({})
  // },[saveForm])


  return (
    <>
      {/* <WidgetsDropdown /> */}
      <CCard>
        <CCardHeader style={{ fontSize: 30 }}>
          Add New Admin
        </CCardHeader>
        <CCardBody>
          <CRow>
            <CCol md="6">
              <CFormGroup row>
                <CCol md="3">
                  <CLabel htmlFor="hf-email">Nama</CLabel>
                </CCol>
                <CCol xs="12" md="8">
                  <CInput type="text" name="nama" value={form.nama} onChange={changeForm}/>
                </CCol>
              </CFormGroup>
              <CFormGroup row>
                <CCol md="3">
                  <CLabel htmlFor="hf-password">NIK</CLabel>
                </CCol>
                <CCol xs="12" md="8">
                  <CInput type="text" name="nik" value={form.nik} onChange={changeForm}/>
                </CCol>
              </CFormGroup>
            </CCol>
            <CCol md="6">
              <CFormGroup row>
                <CCol md="3">
                  <CLabel htmlFor="hf-email">Jabatan</CLabel>
                </CCol>
                <CCol xs="12" md="8">
                  <CInput type="text" name="jabatan" value={form.jabatan} onChange={changeForm} />
                </CCol>
              </CFormGroup>
              <CFormGroup row>
                <CCol md="3">
                  <CLabel htmlFor="hf-email">Password</CLabel>
                </CCol>
                <CCol xs="12" md="8">
                  <CInput type="password" name="password" value={form.password} onChange={changeForm} />
                </CCol>
              </CFormGroup>
            </CCol>
          </CRow>
          <CButton color="primary" size="lg" disabled={isFormValid()} block onClick={saveForm}>Tambah</CButton>
        </CCardBody>
      </CCard>
    </>
  )
}

export default AddAdmin
