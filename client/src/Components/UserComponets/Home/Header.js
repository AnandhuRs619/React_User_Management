import React, { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from '../../../utils/axios'
import Swal from 'sweetalert2';
import { useDispatch, useSelector } from 'react-redux';
import { change } from '../../../Redux/usernameReducer';
import { changeImage } from '../../../Redux/userimageReducer';
import { verifyUserToken } from '../../../utils/Constants';

function Header() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const handleLogoutUser = (e) => {
        e.preventDefault();
        Swal.fire({
            title: 'Logout?',
            text: "Do you want to Logout?",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Logout'
        }).then((result) => {
            if (result.isConfirmed) {
                localStorage.clear();
                dispatch({ type: 'logout' })
                navigate('/')
            }
        })
    }
    useEffect(() => {
        const Token = localStorage.getItem('token');
        if (!Token) {
            navigate('/');
        } else {
            const body = JSON.stringify({ Token });
            axios.post(verifyUserToken, body, { headers: { "Content-Type": "application/json" } }).then((res) => {
                // if (res.data.token) {
                dispatch(change(res.data.user.userName))
                dispatch(changeImage(res.data.user.image))
                // } else {
                //     localStorage.removeItem('token');
                // }
            })
        }
    }, [dispatch]);
    const username = useSelector((state) => state.username)
    const userImage = useSelector((state) => {
        return state.userImage;
    })
    return (
        <nav class="flex shadow" >
            <div class="w-full flex p-4 px-5 md:px-10 bg-blue-500 items-center justify-between">
                <div>
                    <Link to={"/home"}>
                        <h1 className='text-2xl font-bold uppercase'>{username}</h1>
                    </Link>
                </div>
                <div class="flex items-center gap-3" id="navbarSupportedContent">
                    <form class="">
                        <button className='border rounded-md p-1 px-2 bg-green-500 hover:bg-red-700 text-white' onClick={handleLogoutUser} type="submit">logout</button>
                    </form>
                    <Link className='flex items-center' to={"/Profile"}>
                        <img src={userImage} className='rounded-[50%] w-[40px] h-[40px]' alt='proSide' />
                    </Link>
                </div>
            </div>
        </nav>
    )
}

export default Header