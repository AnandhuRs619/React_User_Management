import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Footer from '../Footer/Footer'
import AdminHeader from '../Header/AdminHeader'
import axios from '../../../utils/axios';
import Swal from 'sweetalert2';
import { signUpPost } from '../../../utils/Constants';

function AdminaddUsers() {

    const navigate = useNavigate();
    const [userName, setUserName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (e) => {
        const body = JSON.stringify({
            userName,
            email,
            password
        })
        e.preventDefault();
        if (userName === "" || email === "" || password === "") {
            Swal.fire(
                'Please Fill the components?',
                'That thing is still around?',
                'question'
            )
        } else {
            try {
                let response = await axios.post(signUpPost, body, { headers: { "Content-Type": "application/json" } })
                if (response.data.status == 'ok') {
                    Swal.fire(
                        'Good job!',
                        'Signup Sucess!',
                        'success'
                    )
                    console.log(response.data);
                    navigate('/users')
                } else {
                    Swal.fire({
                        icon: 'error',
                        title: 'Oops..',
                        text: 'User Already Registered!',
                    })
                    console.log("some error")
                }
            }
            catch (err) {
                console.log(err);
                alert(err)
                console.log("ivdaa")
            }
        }
    }

    return (
        <div>
            <AdminHeader />
            <div className='w-full h-screen flex items-center justify-center '>
                <div className='flex flex-col border p-5 rounded shadow'>
                    <form className='' onSubmit={(e) => handleSubmit(e)}>
                        <div className="flex flex-col">
                            <h1 className='text-xl font-bold mb-3'>ADD USER</h1>
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
                            <label for="email"><b>Password</b></label>
                            <input
                            className='border p-2 rounded focus:outline-none mb-2'
                                type="password"
                                placeholder="Enter Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                id="password"
                                required=""
                            />
                            <button className='bg-red-500 p-2 rounded hover:bg-red-700 text-white mt-2' type="submit">Add User</button>
                        </div>
                    </form>
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default AdminaddUsers