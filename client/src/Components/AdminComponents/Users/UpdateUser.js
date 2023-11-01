import React, { useEffect, useState } from 'react'
import Footer from '../Footer/Footer'
import AdminHeader from '../Header/AdminHeader';
import axios from '../../../utils/axios'
import { adminEditUser, adminUpdateUser } from '../../../utils/Constants';
import { useNavigate, useParams } from 'react-router-dom';
import Swal from 'sweetalert2'

function UpdateUser() {
  const params = useParams();
  const navigate = useNavigate();
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');

  useEffect(() => {
    axios.get(`${adminEditUser}/${params.id}`).then((res) => {
      console.log(res.data.userData);
      setEmail(res.data.userData.email);
      setUserName(res.data.userData.userName);
    }).catch((err) => {
      alert(err)
    })
  }, [])


  const updateUserDetails = async (e) => {
    const body = { userName: userName, email: email }
    e.preventDefault(e);
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success no-hover',
        cancelButton: 'btn btn-danger no-hover'
      },
      buttonsStyling: false
    })

    swalWithBootstrapButtons.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Update it!',
      cancelButtonText: 'No, cancel!',
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        if (body.email === "" || body.userName === "") {
          Swal.fire(
            'Please Fill the components?',
            'It is neccessary',
            'question'
          )
        } else {
          axios.put(`${adminUpdateUser}/${params.id}`, body, { headers: { "Content-Type": "application/json" } }).then((response) => {
            console.log(response.data)
            if (response.data.userexists) {
              Swal.fire({
                title: 'Oops...USER EXISTS',
                text: "try again",
                height: "5rem",
              })
            } else {
              swalWithBootstrapButtons.fire(
                'Updated!',
                'User file has been Updated.',
                'success'
              )
              navigate('/users')
            }
          }).catch((err) => {
            Swal.fire({
              title: 'Oops...',
              text: "try again",
              height: "5rem",
            })
          })
        }
      } else if (
        result.dismiss === Swal.DismissReason.cancel
      ) {
        swalWithBootstrapButtons.fire(
          'Cancelled',
          'User is not updated:)',
          'error'
        )
      }
    })
  }
  return (
    <div>
      <AdminHeader />
      <div className='w-full h-screen flex items-center justify-center'>
        <div className='border p-5 rounded-md shadow'>
          <form className='' onSubmit={(e) => updateUserDetails(e)}>
            <div className="flex flex-col">
              <h1 className='font-bold text-xl mb-3'>UPDATE USER</h1>
              <label for="username"><b>Username</b></label>
              <input
                className='border p-2 rounded focus:outline-none mb-2'
                type="text"
                placeholder="Enter username"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                id="username"
                required=""
              />
              <label for="email"><b>Email</b></label>
              <input
                className='border p-2 rounded focus:outline-none mb-2'
                type="text"
                placeholder="Enter Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                id="email"
                required=""
              />
              <button className='rounded p-1 px-3 bg-green-500 hover:bg-green-600 text-white mt-2' type="submit">Update User</button>
            </div>
          </form>
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default UpdateUser