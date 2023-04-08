import React from 'react'
import {BrowserRouter as Router  , Route, Routes } from 'react-router-dom'
import SideBar from '../../components/dashboardComponents/SideBar'
import Main from '../../components//dashboardComponents/Main'
import AddProducts from '../../components/dashboardComponents/AddProducts'

function UserDashboard() {
  return (
    <div className='userdashboard' >
        <SideBar />
        <Main />
    </div>
  )
}

export default UserDashboard