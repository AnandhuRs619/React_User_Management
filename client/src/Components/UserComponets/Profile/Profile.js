
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux'
import { imageUpload, verifyUserToken } from '../../../utils/Constants';
import { changeImage } from '../../../Redux/userimageReducer';
import { change } from '../../../Redux/usernameReducer';
import axios from '../../../utils/axios'
import Header from '../Home/Header';
import Swal from 'sweetalert2';


function Profile() {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [name, setName] = useState('')
    const [email, setemail] = useState('')
    const [image, setImage] = useState('')

    const userImage = useSelector((state) => {
        return state.userImage;
    })

    useEffect(() => {
        const Token = localStorage.getItem('token');
        if (!Token) {
            navigate('/');
        } else {
            const body = JSON.stringify({ Token });
            axios.post(verifyUserToken, body, { headers: { "Content-Type": "application/json" } }).then((res) => {
                // if (res.data.token) {
                setName(res.data.user.userName)
                setemail(res.data.user.email)
                setImage(res.data.user.image)
                dispatch(change(res.data.user.userName))
                dispatch(changeImage(res.data.user.image))
                // } else {
                //     localStorage.removeItem('token');
                // }
            })
        }
    }, [navigate, dispatch]);

    const addImage = async () => {
        const { value: file } = await Swal.fire({
            title: 'Select image',
            input: 'file',
            inputAttributes: {
                'accept': 'image/*',
                'aria-label': 'Upload your profile picture'
            }
        })
        if (file) {
            const reader = new FileReader()
            reader.onload = (e) => {
                Swal.fire({
                    title: "img",
                    imageUrl: e.target.result,
                    imageHeight: 400,
                    showDenyButton: true,
                    showCancelButton: true,
                    confirmButtonText: 'Update',
                    denyButtonText: `Change`,
                }).then((result) => {
                    if (result.isConfirmed) {
                        uploadimg(file)

                    } else if (result.isDenied) {
                        addImage()
                    }
                })
            }
            reader.readAsDataURL(file)
        }
        function uploadimg(file) {
            const Token2 = localStorage.getItem("token");
            let Stoken = JSON.stringify(Token2)
            let formData = new FormData();
            formData.append("image", file)
            axios.post(`${imageUpload}/${Stoken}`, formData,).then((res) => {
                setImage(res.data.image)
                dispatch(changeImage(res.data.image))
            }).catch((err) => {
                console.log(err);
            })
        }
    }

    return (
        <div>
            <Header />
            <div class="w-full h-screen flex items-center justify-center">
                <div class="w-1/2  md:w-[30%] border p-5 flex-wrap md:flex items-center justify-center shadow rounded-lg">
                    <div class="flex flex-col items-center">
                        <img class="rounded-lg shadow" width={150} src={userImage} alt="profile" />
                        <span class="uppercase font-bold mt-2">{name}</span>
                        <button onClick={addImage} type="button" class="border p-1 px-3 rounded bg-green-500 text-white hover:bg-green-600" >
                            Update Image
                        </button>
                    </div>
                    <div class="w-full h-full flex items-center justify-center mt-3">
                        <div class="flex flex-col">
                            <div className='flex items-center justify-center font-bold'>
                                <h4 class="text-right">Profile Settings</h4>
                            </div>
                            <label class="mt-2"> <span className='font-bold'>Name</span> : {name} </label>
                            <label class=""> <span className='font-bold'>Email</span> : {email} </label>
                        </div>
                    </div>
                    <div class="col-md-4">
                    </div>
                </div>
            </div>
        </div>

    )
}

export default Profile