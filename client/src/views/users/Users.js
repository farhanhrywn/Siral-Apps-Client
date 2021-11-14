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
  CPagination
} from '@coreui/react'

import usersData from './UsersData'
import axios from 'axios'

const fields = [
  {key: 'name', label: 'Nama' },
  {key: 'poli_tujuan', label: 'Poli' },
  {key: 'dokter', label: 'Dokter' }, 
  {key: 'hp', label: 'Nomor Telepon'},
  {key: 'email', label: 'Email'},
  {key: 'status_pendaftaran', label: 'Status'}
]

const getBadge = status => {
  switch (status) {
    case 'Active': return 'success'
    case 'Inactive': return 'secondary'
    case 'Pending': return 'warning'
    case 'Banned': return 'danger'
    default: return 'primary'
  }
}

const Users = () => {
  const history = useHistory()
  const queryPage = useLocation().search.match(/page=([0-9]+)/, '')
  const currentPage = Number(queryPage && queryPage[1] ? queryPage[1] : 1)
  const [page, setPage] = useState(currentPage)
  const [userReport, setUserReport] = useState('')

  const pageChange = newPage => {
    currentPage !== newPage && history.push(`/users?page=${newPage}`)
  }

  const fetchUserReport = async (userId) => {
    try {
      await axios({
        url: `http://localhost:3001/pasien/report?userId=${userId}`,
        method: 'GET',
      })
      .then(({ data }) => {
        setUserReport(data)
      })
    } catch ({ response }) {
      console.log(response)
    }
  }

  useEffect(() => {
    currentPage !== page && setPage(currentPage)
  }, [currentPage, page])

  useEffect(() => {
    fetchUserReport(localStorage.getItem('user_id'))
  },[])


  return (
    <CRow>
      <CCol xl={12}>
        <CCard>
          <CCardHeader>
            In Progress
          </CCardHeader>
          <CCardBody>
          <CDataTable
            items={userReport}
            fields={fields}
            hover
            striped
            itemsPerPage={10}
            activePage={page}
            // clickableRows
            // onRowClick={(item) => history.push(`/users/${item.id}`)}
            scopedSlots = {{
              'status':
                (item)=>(
                  <td>
                    <CBadge color={getBadge(item.status)}>
                      {item.status}
                    </CBadge>
                  </td>
                )
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
      <CCol xl={12}>
        <CCard>
          <CCardHeader>
            History
          </CCardHeader>
          <CCardBody>
          <CDataTable
            // items={usersData}
            fields={fields}
            hover
            striped
            itemsPerPage={10}
            activePage={page}
            clickableRows
            onRowClick={(item) => history.push(`/users/${item.id}`)}
            scopedSlots = {{
              'status':
                (item)=>(
                  <td>
                    <CBadge color={getBadge(item.status)}>
                      {item.status}
                    </CBadge>
                  </td>
                )
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
