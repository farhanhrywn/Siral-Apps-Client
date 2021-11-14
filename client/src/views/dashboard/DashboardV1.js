import React, { lazy, useEffect, useState } from 'react'
import { useHistory } from 'react-router'
import {
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CRow,
  CDataTable
} from '@coreui/react'
import CIcon from '@coreui/icons-react'

import axios from 'axios'

const fields = [
  {key: 'poli', label: 'Nama Poli' },
  {key: 'name', label: 'Dokter' },
  {key: 'jam_praktek', label: 'Jam Praktek' },
]

const Dashboard = () => {
  const router = useHistory()
  const [listDokter, setListDokter] = useState([])

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

  useEffect(() => {
    fetchListDokter()
  },[])

  return (
    <>
      <CRow>
        <CCol xl={12}>
          <CCard>
            <CCardHeader style={{ textAlign: 'center', fontSize: 30 }}>
              Daftar Poli dan Jadwal Dokter RS Karunia Kasih
            </CCardHeader>
            <CCardBody>
              <CDataTable
                items={listDokter}
                fields={fields}
                hover
                striped
              />
              <CButton color="info" size="lg" block onClick={() => router.push('/daftar')}>Daftar Rawat Jalan</CButton>
              <CButton color="success" size="lg" block onClick={() => router.push('/users')}>Cek Status Rawat Jalan</CButton>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
    </>
  )
}

export default Dashboard
