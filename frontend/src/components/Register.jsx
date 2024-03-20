import React from 'react'
// import { useDispatch, useSelector } from 'react-redux'
// import { register } from '../features/userSlice'
// register

import axios from 'axios';
import { useNavigate } from 'react-router-dom';
// import { Navigate } from 'react-router-dom';

function Register() {
    const navigate = useNavigate()

    // const dispatch = useDispatch()
    // const userLoggedIn = useSelector(state => state.userLoggedIn)

    // const [userLoggedIn, setUserLoggedIn] = React.useState(false)
    const [userData, setUserData] = React.useState({
        username: "",
        email: "",
        fullname: "",
        password: ""
    })

    const [file, setFile] = React.useState()
    const handleChange = (e) => {
        const { name, value } = e.target;
        setUserData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };
    // const handleChange = (e) => {
    //     const { name, value, files } = e.target;

    //     if (name === 'avatar') {
    //         if (files.length > 0) {
    //             // If a file is selected, update the avatar field with the file object
    //             setUserData(prevState => ({
    //                 ...prevState,
    //                 avatar: files[0]
    //             }));
    //         } else {
    //             // If no file is selected, clear the avatar field
    //             setUserData(prevState => ({
    //                 ...prevState,
    //                 avatar: null
    //             }));
    //         }
    //     } else {
    //         // For other fields, update the state as usual
    //         setUserData(prevState => ({
    //             ...prevState,
    //             [name]: value
    //         }));
    //     }
    // };

    const handleRegister = async (e) => {
        e.preventDefault()
        // dispatch(register(userData))
        // console.log("axaca");

        try {
            const formData = new FormData();
            formData.append('avatar', file);
            formData.append('username', userData.username);
            formData.append('email', userData.email);
            formData.append('fullname', userData.fullname);
            formData.append('password', userData.password);
            console.log(userData);
            const response = await axios.post('/api/user/register', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })
            console.log(response);
            if (!response.data) {
                console.log("HELLO");
                throw response.message
            }
            window.alert(response.data.message)
            navigate("/login")
        } catch (error) {
            console.log("Error: ", error);
            window.alert(error.response.data.message || "Something went wrong")
        }
        setUserData({ name: "", email: "", password: "" })
    }

    // const handleLogin = () => {

    // }
    return (
        <div>
            {/* {userLoggedIn ?
                <>
                    <h1>Login Form</h1>
                    <input type="email" name="email" id="email" placeholder='enter email id' />
                    <input type="password" name="password" id="password" placeholder='enter password' />
                    <button type="submit" onClick={handleLogin}>Login</button>
                </>
                : */}
            <>
                <h1>Register Form</h1>
                <input
                    type="text"
                    name="username"
                    id="username"
                    placeholder='enter your username'
                    value={userData.username}
                    onChange={handleChange}
                />
                <input
                    type="email"
                    name="email"
                    id="email"
                    placeholder='enter email id'
                    value={userData.email}
                    onChange={handleChange}
                />
                <input
                    type="text"
                    name="fullname"
                    id="fullname"
                    placeholder='enter fullname'
                    value={userData.fullname}
                    onChange={handleChange}
                />
                <input
                    type="password"
                    name="password"
                    id="password"
                    placeholder='enter password'
                    value={userData.password}
                    onChange={handleChange}
                />
                {/* File input */}
                <input
                    type="file"
                    name="avatar"
                    id="avatar"
                    onChange={(e) => setFile(e.target.files[0])}
                />
                <button type="submit" onClick={handleRegister}>Register</button>
            </>
            {/* } */}
        </div>
    )
}

export default Register