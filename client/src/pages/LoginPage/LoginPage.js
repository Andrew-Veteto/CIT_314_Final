import { Navigate } from "react-router-dom";
import Header from "../../components/Header/Header";
import LoginForm from '../../components/LoginForm/LoginForm';

function LoginPage() {

    if (localStorage.getItem('_id')) {
        return <Navigate replace to='/profile'/>
    }

    return (
        <div>
            <div>
                <Header />
            </div>
            <br />
            <h1 style={{"textAlign": "center"}}>Login:</h1>
            <div className="Form-Container">
                <LoginForm/>
            </div>
        </div>
    )
}

export default LoginPage;