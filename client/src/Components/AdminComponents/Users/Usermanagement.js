import React, { useEffect, useState } from 'react'
import Footer from '../Footer/Footer'
import AdminHeader from '../Header/AdminHeader'
import axios from '../../../utils/axios'
import { adminDeleteUser, admingetAllusers, adminSearchUser } from '../../../utils/Constants'
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2'

function Usermanagement() { 
    const navigate = useNavigate()
    const [users, setUsers] = useState([])
    useEffect((key) => {
        getUserLists();
    }, [])
    const getUserLists = () => {
        axios.get(admingetAllusers).then((response) => {
            setUsers(response.data.users)
        }).catch((err) => {
            console.log("oops user catch client");
        })
    }
    const userSearch = (e) => {
        let userr = e.target.value;
        console.log(userr);
        if (!userr) {
            getUserLists();
        } else {
            axios.get(`${adminSearchUser}/${userr}`).then((res) => {
                setUsers(res.data.users)
            })
        }
    }

    const deleteUser = (id) => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to retrive this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes,delete it!'
        }).then((result) => {
            if (result.isConfirmed) {
                axios.delete(`${adminDeleteUser}/${id}`).then((res) => {
                    getUserLists();

                })
                Swal.fire(
                    'Deleted!',
                    'User has been deleted.',
                    'success'
                )
            }
        })
    }

    return (
        <div className='w-full h-full'>
            <AdminHeader />
            <div className='w-full h-screen flex items-center justify-center '>
                <div className='w-full h-full flex flex-col items-center justify-center'>
                    <div className=' flex gap-4'>
                        <input className="border focus:outline-none p-2 rounded-md" onChange={userSearch} name="query" type="search" placeholder="Search" aria-label="Search" />
                        <button className="p-1 px-3 rounded bg-green-500 hover:bg-green-600 text-white" onClick={() => navigate('/adminAddUser')} >add</button>
                    </div>
                    <div className="w-1/2 md:w-[800px] overflow-hidden border rounded-lg mt-3">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th scope="col" className="px-6 py-3 text-xs font-bold text-left text-gray-500 uppercase ">
                                        ID
                                    </th>
                                    <th scope="col" className="px-6 py-3 text-xs font-bold text-left text-gray-500 uppercase ">
                                        Name
                                    </th>
                                    <th scope="col" className="px-6 py-3 text-xs font-bold text-left text-gray-500 uppercase ">
                                        Email
                                    </th>
                                    <th scope="col" className="px-6 py-3 text-xs font-bold text-right text-gray-500 uppercase ">
                                        Edit
                                    </th>
                                    <th scope="col" className="px-6 py-3 text-xs font-bold text-right text-gray-500 uppercase ">
                                        Delete
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200">
                                {users.map((obj, index) =>
                                <tr>
                                    <td className="px-6 py-4 text-sm font-medium text-gray-800 whitespace-nowrap">
                                    {index + 1}
                                    </td>
                                    <td className="px-6 py-4 text-sm text-gray-800 whitespace-nowrap">
                                    {obj.userName}
                                    </td>
                                    <td className="px-6 py-4 text-sm text-gray-800 whitespace-nowrap">
                                    {obj.email}
                                    </td>
                                    <td className="px-6 py-4 text-sm font-medium text-right whitespace-nowrap">
                                    <button className='text-green-500 hover:text-green-700' onClick={() => navigate(`/updateUser/${obj._id}`)} >Edit</button>
                                    </td>
                                    <td className="px-6 py-4 text-sm font-medium text-right whitespace-nowrap">
                                    <button className='text-red-500 hover:text-red-700' onClick={() => deleteUser(obj._id)}>Delete</button>
                                    </td>
                                </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default Usermanagement