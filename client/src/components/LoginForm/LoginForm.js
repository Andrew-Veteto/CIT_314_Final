import { useState } from "react";
import '../LoginForm/LoginForm.css'
import { useNavigate, Navigate } from "react-router-dom";
import axios from 'axios';
import useToken from '../../hooks/useToken';
import useID from '../../hooks/useID';

function LoginForm() {

    const [inputs, setInputs] = useState({});
    const { token, setToken } = useToken();
    const { _id, setID } = useID();
    const navigate = useNavigate();

    if (token) {
        return <Navigate replace to='/profile'/>
    }

    async function loginUser(credentials) {
        try {
            const res = await axios.post('http://localhost:8080/users/login', credentials);
            return res.data;
        } catch (error) {
            return null
        }
    };

    const handleChange = (event) => {
        const fieldName = event.target.name;
        const fieldValue = event.target.value;
        setInputs(values => ({ ...values, [fieldName]: fieldValue }));
    }

    const handleSubmit = async(event) => {
        event.preventDefault();
        let loginCredentials = {};
        loginCredentials.username = inputs.username;
        loginCredentials.password = inputs.password;
        const loginResponse = await loginUser(loginCredentials);
        if (loginResponse == null) {
            alert('That username and password is not valid!');
        } else {
            setToken(loginResponse.accessToken);
            setID(loginResponse._id)
            navigate('/profile');
        }
    }

    return (
        <div className="Form-Container">
            <form className="Form" action="post" onSubmit={handleSubmit}>
                <div>
                    <label>Username:</label>
                    <br />
                    <input type="text" value={inputs.username} name="username" placeholder="Username" onChange={handleChange} required />
                </div>
                <div>
                    <label>Password:</label>
                    <br />
                    <input type="password" value={inputs.password} name="password" placeholder="********" onChange={handleChange} required />
                </div>
                <br />
                <div className="Form-Container">
                    <button className="btn" type="submit">Submit</button>
                </div>
            </form>
        </div>
    )
}

export default LoginForm;