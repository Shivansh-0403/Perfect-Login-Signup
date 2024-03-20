import axios from 'axios'
import React from 'react'
import { useNavigate, useParams } from 'react-router-dom'

function ResetPassword() {
    const [password, setPassword] = React.useState('')
    const [confirmPassword, setConfirmPassword] = React.useState('')
    const navigate = useNavigate()
    const { id, token } = useParams()

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            if (password !== confirmPassword) {
                throw new Error("Password don't match")
            }

            const reqBody = {
                password: password
            }

            const response = await axios.post(`/api/user/reset-password/${id}/${token}`, reqBody)
            if (!response){
                throw new Error("Failed..")
            }
            console.log(response);
            window.alert("Password reset successful")
            navigate("/login")
        } catch (error) {
            console.log(error);
        }
    }
    return (
        <div>
            <input type="password" name="password" id="password" onChange={(e) => setPassword(e.target.value)} placeholder='Password'/>
            <input type="password" name="confirm" id="confirm" onChange={(e) => setConfirmPassword(e.target.value)} placeholder='Confirm Password'/>
            <button onClick={handleSubmit}>Submit</button>
        </div>
    )
}

export default ResetPassword