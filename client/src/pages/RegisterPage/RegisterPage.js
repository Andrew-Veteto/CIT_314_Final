import Header from "../../components/Header/Header";
import RegisterForm from "../../components/RegisterForm/RegisterForm";

function RegisterPage() {
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