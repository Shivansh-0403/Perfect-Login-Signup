import axios from "axios";
// import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setLoginStatus, setUser } from "../features/userSlice";

function Home() {
    const dispatch = useDispatch();
    const username = useSelector(state => state.user.username);
    const avatarUrl = useSelector(state => state.user.avatar);
    const loginStatus = useSelector(state => state.userLoggedIn);

    const handleLogout = async (e) => {
        e.preventDefault();
        const response = await axios.post('/api/user/logout');
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        dispatch(setUser({ username: "", email: "", fullname: "", avatar: "" }));
        dispatch(setLoginStatus(false));
        console.log(response.data.message);
        window.location.reload();
    };

    return (
        <div>
            <h1>Home</h1>
            <h2>Hello {username} -</h2>
            <h3>Status: {loginStatus ? "Yes" : "No"}</h3>
            <h4>{localStorage.getItem("accessToken")}</h4>
            <h4>{localStorage.getItem("refreshToken")}</h4>
            <img src={avatarUrl} alt="Avatar" />
            <button onClick={handleLogout}>Logout</button>
        </div>
    );
}

export default Home;
