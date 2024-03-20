import axios from 'axios'
import React from 'react'
import { useNavigate } from 'react-router-dom'

function ForgotPass() {
    const [mail, setMail] = React.useState()
    const navigate = useNavigate()
    const handleForgot = async (e) => {
        e.preventDefault()
        try {
            const reqBody = {
                email: mail
            }

            const response = await axios.post('/api/user/forgot-password', reqBody)

            console.log(response);
            window.alert("Mail has been sent succesfully")
        } catch (error) {
            console.log(error);
        }
        navigate('/login')
    }

    return (
        <div>
            <input
                type="email"
                name="email"
                id="email"
                placeholder='enter email id'
                value={mail}
                onChange={(e) => setMail(e.target.value)}
            />
            <button type="submit" onClick={handleForgot}>Login</button>
        </div>
    )
}

export default ForgotPass