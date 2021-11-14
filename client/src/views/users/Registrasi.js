import React, { useState, useEffect } from 'react'
import { useHistory, useLocation } from 'react-router-dom'
import {
  CBadge,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CDataTable,
  CRow,
  CPagination,
  CButton,
  CLabel,
  CFormGroup,
  CInput
} from '@coreui/react'

import axios from 'axios'
import moment from 'moment'
import Swal from 'sweetalert2'

const fieldPasien = [
  { key: 'name', label: 'Nama Pasien' },
  { key: 'gender', label: 'Jenis Kelamin' },
  { key: 'email', label: 'Email' },
  { key: 'poli_tujuan', label: 'Poli Tujuan' },
  { key: 'dokter', label: 'Dokter' },
  { key: 'status_pendaftaran', label: 'Status Registrasi' },
  { key: 'createdAt', label: 'Tanggal Registrasi' },
  { key: 'action', label: 'Action' }
]


const Users = () => {
  const history = useHistory()
  const queryPage = useLocation().search.match(/page=([0-9]+)/, '')
  const currentPage = Number(queryPage && queryPage[1] ? queryPage[1] : 1)
  const [page, setPage] = useState(currentPage)
  const [listPasien, setListPasien] = useState([])

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

  const updateStatus = async (id) => {
    try {
      await axios({
        url: `http://localhost:3001/pasien/status/${id}`,
        method: 'PATCH'
      })
      .then(({ data }) => {
        Swal.fire({
          title: 'Registration Approved',
          icon: 'success',
          showConfirmButton: false,
          timer: 2000
        })
      })
    } catch ({ response }) {
      console.log(response)
    }
  }

  const checkStatus = (item) => {
    return (
      <td>
        {
          item.status_pendaftaran === 'Approved' ? 
          <CBadge color='success'>{item.status_pendaftaran}</CBadge> :
          <CButton color='info' onClick={() => updateStatus(item.id)}>Approve</CButton>
        }
      </td>
    )
  }

  useEffect(() => {
    currentPage !== page && setPage(currentPage)
  }, [currentPage, page])

  useEffect(() => {
    fetchListPasien()
  },[updateStatus])


  return (
    <CRow>
      <CCol xl={12}>
        <CCard>
          <CCardHeader style={{ textAlign: 'center', fontSize: 30 }}>
            Daftar Registrasi Rawat Jalan
          </CCardHeader>
          <CCardBody>
            <CDataTable
              items={listPasien}
              fields={fieldPasien}
              hover
              striped
              itemsPerPage={10}
              // activePage={page}
              clickableRows
              onRowClick={(item) => history.push(`/users/${item.id}`)}
              scopedSlots={{
                'createdAt': (item) => convertDate(item),
                'action': (item, index)=>checkStatus(item)
              }}
            />
          {/* <CPagination
            activePage={page}
            onActivePageChange={pageChange}
            pages={5}
            doubleArrows={false} 
            align="center"
          /> */}
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  )
}

export default Users
