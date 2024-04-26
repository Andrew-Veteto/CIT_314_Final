import { Navigate } from "react-router-dom";
import Header from "../../components/Header/Header";
import RegisterForm from "../../components/RegisterForm/RegisterForm";

function RegisterPage() {

    if (localStorage.getItem('_id')) {
        return <Navigate replace to='/profile'/>
    }

    return (
        <div>
            <div>
                <Header />
            </div>
            <br />
            <h1 style={{"textAlign": "center"}}>Register:</h1>
            <div>
                <RegisterForm/>
            </div>
        </div>
    )
}

export default RegisterPage;