import React, { Fragment } from 'react'
import Footer from '../Footer/Footer'
import { Link } from 'react-router-dom'
import AdminHeader from '../Header/AdminHeader'


function AdminDash() {
  return (
    <Fragment>
      <AdminHeader />
      <div id="" className="w-auto  h-screen flex items-center justify-center" >
        <div className="flex flex-col border  rounded-lg p-5 justify-center shadow items-center w-[600px] h-[400px]  bg-gray-100">
          <span className="text-2xl font-bold mb-2">USER DETAILS </span>
          <Link to={'/users'}><button className="border p-1 px-4 rounded-md bg-blue-500 hover:bg-blue-700 text-white">users</button></Link>
        </div>
      </div>
      <Footer />
    </Fragment>
  )
}

export default AdminDash