import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {
  CCreateElement,
  CSidebar,
  CSidebarBrand,
  CSidebarNav,
  CSidebarNavDivider,
  CSidebarNavTitle,
  CSidebarMinimizer,
  CSidebarNavDropdown,
  CSidebarNavItem,
  CImg
} from '@coreui/react'

import CIcon from '@coreui/icons-react'

// sidebar nav config
import navigation from './_nav'
import navigationAdmin from './_nav_admin'

const TheSidebar = () => {
  const [role, setRole] = useState('')
  const dispatch = useDispatch()
  const show = useSelector(state => state.sidebarShow)

  const checkRole = () => {
    localStorage.getItem('admin_id') ? setRole('admin') : setRole('user')
  }

  useEffect(() => {
    checkRole()
  },[])

  return (
    <CSidebar
      show={show}
      onShowChange={(val) => dispatch({type: 'set', sidebarShow: val })}
    >
      <CSidebarBrand className="d-md-down-none">
        {/* <CImg src="avatars/test.jpeg"/> */}
        <h1>SIRAL</h1>
        {/* <CIcon
          className="c-sidebar-brand-full"
          name="cilospital"
          height={35}
        /> */}
        {/* <CIcon
          className="c-sidebar-brand-minimized"
          name="sygnet"
          height={10}
        /> */}
      </CSidebarBrand>
      <CSidebarBrand>
        <h5>Sistem Rawat Jalan</h5>
      </CSidebarBrand>
      <CSidebarNav>
        {
          role === 'user' ? 
          <CCreateElement
            items={navigation}
            components={{
              CSidebarNavDivider,
              CSidebarNavDropdown,
              CSidebarNavItem,
              CSidebarNavTitle
            }}
          /> :
          <CCreateElement
          items={navigationAdmin}
          components={{
            CSidebarNavDivider,
            CSidebarNavDropdown,
            CSidebarNavItem,
            CSidebarNavTitle
          }}
        />
        }
      </CSidebarNav>
      <CSidebarMinimizer className="c-d-md-down-none"/>
    </CSidebar>
  )
}

export default React.memo(TheSidebar)
