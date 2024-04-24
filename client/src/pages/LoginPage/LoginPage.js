import Header from "../../components/Header/Header";
import LoginForm from '../../components/LoginForm/LoginForm';

function LoginPage() {
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