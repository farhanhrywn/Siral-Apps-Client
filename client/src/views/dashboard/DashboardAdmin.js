import React, { lazy, useEffect, useState } from 'react'
import { useHistory } from 'react-router'
import {
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CRow,
  CDataTable,
  CBadge
} from '@coreui/react'
import CIcon from '@coreui/icons-react'

import axios from 'axios'
import moment from 'moment'

const fields = [
  {key: 'poli', label: 'Nama Poli' },
  {key: 'name', label: 'Dokter' },
  {key: 'jam_praktek', label: 'Jam Praktek' },
]

const fieldPasien = [
  { key: 'name', label: 'Nama Pasien' },
  { key: 'gender', label: 'Jenis Kelamin' },
  { key: 'email', label: 'Email' },
  { key: 'poli_tujuan', label: 'Poli Tujuan' },
  { key: 'dokter', label: 'Dokter' },
  { key: 'status_pendaftaran', label: 'Status Registrasi' },
  { key: 'createdAt', label: 'Tanggal Registrasi' }
]

const Dashboard = () => {
  const router = useHistory()
  const [listDokter, setListDokter] = useState([])
  const [listPasien, setListPasien] = useState([])

  const fetchListDokter = async () => {
    try {
      await axios({
        url: 'http://localhost:3001/dokter',
        method: 'GET'
      })
      .then(({ data }) => {
        setListDokter(data)
      })
    } catch ({ response }) {
      console.log(response)
    }
  }

  const fetchListPasien = async () => {
    try {
      await axios({
        url: 'http://localhost:3001/pasien',
        method: 'GET'
      })
      .then(({ data }) => {
        setListPasien(data)
      })
    } catch ({ response }) {
      console.log(response)
    }
  }

  const convertDate = (item) => {
    return (
        <td>
          {moment(item.createdAt).format('DD MMM YYYY, hh:mm:ss')}
        </td>
    )
  }

  const checkStatus = (item) => {
    return (
      item.status_pendaftaran === 'Pending' ?
      <CBadge color='danger' className="mt-3 text-center">{item.status_pendaftaran}</CBadge> :
      <CBadge color='success' className="mt-3">{item.status_pendaftaran}</CBadge>
    )
  }

  useEffect(() => {
    fetchListDokter()
    fetchListPasien()
  },[])

  return (
    <>
      <CRow>
        <CCol xl={12}>
          <CCard>
            <CCardHeader style={{ textAlign: 'center', fontSize: 30 }}>
              Daftar Poli dan Jadwal Dokter
            </CCardHeader>
            <CCardBody>
              <CDataTable
                items={listDokter}
                fields={fields}
                hover
                striped
              />
            </CCardBody>
          </CCard>
        </CCol>
        <CCol xl={12}>
          <CCard>
            <CCardHeader style={{ textAlign: 'center', fontSize: 30 }}>
              Daftar Registrasi Pasien Rawat Jalan
            </CCardHeader>
            <CCardBody>
              <CDataTable
                items={listPasien}
                fields={fieldPasien}
                hover
                striped
                scopedSlots={{
                  'createdAt': (item) => convertDate(item),
                  'status_pendaftaran': (item) => checkStatus(item)
                }}
              />
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
    </>
  )
}

export default Dashboard
