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
import usersData from '../users/UsersData'
import axios from 'axios'
import Swal from 'sweetalert2'

const fields = ['name','registered', 'role', 'status']

const WidgetsDropdown = lazy(() => import('../widgets/WidgetsDropdown.js'))
const WidgetsBrand = lazy(() => import('../widgets/WidgetsBrand.js'))


const Dashboard = () => {
  const router = useHistory()
  const [listDokter, setListDokter] = useState([])
  const [listFilteredDokter, setListFilteredDokter] = useState([])
  const [listPoli, setListPoli] = useState([])
  const [noRekamMedis, setNoRekamMedis] = useState('')
  const [form, setForm] = useState({
    name: '',
    gender: '',
    tempat_lahir: '',
    tanggal_lahir: '',
    agama: '',
    kewarganegaraan: '',
    no_ktp: '',
    nama_ayah: '',
    nama_ibu: '',
    telepon: '',
    hp: '',
    email: '',
    alamat: '',
    provinsi: '',
    kabupaten: '',
    kecamatan: '',
    kelurahan: '',
    status_perkawinan: '',
    pendidikan_pasien: '',
    pekerjaan: '',
    poli_tujuan: '',
    dokter: ''
  })


  const fetchListDokter = async () => {
    try {
      await axios({
        url: 'http://localhost:3001/dokter',
        method: 'GET'
      })
      .then(({ data }) => {
        setListDokter(data)
        setListFilteredDokter(data)
      })
    } catch ({ response }) {
      console.log(response)
    }
  }

  const fetchListPoli = async () => {
    try {
      await axios({
        url: 'http://localhost:3001/poli',
        method: 'GET'
      })
      .then(({ data }) => {
        setListPoli(data)
      })
    } catch ({ response }) {
      console.log(response)
    }
  }

  const getNoRekamMedis = async () => {
    try {
      await axios({
        url: 'http://localhost:3001/pasien',
        method: 'GET'
      })
      .then(({ data }) => {
        let checkIsUserExists = data.filter((pasien) => pasien.UserId === +localStorage.getItem('user_id'))
        if(checkIsUserExists.length !== 0) {
          setNoRekamMedis(checkIsUserExists[0].no_rekam_medis)
        } else {
          //get last no rekam medis
          let lastNoRekamMedis = +data.at(-1).no_rekam_medis

          //generate new no rekam medis
          let newNoRekamMedis = (lastNoRekamMedis + 1).toString().padStart(6, '0')
          setNoRekamMedis(newNoRekamMedis)
        }
      })
    } catch ({ response }) {
      console.log(response)
    }
  }

  const filterListDokter = (event) => {
    setListFilteredDokter(listDokter.filter((dokter) => dokter.poli === event.target.value))
    setForm({...form, poli_tujuan: event.target.value})
  }

  const selectDokter = (event) => {
    setForm({...form, dokter: event.target.value})
  }

  const changeForm = (event) => {
    setForm({...form, [event.target.name]: event.target.value})
  }

  const saveForm = async () => {
    try {
      await axios({
        url: 'http://localhost:3001/pasien',
        method: 'POST',
        data: {...form, UserId: localStorage.getItem('user_id'), no_rekam_medis: noRekamMedis}
      })
      .then(({ data }) => {
        Swal.fire({
          title: 'Success',
          text: 'Terima kasih telah mendaftar dan silahkan tunggu',
          icon: 'success',
          showConfirmButton: false,
          timer: 2000
        })
        router.push('/users')
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

  useEffect(() => {
    fetchListDokter()
    fetchListPoli()
    getNoRekamMedis()
  },[])


  return (
    <>
      {/* <WidgetsDropdown /> */}
      <CCard>
        <CCardBody>
          <CRow>
            <CCol md="6">
              <CFormGroup row className="mb-5">
                <CCol md="3">
                  <CLabel htmlFor="hf-password">Pilih Poli :</CLabel>
                </CCol>
                <CCol xs="12" md="8">
                  <CSelect custom onChange={filterListDokter} >
                      <option value="">Please select</option>
                      {
                        listPoli.map(poli => (
                          <option key={poli.id} value={poli.name}>{poli.name}</option>
                        ))
                      }
                  </CSelect>
                </CCol>
              </CFormGroup>
            </CCol>
            <CCol md="6">
              <CFormGroup row className="mb-5">
                <CCol md="3">
                  <CLabel htmlFor="hf-password">Pilih Dokter :</CLabel>
                </CCol>
                <CCol xs="12" md="8">
                  <CSelect custom onChange={selectDokter} >
                      <option value="">Please select</option>
                      {
                        listFilteredDokter.map(dokter => (
                          <option key={dokter.id} value={dokter.name}>{dokter.name} - {dokter.jam_praktek}</option>
                        ))
                      }
                  </CSelect>
                </CCol>
              </CFormGroup>
            </CCol>
          </CRow>
          <CRow>
            <CCol md="6">
              <CFormGroup row>
                <CCol md="3">
                  <CLabel htmlFor="hf-email">No. Rekam Medis</CLabel>
                </CCol>
                <CCol xs="12" md="8">
                  <CInput type="text" name="no_rekam_medis" value={noRekamMedis} disabled/>
                </CCol>
              </CFormGroup>
              <CFormGroup row>
                <CCol md="3">
                  <CLabel htmlFor="hf-email">Nama</CLabel>
                </CCol>
                <CCol xs="12" md="8">
                  <CInput type="text" name="name" onChange={changeForm}/>
                </CCol>
              </CFormGroup>
              <CFormGroup row>
                <CCol md="3">
                  <CLabel htmlFor="hf-password">Jenis Kelamin</CLabel>
                </CCol>
                <CCol xs="12" md="8">
                  <CSelect custom name="gender" onChange={changeForm}>
                      <option value="">Please select</option>
                      <option value="Pria">Pria</option>
                      <option value="Wanita">Wanita</option>
                  </CSelect>
                </CCol>
              </CFormGroup>
              <CFormGroup row>
                <CCol md="3">
                  <CLabel htmlFor="hf-email">Tempat Lahir</CLabel>
                </CCol>
                <CCol xs="12" md="8">
                  <CInput type="text" name="tempat_lahir" onChange={changeForm} />
                </CCol>
              </CFormGroup>
              <CFormGroup row>
                <CCol md="3">
                  <CLabel htmlFor="date-input">Tanggal Lahir</CLabel>
                </CCol>
                <CCol xs="12" md="8">
                  <CInput type="date" name="tanggal_lahir" placeholder="date" onChange={changeForm} />
                </CCol>
              </CFormGroup>
              <CFormGroup row>
                <CCol md="3">
                  <CLabel htmlFor="hf-email">Agama</CLabel>
                </CCol>
                <CCol xs="12" md="8">
                  <CInput type="text" name="agama" onChange={changeForm}/>
                </CCol>
              </CFormGroup>
              <CFormGroup row>
                <CCol md="3">
                  <CLabel htmlFor="hf-email">Kewarganegaraan</CLabel>
                </CCol>
                <CCol xs="12" md="8">
                  <CInput type="text" name="kewarganegaraan" onChange={changeForm} />
                </CCol>
              </CFormGroup>
              <CFormGroup row>
                <CCol md="3">
                  <CLabel htmlFor="hf-email">No KTP</CLabel>
                </CCol>
                <CCol xs="12" md="8">
                  <CInput type="text" name="no_ktp" onChange={changeForm} />
                </CCol>
              </CFormGroup>
              <CFormGroup row>
                <CCol md="3">
                  <CLabel htmlFor="hf-email">Nama Ayah</CLabel>
                </CCol>
                <CCol xs="12" md="8">
                  <CInput type="text" name="nama_ayah" onChange={changeForm} />
                </CCol>
              </CFormGroup>
              <CFormGroup row>
                <CCol md="3">
                  <CLabel htmlFor="hf-email">Nama Ibu</CLabel>
                </CCol>
                <CCol xs="12" md="8">
                  <CInput type="text" name="nama_ibu" onChange={changeForm} />
                </CCol>
              </CFormGroup>
              <CFormGroup row>
                <CCol md="3">
                  <CLabel htmlFor="hf-email">Telepon</CLabel>
                </CCol>
                <CCol xs="12" md="8">
                  <CInput type="text" name="telepon" onChange={changeForm}/>
                </CCol>
              </CFormGroup>
            </CCol>
            <CCol md="6">
              <CFormGroup row>
                <CCol md="3">
                  <CLabel htmlFor="hf-email">No HP</CLabel>
                </CCol>
                <CCol xs="12" md="8">
                  <CInput type="text" name="hp" onChange={changeForm} />
                </CCol>
              </CFormGroup>
              <CFormGroup row>
                <CCol md="3">
                  <CLabel htmlFor="hf-email">Email</CLabel>
                </CCol>
                <CCol xs="12" md="8">
                  <CInput type="text" name="email" onChange={changeForm} />
                </CCol>
              </CFormGroup>
              <CFormGroup row>
                <CCol md="3">
                  <CLabel htmlFor="hf-email">Pekerjaan</CLabel>
                </CCol>
                <CCol xs="12" md="8">
                  <CInput type="text" name="pekerjaan" onChange={changeForm} />
                </CCol>
              </CFormGroup>
              <CFormGroup row>
                <CCol md="3">
                  <CLabel htmlFor="hf-email">Alamat</CLabel>
                </CCol>
                <CCol xs="12" md="8">
                  <CTextarea type="textarea" rows="3" name="alamat" onChange={changeForm} />
                </CCol>
              </CFormGroup>
              <CFormGroup row>
                <CCol md="3">
                  <CLabel htmlFor="hf-email">Provinsi</CLabel>
                </CCol>
                <CCol xs="12" md="8">
                  <CInput type="text" name="provinsi" onChange={changeForm} />
                </CCol>
              </CFormGroup>
              <CFormGroup row>
                <CCol md="3">
                  <CLabel htmlFor="hf-email">Kabupaten</CLabel>
                </CCol>
                <CCol xs="12" md="8">
                  <CInput type="text" name="kabupaten" onChange={changeForm} />
                </CCol>
              </CFormGroup>
              <CFormGroup row>
                <CCol md="3">
                  <CLabel htmlFor="hf-email">Kecamatan</CLabel>
                </CCol>
                <CCol xs="12" md="8">
                  <CInput type="text" name="kecamatan" onChange={changeForm} />
                </CCol>
              </CFormGroup>
              <CFormGroup row>
                <CCol md="3">
                  <CLabel htmlFor="hf-email">Kelurahan</CLabel>
                </CCol>
                <CCol xs="12" md="8">
                  <CInput type="text" name="kelurahan"  onChange={changeForm}/>
                </CCol>
              </CFormGroup>
              <CFormGroup row>
                <CCol md="3">
                  <CLabel htmlFor="hf-email">Status Perkawinan</CLabel>
                </CCol>
                <CCol xs="12" md="8">
                  <CInput type="text" name="status_perkawinan" onChange={changeForm} />
                </CCol>
              </CFormGroup>
              <CFormGroup row>
                <CCol md="3">
                  <CLabel htmlFor="hf-email">Pendidikan Pasien</CLabel>
                </CCol>
                <CCol xs="12" md="8">
                  <CInput type="text" name="pendidikan_pasien" onChange={changeForm} />
                </CCol>
              </CFormGroup>
            </CCol>
          </CRow>
          <CButton color="primary" size="lg" block disabled={isFormValid()} onClick={saveForm}>Submit</CButton>
        </CCardBody>
      </CCard>

      {/* <WidgetsBrand withCharts/> */}

      {/* <CRow>
        <CCol>
          <CCard>
            <CCardHeader>
              Traffic {' & '} Sales
            </CCardHeader>
            <CCardBody>
              <CRow>
                <CCol xs="12" md="6" xl="6">

                  <CRow>
                    <CCol sm="6">
                      <CCallout color="info">
                        <small className="text-muted">New Clients</small>
                        <br />
                        <strong className="h4">9,123</strong>
                      </CCallout>
                    </CCol>
                    <CCol sm="6">
                      <CCallout color="danger">
                        <small className="text-muted">Recurring Clients</small>
                        <br />
                        <strong className="h4">22,643</strong>
                      </CCallout>
                    </CCol>
                  </CRow>

                  <hr className="mt-0" />

                  <div className="progress-group mb-4">
                    <div className="progress-group-prepend">
                      <span className="progress-group-text">
                        Monday
                      </span>
                    </div>
                    <div className="progress-group-bars">
                      <CProgress className="progress-xs" color="info" value="34" />
                      <CProgress className="progress-xs" color="danger" value="78" />
                    </div>
                  </div>
                  <div className="progress-group mb-4">
                    <div className="progress-group-prepend">
                      <span className="progress-group-text">
                      Tuesday
                      </span>
                    </div>
                    <div className="progress-group-bars">
                      <CProgress className="progress-xs" color="info" value="56" />
                      <CProgress className="progress-xs" color="danger" value="94" />
                    </div>
                  </div>
                  <div className="progress-group mb-4">
                    <div className="progress-group-prepend">
                      <span className="progress-group-text">
                      Wednesday
                      </span>
                    </div>
                    <div className="progress-group-bars">
                      <CProgress className="progress-xs" color="info" value="12" />
                      <CProgress className="progress-xs" color="danger" value="67" />
                    </div>
                  </div>
                  <div className="progress-group mb-4">
                    <div className="progress-group-prepend">
                      <span className="progress-group-text">
                      Thursday
                      </span>
                    </div>
                    <div className="progress-group-bars">
                      <CProgress className="progress-xs" color="info" value="43" />
                      <CProgress className="progress-xs" color="danger" value="91" />
                    </div>
                  </div>
                  <div className="progress-group mb-4">
                    <div className="progress-group-prepend">
                      <span className="progress-group-text">
                      Friday
                      </span>
                    </div>
                    <div className="progress-group-bars">
                      <CProgress className="progress-xs" color="info" value="22" />
                      <CProgress className="progress-xs" color="danger" value="73" />
                    </div>
                  </div>
                  <div className="progress-group mb-4">
                    <div className="progress-group-prepend">
                      <span className="progress-group-text">
                      Saturday
                      </span>
                    </div>
                    <div className="progress-group-bars">
                      <CProgress className="progress-xs" color="info" value="53" />
                      <CProgress className="progress-xs" color="danger" value="82" />
                    </div>
                  </div>
                  <div className="progress-group mb-4">
                    <div className="progress-group-prepend">
                      <span className="progress-group-text">
                      Sunday
                      </span>
                    </div>
                    <div className="progress-group-bars">
                      <CProgress className="progress-xs" color="info" value="9" />
                      <CProgress className="progress-xs" color="danger" value="69" />
                    </div>
                  </div>
                  <div className="legend text-center">
                    <small>
                      <sup className="px-1"><CBadge shape="pill" color="info">&nbsp;</CBadge></sup>
                      New clients
                      &nbsp;
                      <sup className="px-1"><CBadge shape="pill" color="danger">&nbsp;</CBadge></sup>
                      Recurring clients
                    </small>
                  </div>
                </CCol>

                <CCol xs="12" md="6" xl="6">

                  <CRow>
                    <CCol sm="6">
                      <CCallout color="warning">
                        <small className="text-muted">Pageviews</small>
                        <br />
                        <strong className="h4">78,623</strong>
                      </CCallout>
                    </CCol>
                    <CCol sm="6">
                      <CCallout color="success">
                        <small className="text-muted">Organic</small>
                        <br />
                        <strong className="h4">49,123</strong>
                      </CCallout>
                    </CCol>
                  </CRow>

                  <hr className="mt-0" />

                  <div className="progress-group mb-4">
                    <div className="progress-group-header">
                      <CIcon className="progress-group-icon" name="cil-user" />
                      <span className="title">Male</span>
                      <span className="ml-auto font-weight-bold">43%</span>
                    </div>
                    <div className="progress-group-bars">
                      <CProgress className="progress-xs" color="warning" value="43" />
                    </div>
                  </div>
                  <div className="progress-group mb-5">
                    <div className="progress-group-header">
                      <CIcon className="progress-group-icon" name="cil-user-female" />
                      <span className="title">Female</span>
                      <span className="ml-auto font-weight-bold">37%</span>
                    </div>
                    <div className="progress-group-bars">
                      <CProgress className="progress-xs" color="warning" value="37" />
                    </div>
                  </div>
                  <div className="progress-group">
                    <div className="progress-group-header">
                      <CIcon className="progress-group-icon" name="cil-globe-alt" />
                      <span className="title">Organic Search</span>
                      <span className="ml-auto font-weight-bold">191,235 <span className="text-muted small">(56%)</span></span>
                    </div>
                    <div className="progress-group-bars">
                      <CProgress className="progress-xs" color="success" value="56" />
                    </div>
                  </div>


                  <div className="progress-group">
                    <div className="progress-group-header">
                      <CIcon name="cib-facebook" className="progress-group-icon" />
                      <span className="title">Facebook</span>
                      <span className="ml-auto font-weight-bold">51,223 <span className="text-muted small">(15%)</span></span>
                    </div>
                    <div className="progress-group-bars">
                      <CProgress className="progress-xs" color="success" value="15" />
                    </div>
                  </div>
                  <div className="progress-group">
                    <div className="progress-group-header">
                      <CIcon name="cib-twitter" className="progress-group-icon" />
                      <span className="title">Twitter</span>
                      <span className="ml-auto font-weight-bold">37,564 <span className="text-muted small">(11%)</span></span>
                    </div>
                    <div className="progress-group-bars">
                      <CProgress className="progress-xs" color="success" value="11" />
                    </div>
                  </div>
                  <div className="progress-group">
                    <div className="progress-group-header">
                      <CIcon name="cib-linkedin" className="progress-group-icon" />
                      <span className="title">LinkedIn</span>
                      <span className="ml-auto font-weight-bold">27,319 <span className="text-muted small">(8%)</span></span>
                    </div>
                    <div className="progress-group-bars">
                      <CProgress className="progress-xs" color="success" value="8" />
                    </div>
                  </div>
                  <div className="divider text-center">
                    <CButton color="link" size="sm" className="text-muted">
                      <CIcon name="cil-options" />
                    </CButton>
                  </div>

                </CCol>
              </CRow>

              <br />

              <table className="table table-hover table-outline mb-0 d-none d-sm-table">
                <thead className="thead-light">
                  <tr>
                    <th className="text-center"><CIcon name="cil-people" /></th>
                    <th>User</th>
                    <th className="text-center">Country</th>
                    <th>Usage</th>
                    <th className="text-center">Payment Method</th>
                    <th>Activity</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="text-center">
                      <div className="c-avatar">
                        <img src={'avatars/1.jpg'} className="c-avatar-img" alt="admin@bootstrapmaster.com" />
                        <span className="c-avatar-status bg-success"></span>
                      </div>
                    </td>
                    <td>
                      <div>Yiorgos Avraamu</div>
                      <div className="small text-muted">
                        <span>New</span> | Registered: Jan 1, 2015
                      </div>
                    </td>
                    <td className="text-center">
                      <CIcon height={25} name="cif-us" title="us" id="us" />
                    </td>
                    <td>
                      <div className="clearfix">
                        <div className="float-left">
                          <strong>50%</strong>
                        </div>
                        <div className="float-right">
                          <small className="text-muted">Jun 11, 2015 - Jul 10, 2015</small>
                        </div>
                      </div>
                      <CProgress className="progress-xs" color="success" value="50" />
                    </td>
                    <td className="text-center">
                      <CIcon height={25} name="cib-cc-mastercard" />
                    </td>
                    <td>
                      <div className="small text-muted">Last login</div>
                      <strong>10 sec ago</strong>
                    </td>
                  </tr>
                  <tr>
                    <td className="text-center">
                      <div className="c-avatar">
                        <img src={'avatars/2.jpg'} className="c-avatar-img" alt="admin@bootstrapmaster.com" />
                        <span className="c-avatar-status bg-danger"></span>
                      </div>
                    </td>
                    <td>
                      <div>Avram Tarasios</div>
                      <div className="small text-muted">

                        <span>Recurring</span> | Registered: Jan 1, 2015
                      </div>
                    </td>
                    <td className="text-center">
                      <CIcon height={25} name="cif-br" title="br" id="br" />
                    </td>
                    <td>
                      <div className="clearfix">
                        <div className="float-left">
                          <strong>10%</strong>
                        </div>
                        <div className="float-right">
                          <small className="text-muted">Jun 11, 2015 - Jul 10, 2015</small>
                        </div>
                      </div>
                      <CProgress className="progress-xs" color="info" value="10" />
                    </td>
                    <td className="text-center">
                      <CIcon height={25} name="cib-cc-visa" />
                    </td>
                    <td>
                      <div className="small text-muted">Last login</div>
                      <strong>5 minutes ago</strong>
                    </td>
                  </tr>
                  <tr>
                    <td className="text-center">
                      <div className="c-avatar">
                        <img src={'avatars/3.jpg'} className="c-avatar-img" alt="admin@bootstrapmaster.com" />
                        <span className="c-avatar-status bg-warning"></span>
                      </div>
                    </td>
                    <td>
                      <div>Quintin Ed</div>
                      <div className="small text-muted">
                        <span>New</span> | Registered: Jan 1, 2015
                      </div>
                    </td>
                    <td className="text-center">
                      <CIcon height={25} name="cif-in" title="in" id="in" />
                    </td>
                    <td>
                      <div className="clearfix">
                        <div className="float-left">
                          <strong>74%</strong>
                        </div>
                        <div className="float-right">
                          <small className="text-muted">Jun 11, 2015 - Jul 10, 2015</small>
                        </div>
                      </div>
                      <CProgress className="progress-xs" color="warning" value="74" />
                    </td>
                    <td className="text-center">
                      <CIcon height={25} name="cib-stripe" />
                    </td>
                    <td>
                      <div className="small text-muted">Last login</div>
                      <strong>1 hour ago</strong>
                    </td>
                  </tr>
                  <tr>
                    <td className="text-center">
                      <div className="c-avatar">
                        <img src={'avatars/4.jpg'} className="c-avatar-img" alt="admin@bootstrapmaster.com" />
                        <span className="c-avatar-status bg-secondary"></span>
                      </div>
                    </td>
                    <td>
                      <div>Enéas Kwadwo</div>
                      <div className="small text-muted">
                        <span>New</span> | Registered: Jan 1, 2015
                      </div>
                    </td>
                    <td className="text-center">
                      <CIcon height={25} name="cif-fr" title="fr" id="fr" />
                    </td>
                    <td>
                      <div className="clearfix">
                        <div className="float-left">
                          <strong>98%</strong>
                        </div>
                        <div className="float-right">
                          <small className="text-muted">Jun 11, 2015 - Jul 10, 2015</small>
                        </div>
                      </div>
                      <CProgress className="progress-xs" color="danger" value="98" />
                    </td>
                    <td className="text-center">
                      <CIcon height={25} name="cib-paypal" />
                    </td>
                    <td>
                      <div className="small text-muted">Last login</div>
                      <strong>Last month</strong>
                    </td>
                  </tr>
                  <tr>
                    <td className="text-center">
                      <div className="c-avatar">
                        <img src={'avatars/5.jpg'} className="c-avatar-img" alt="admin@bootstrapmaster.com" />
                        <span className="c-avatar-status bg-success"></span>
                      </div>
                    </td>
                    <td>
                      <div>Agapetus Tadeáš</div>
                      <div className="small text-muted">
                        <span>New</span> | Registered: Jan 1, 2015
                      </div>
                    </td>
                    <td className="text-center">
                      <CIcon height={25} name="cif-es" title="es" id="es" />
                    </td>
                    <td>
                      <div className="clearfix">
                        <div className="float-left">
                          <strong>22%</strong>
                        </div>
                        <div className="float-right">
                          <small className="text-muted">Jun 11, 2015 - Jul 10, 2015</small>
                        </div>
                      </div>
                      <CProgress className="progress-xs" color="info" value="22" />
                    </td>
                    <td className="text-center">
                      <CIcon height={25} name="cib-google-pay"/>
                    </td>
                    <td>
                      <div className="small text-muted">Last login</div>
                      <strong>Last week</strong>
                    </td>
                  </tr>
                  <tr>
                    <td className="text-center">
                      <div className="c-avatar">
                        <img src={'avatars/6.jpg'} className="c-avatar-img" alt="admin@bootstrapmaster.com" />
                        <span className="c-avatar-status bg-danger"></span>
                      </div>
                    </td>
                    <td>
                      <div>Friderik Dávid</div>
                      <div className="small text-muted">
                        <span>New</span> | Registered: Jan 1, 2015
                      </div>
                    </td>
                    <td className="text-center">
                      <CIcon height={25} name="cif-pl" title="pl" id="pl" />
                    </td>
                    <td>
                      <div className="clearfix">
                        <div className="float-left">
                          <strong>43%</strong>
                        </div>
                        <div className="float-right">
                          <small className="text-muted">Jun 11, 2015 - Jul 10, 2015</small>
                        </div>
                      </div>
                      <CProgress className="progress-xs" color="success" value="43" />
                    </td>
                    <td className="text-center">
                      <CIcon height={25} name="cib-cc-amex" />
                    </td>
                    <td>
                      <div className="small text-muted">Last login</div>
                      <strong>Yesterday</strong>
                    </td>
                  </tr>
                </tbody>
              </table>

            </CCardBody>
          </CCard>
        </CCol>
      </CRow> */}
    </>
  )
}

export default Dashboard
