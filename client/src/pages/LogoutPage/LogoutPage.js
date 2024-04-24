import { Navigate } from 'react-router-dom';

export default function LogoutPage() {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('_id');
    return (
        <div>
            <Navigate replace to='/'/>
        </div>
    )
}