import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router'
import {
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CDataTable,
  CRow,
  CFormGroup,
  CLabel,
  CInput,
  CTextarea,
  CButton
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import axios from 'axios'
import Swal from 'sweetalert2'

const User = ({match}) => {
  const router = useHistory()
  const [pasien, setPasien] = useState({})

  const fetchPasienById = async () => {
    try {
      await axios({
        url: `http://localhost:3001/pasien/${match.params.id}`,
        method: 'GET'
      })
      .then(({ data }) => {
        setPasien(data)
      })
    } catch ({ response }) {
      console.log(response)
    }
  }

  const updateStatus =  async ( pasienId ) => {
    try {
      await axios({
        url: `http://localhost:3001/pasien/status/${pasienId}`,
        method: 'PATCH'
      })
      .then(({ data }) => {
        Swal.fire({
          title: 'Registration Approved',
          icon: 'success',
          showConfirmButton: false,
          timer: 2000
        })
        router.push('/registrasi')
      })
    } catch ({ response }) {
      console.log(response)
    }
  }

  const checkStatusPasien = () => {
    if(pasien.status_pendaftaran === 'Approved') {
    }
  }

  useEffect(() => {
    fetchPasienById()
  },[])

  return (
    <CRow>
      <CCol xl={12}>
        <CCard>
          <CCardHeader>
            No Rekam Medis: {pasien.no_rekam_medis}
          </CCardHeader>
          <CCardBody>
            <CRow>
              <CCol>
                
              </CCol>
            </CRow>
            <CRow>
              <CCol md="6">
                <CFormGroup row>
                  <CCol md="3">
                    <CLabel htmlFor="hf-email">Nama</CLabel>
                  </CCol>
                  <CCol xs="12" md="8">
                    <CInput type="text" name="name" value={pasien.name} disabled/>
                  </CCol>
                </CFormGroup>
                <CFormGroup row>
                  <CCol md="3">
                    <CLabel htmlFor="hf-password">Jenis Kelamin</CLabel>
                  </CCol>
                  <CCol xs="12" md="8">
                    <CInput type="text" name="gender" value={pasien.gender} disabled/>
                  </CCol>
                </CFormGroup>
                <CFormGroup row>
                  <CCol md="3">
                    <CLabel htmlFor="hf-email">Tempat Lahir</CLabel>
                  </CCol>
                  <CCol xs="12" md="8">
                    <CInput type="text" name="tempat_lahir" value={pasien.tempat_lahir} disabled />
                  </CCol>
                </CFormGroup>
                <CFormGroup row>
                  <CCol md="3">
                    <CLabel htmlFor="date-input">Tanggal Lahir</CLabel>
                  </CCol>
                  <CCol xs="12" md="8">
                    <CInput type="date" name="tanggal_lahir" value={pasien.tanggal_lahir} disabled />
                  </CCol>
                </CFormGroup>
                <CFormGroup row>
                  <CCol md="3">
                    <CLabel htmlFor="hf-email">Agama</CLabel>
                  </CCol>
                  <CCol xs="12" md="8">
                    <CInput type="text" name="agama" value={pasien.agama} disabled/>
                  </CCol>
                </CFormGroup>
                <CFormGroup row>
                  <CCol md="3">
                    <CLabel htmlFor="hf-email">Kewarganegaraan</CLabel>
                  </CCol>
                  <CCol xs="12" md="8">
                    <CInput type="text" name="kewarganegaraan" value={pasien.kewarganegaraan} disabled />
                  </CCol>
                </CFormGroup>
                <CFormGroup row>
                  <CCol md="3">
                    <CLabel htmlFor="hf-email">No KTP</CLabel>
                  </CCol>
                  <CCol xs="12" md="8">
                    <CInput type="text" name="no_ktp" value={pasien.no_ktp} disabled />
                  </CCol>
                </CFormGroup>
                <CFormGroup row>
                  <CCol md="3">
                    <CLabel htmlFor="hf-email">Nama Ayah</CLabel>
                  </CCol>
                  <CCol xs="12" md="8">
                    <CInput type="text" name="nama_ayah" value={pasien.nama_ayah} disabled />
                  </CCol>
                </CFormGroup>
                <CFormGroup row>
                  <CCol md="3">
                    <CLabel htmlFor="hf-email">Nama Ibu</CLabel>
                  </CCol>
                  <CCol xs="12" md="8">
                    <CInput type="text" name="nama_ibu" value={pasien.nama_ibu} disabled />
                  </CCol>
                </CFormGroup>
                <CFormGroup row>
                  <CCol md="3">
                    <CLabel htmlFor="hf-email">Telepon</CLabel>
                  </CCol>
                  <CCol xs="12" md="8">
                    <CInput type="text" name="telepon" value={pasien.telepon} disabled/>
                  </CCol>
                </CFormGroup>
                <CFormGroup row>
                  <CCol md="3">
                    <CLabel htmlFor="hf-email">No HP</CLabel>
                  </CCol>
                  <CCol xs="12" md="8">
                    <CInput type="text" name="hp" value={pasien.hp} disabled />
                  </CCol>
                </CFormGroup>
              </CCol>
              <CCol md="6">
                <CFormGroup row>
                  <CCol md="3">
                    <CLabel htmlFor="hf-email">Email</CLabel>
                  </CCol>
                  <CCol xs="12" md="8">
                    <CInput type="text" name="email" value={pasien.email} disabled />
                  </CCol>
                </CFormGroup>
                <CFormGroup row>
                  <CCol md="3">
                    <CLabel htmlFor="hf-email">Pekerjaan</CLabel>
                  </CCol>
                  <CCol xs="12" md="8">
                    <CInput type="text" name="pekerjaan" value={pasien.pekerjaan} disabled />
                  </CCol>
                </CFormGroup>
                <CFormGroup row>
                  <CCol md="3">
                    <CLabel htmlFor="hf-email">Alamat</CLabel>
                  </CCol>
                  <CCol xs="12" md="8">
                    <CTextarea type="textarea" rows="3" name="alamat" value={pasien.alamat} disabled />
                  </CCol>
                </CFormGroup>
                <CFormGroup row>
                  <CCol md="3">
                    <CLabel htmlFor="hf-email">Provinsi</CLabel>
                  </CCol>
                  <CCol xs="12" md="8">
                    <CInput type="text" name="provinsi" value={pasien.provinsi} disabled />
                  </CCol>
                </CFormGroup>
                <CFormGroup row>
                  <CCol md="3">
                    <CLabel htmlFor="hf-email">Kabupaten</CLabel>
                  </CCol>
                  <CCol xs="12" md="8">
                    <CInput type="text" name="kabupaten" value={pasien.kabupaten} disabled />
                  </CCol>
                </CFormGroup>
                <CFormGroup row>
                  <CCol md="3">
                    <CLabel htmlFor="hf-email">Kecamatan</CLabel>
                  </CCol>
                  <CCol xs="12" md="8">
                    <CInput type="text" name="kecamatan" value={pasien.kecamatan} disabled />
                  </CCol>
                </CFormGroup>
                <CFormGroup row>
                  <CCol md="3">
                    <CLabel htmlFor="hf-email">Kelurahan</CLabel>
                  </CCol>
                  <CCol xs="12" md="8">
                    <CInput type="text" name="kelurahan" value={pasien.kelurahan} disabled/>
                  </CCol>
                </CFormGroup>
                <CFormGroup row>
                  <CCol md="3">
                    <CLabel htmlFor="hf-email">Status Perkawinan</CLabel>
                  </CCol>
                  <CCol xs="12" md="8">
                    <CInput type="text" name="status_perkawinan" value={pasien.status_perkawinan} disabled />
                  </CCol>
                </CFormGroup>
                <CFormGroup row>
                  <CCol md="3">
                    <CLabel htmlFor="hf-email">Pendidikan Pasien</CLabel>
                  </CCol>
                  <CCol xs="12" md="8">
                    <CInput type="text" name="pendidikan_pasien" value={pasien.pendidikan_pasien} disabled />
                  </CCol>
                </CFormGroup>
              </CCol>
            </CRow>
            {
              pasien.status_pendaftaran === 'Pending' && <CButton color="primary" size="lg" block onClick={() => updateStatus(pasien.id)}>Approve</CButton>
            }
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  )
}

export default User
