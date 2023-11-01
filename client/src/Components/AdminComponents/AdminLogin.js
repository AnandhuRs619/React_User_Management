import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import axios from '../../utils/axios';
import { adminPostLogin } from '../../utils/Constants';
import Swal from 'sweetalert2';


function AdminLogin() {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleadminLogin = async (e) => {
        const body = JSON.stringify({
            email,
            password
        })
        e.preventDefault();
        if (!email || !password) {
            Swal.fire(
                'Please Fill the components?',
                'it is neccessary',
                'question'
            )
        } else {

            try {
                let admin = await axios.post(adminPostLogin, body, { headers: { "Content-Type": "application/json" } })
                if (admin.data.status === 'ok') {
                    navigate("/adminHome")
                }
                else {
                    Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: 'Invalid Credintaials!',
                    })
                }
            } catch (err) {
                alert(err)
            }
        }
    }

    return (
        <div className="w-screen h-screen mx-auto flex justify-center items-center">
            <div className="w-1/2 h-1/2 md:w-[400px] border p-5 rounded-lg shadow-md">
                <form onSubmit={(e) => handleadminLogin(e)} class="">
                    <h1 className="mb-3 text-2xl font-serif font-bold">Admin Login</h1>
                    <div class="">
                        <input type="email"
                            placeHolder="Email"
                            className="border w-full rounded p-2 mb-3 focus:outline-none"
                            name="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)} />
                    </div>
                    <div class="">
                        <input type="password"
                            placeHolder="Password"
                            className="border w-full rounded p-2 mb-3 focus:outline-none"
                            name="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)} />
                    </div>
                    <input className="w-full rounded p-2  bg-red-400 hover:bg-red-700 text-white" type="submit" value="Login" />
                </form>
            </div>
        </div>
    )
}

export default AdminLogin