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
  CFormGroup,
  CLabel,
  CInput,
  CForm,
  CButton
} from '@coreui/react'

import axios from 'axios'
import moment from 'moment'
import Swal from 'sweetalert2'

const fields = [
  {key: 'name', label: 'Nama' },
  {key: 'poli_tujuan', label: 'Poli' },
  {key: 'dokter', label: 'Dokter' }, 
  {key: 'hp', label: 'Nomor Telepon'},
  {key: 'email', label: 'Email'},
  { key: 'createdAt', label: 'Tanggal Registrasi' },
  {key: 'status_pendaftaran', label: 'Status'},
]


const Users = () => {
  const history = useHistory()
  const queryPage = useLocation().search.match(/page=([0-9]+)/, '')
  const [userReport, setUserReport] = useState([])
  const [users, setUsers] = useState([])
  const [isDownloadDisable, setDownloadDisable] = useState(true)
  const [dateRange, setDateRange] = useState({ start_date: '', end_date: '' })

  const fetchUserReport = async () => {
    try {
      await axios({
        url: 'http://localhost:3001/pasien',
        method: 'GET'
      })
      .then(({ data }) => {
        let filterByStatus = data.filter((pasien) => pasien.status_pendaftaran === 'Approved' )
        setUserReport(filterByStatus)
        setUsers(filterByStatus)
      })
    } catch ({ response }) {
      console.log(response)
    }
  }

  const convertDate = (date) => {
    return (
      moment(date).format('DD MMM YYYY')
    )
  }

  const filterReportByDate = (event) => {
    if( dateRange.start_date === '' && dateRange.end_date === '' ) {
      fetchUserReport()
    }
    let changeFormatStartDate = moment(dateRange.start_date).format('DD MMM YYYY')
    let changeFormatEndDate = moment(dateRange.end_date).format('DD MMM YYYY')
    setUserReport(users.filter((pasien) => convertDate(pasien.createdAt) >= changeFormatStartDate && convertDate(pasien.createdAt) <= changeFormatEndDate ))
    setDateRange({ ...dateRange, start_date: changeFormatStartDate === 'Invalid date' ? '' : changeFormatStartDate, end_date: changeFormatEndDate === 'Invalid date' ? '' : changeFormatEndDate })
  }

  const isDateRangeEmpty = (date) => {
    let arrOfValuesForm = Object.values(date)
    let isValueEmpty = arrOfValuesForm.some(val => val === '' || val === undefined)
    if(isValueEmpty) {
      return true
    }
    return false
  }

  const exportPdf = async () => {
    try {
      await axios({
        url: 'http://localhost:3001/pasien/generate-pdf',
        method: 'POST',
        data: {
          date: dateRange,
          dataReport: userReport
        }
      })
      .then(({ data }) => {
        console.log(data)
        if(data.success) {
          Swal.fire({
            icon: 'success',
            title: 'Create Report Success',
            html: 'Please click <strong>Download</strong> button for download the report ',
            showConfirmButton: false,
            timer: 2000
          })
          setDownloadDisable(false)
        }
      })
    } catch ({ response }) {
      console.log(response)
    }
  }

  const downloadPdf = () => {
    fetch(`http://localhost:3001/pasien/download-pdf?start_date=${dateRange.start_date}&end_date=${dateRange.end_date}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/pdf',
    },
    })
    .then((response) => response.blob())
    .then((blob) => {
      // Create blob link to download
      const url = window.URL.createObjectURL(
        new Blob([blob]),
      );
      console.log(url)
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute(
        'download',
        `Report-${ isDateRangeEmpty(dateRange) ? 'All' : dateRange.start_date === dateRange.end_date ? dateRange.start_date : dateRange.start_date + "-" + dateRange.end_date }.pdf`,
      );

      // Append to html link element page
      document.body.appendChild(link);

      // Start download
      link.click();

      // Clean up and remove the link
      link.parentNode.removeChild(link);

      setDownloadDisable(true)
    });
  }

  const changeDateRange = (event) => {
    setDateRange({ ...dateRange, [event.target.name]: event.target.value })
  }

  useEffect(() => {
    fetchUserReport()
  },[])


  return (
    <CRow>
      <CCol xl={12}>
        <CCard>
          <CCardHeader style={{ textAlign: 'center', fontSize: 30 }}>
            Report Rawat Jalan RS Karunia Kasih
          </CCardHeader>
          <CCardBody>
            <CRow>
              <CCol md="8">
                <CForm inline className="mb-3">
                  <CFormGroup className="mr-3">
                      <CLabel className="mr-3">From :</CLabel>
                      <CInput type="date" name="start_date" onChange={changeDateRange}/>
                  </CFormGroup>
                  <CFormGroup className="mr-3">
                      <CLabel className="mr-3">To :</CLabel>
                      <CInput type="date" name="end_date" onChange={changeDateRange}/>
                  </CFormGroup>
                  <CButton color="primary" size="md" onClick={filterReportByDate}>Search</CButton>
                </CForm>
              </CCol>
              <CCol md="4" className="text-right">
                <CButton color="primary" size="md" onClick={exportPdf}>Create PDF</CButton>
                <CButton color="primary" className="ml-2" size="md" onClick={downloadPdf} disabled={isDownloadDisable}>Download PDF</CButton>
              </CCol>
            </CRow>
            <CDataTable
              items={userReport}
              fields={fields}
              hover
              striped
              itemsPerPage={10}
              clickableRows
              onRowClick={(item) => history.push(`/users/${item.id}`)}
              scopedSlots={{
                'createdAt': (item) => (<td>{convertDate(item.createdAt)}</td>)
              }}
              // clickableRows
              // onRowClick={(item) => history.push(`/users/${item.id}`)}
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
