import { useState } from "react";
import '../RegisterForm/RegisterForm.css'
import { useNavigate } from "react-router-dom";

function RegisterForm() {

    const [inputs, setInputs] = useState({});
    const navigate = useNavigate();

    const handleChange = (event) => {
        const fieldName = event.target.name;
        const fieldValue = event.target.value;
        setInputs(values => ({ ...values, [fieldName]: fieldValue }));
    }

    const handleSubmit = async(event) => {
        event.preventDefault();
        let RegisterCredentials = {};
        RegisterCredentials.email = inputs.username;
        RegisterCredentials.password = inputs.password;
        try {
            const response = await fetch('http://localhost:8080/users/register', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify(inputs)
            });
            if (response.ok) {
              alert(`Registration successful`);
              navigate('/login');
            } else {
              alert(`Registration failed, try again`);
            }
          } catch (error) {
            console.error('Error registering user:', error);
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

export default RegisterForm;