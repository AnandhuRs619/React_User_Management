import React from 'react'
import { useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2';

function AdminHeader() {
  const navigate = useNavigate();
  const adminLogout1 = (e) => {
    e.preventDefault();
    Swal.fire({
      title: 'Logout?',
      text: "Do you want to Logout?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#1d5d9b',
      cancelButtonColor: '#ff6969',
      confirmButtonText: 'Logout'
    }).then((result) => {
      if (result.isConfirmed) {
        navigate('/admin')
      }
    })
  }
  return (
    <nav class="flex shadow">
      <div class=" w-full flex p-4 px-5 bg-blue-500 md:px-10 items-center justify-between">
        <a class="text-2xl font-bold" href="/adminHome">WELCOME ADMIN</a>
        <div class="">
          <form class="" >
            <button class="rounded p-1 px-3 bg-red-500 hover:bg-blue-700 text-white" onClick={adminLogout1} >Logout</button>
          </form>
        </div>
      </div>
    </nav>
  )
}
export default AdminHeader