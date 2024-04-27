import { Link as RouterLink, useLocation } from 'react-router-dom';
import './Header.css';

function Header() {
    const token = localStorage.getItem('_id');
    const location = useLocation();

    const isActive = (path) => {
        // Check if the current path matches the given path
        return location.pathname === path ? 'Active-Route' : '';
    };

    return (
        <nav className="navbar">
            <ul className="navbar-list">
                <li className="nav-item">
                    <RouterLink to='/' className={`Header-link ${isActive('/')}`}>Map</RouterLink>
                </li>
                <li className="nav-item">
                    <RouterLink to='/all' className={`Header-link ${isActive('/all')}`}>Parks</RouterLink>
                </li>
                <li className='nav-item'>
                    <RouterLink to='/profile' className={`Header-link ${isActive('/profile')}`}>Profile</RouterLink>
                </li>
                <li className='nav-item'>
                    {token ? (
                        <RouterLink to='/logout' className={`Header-link ${isActive('/logout')}`}>Logout</RouterLink>
                    ) : (
                        <RouterLink to='/login' className={`Header-link ${isActive('/login')}`}>Login</RouterLink>
                    )}
                </li>
                <li className='nav-item'>
                    {!token && (
                        <RouterLink to='/register' className={`Header-link ${isActive('/register')}`}>Register</RouterLink>
                    )}
                </li>
            </ul>
        </nav>
    );
}

export default Header;
