import axios from 'axios';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { setUser, setLoginStatus } from '../features/userSlice';
import { Link, useNavigate } from 'react-router-dom';

function Login() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [userData, setUserData] = useState({
        email: "",
        password: ""
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUserData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('/api/user/login', userData);
            const { user, accessToken, refreshToken } = response.data;

            localStorage.setItem('accessToken', accessToken);
            localStorage.setItem('refreshToken', refreshToken);

            const storeUser = {
                username: user.username,
                email: user.email,
                fullname: user.fullname,
                avatar: user.avatar
            };

            dispatch(setUser(storeUser));
            dispatch(setLoginStatus(true));
            navigate("/");
        } catch (error) {
            console.error("Error: ", error);
            window.alert(error.message || "Login failed. Please try again.");
        }
        setUserData({ email: "", password: "" });
    };

    return (
        <div>
            <input
                type="email"
                name="email"
                id="email"
                placeholder='enter email id'
                value={userData.email}
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
            <br />
            <br />
            <Link to='/forgot-password'>Forgot Password??</Link>
            <br />
            <Link to='/register'>New user?? Sign up now..</Link>
            <br />
            <button type="submit" onClick={handleLogin}>Login</button>
        </div>
    );
}

export default Login;


// import axios from 'axios';
// // import { useEffect } from "react";
// import React from 'react'
// import { useDispatch, useSelector } from 'react-redux';
// import { setUser, setLoginStatus } from '../features/userSlice';
// // import useUserContext from '../context/userContext';
// import { Link, useNavigate } from 'react-router-dom';


// function Login() {
//     const navigate = useNavigate()
//     const dispatch = useDispatch();

//     const [userData, setUserData] = React.useState({
//         email: "",
//         password: ""
//     })

//     const handleChange = (e) => {
//         const { name, value } = e.target;
//         setUserData(prevState => ({
//             ...prevState,
//             [name]: value
//         }));
//     };

//     const handleLogin = async (e) => {
//         e.preventDefault();
//         try {
//             const response = await axios.post('/api/user/login', userData);
//             console.log(response);
    
//             const responseData = response.data;
    
//             if (!responseData || !responseData.user) {
//                 throw new Error("Login failed. Response data is invalid."); 
//             }
    
//             const { user, accessToken, refreshToken } = responseData;

//             localStorage.setItem('accessToken', accessToken);
//             localStorage.setItem('refreshToken', refreshToken);

//             const storeUser = {
//                 username: user.username,
//                 email: user.email,
//                 fullname: user.fullname,
//                 avatar: user.avatar
//             };
    
//             dispatch(setUser(storeUser));
//             dispatch(setLoginStatus(true));

//             navigate("/")
//             window.alert("Hello")
//         } catch (error) {
//             console.error("Error: ", error);
//             window.alert(error.message || "Login failed. Please try again.");
//         }
//         setUserData({ email: "", password: "" });
//     };
    
    
//     // const handleLogin = async (e) => {
//     //     e.preventDefault()
//     //     try {
//     //         console.log(userData);
//     //         const response = await axios.post('api/user/login', userData)
//     //         console.log(response);

//     //         const user = response.data.user
//     //         const accessToken = response.data.accessToken
//     //         const refreshToken = response.data.refreshToken

//     //         if (!response.data) {
//     //             console.log("HELLO");
//     //             throw response.message
//     //         }
//     //         localStorage.setItem('accessToken', accessToken);
//     //         localStorage.setItem('refreshToken', refreshToken);

//     //         console.log(user);
//     //         // const userName = user.name
//     //         // const userEmail = user.email
//     //         const storeUser = {
//     //             username: user.username,
//     //             email: user.email,
//     //             fullname: user.fullname,
//     //             avatar: user.avatar
//     //         }

//     //         // setUser(storeUser)
//     //         // updateLoginStatus()

//     //         console.log(storeUser)
//     //         dispatch(setUser(storeUser))
//     //         dispatch(setLoginStatus(true))
//     //         // dispatch(setUser({ name: userName, email: userEmail }))
//     //         // console.log({
//     //         //     name: user.name,
//     //         //     email: user.email
//     //         // });
//     //         // console.log(storeUser);
//     //         // console.log(response.data.message)
//     //         // window.alert(response.data.message)
//     //         // window.location = "/";
//     //         // history.push('/')
//     //         // redirect('/')
//     //         navigate("/")
//     //     } catch (error) {
//     //         console.log("Error: ", error);
//     //         window.alert(error.response.data.message || "Something went wrong")
//     //     }
//     //     setUserData({ email: "", password: "" })
//     // }
//     return (
//         <div>
//             <input
//                 type="email"
//                 name="email"
//                 id="email"
//                 placeholder='enter email id'
//                 value={userData.email}
//                 onChange={handleChange}
//             />
//             <input
//                 type="password"
//                 name="password"
//                 id="password"
//                 placeholder='enter password'
//                 value={userData.password}
//                 onChange={handleChange}
//             />
//             {/* File input */}
//             {/* <input type="file" name="avatar" id="avatar" /> */}
//             <Link to='/forgot-password'>Forgot Password??</Link>
//             <button type="submit" onClick={handleLogin}>Login</button>
//         </div>
//     )
// }

// export default Login