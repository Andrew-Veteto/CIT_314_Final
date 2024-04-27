import { useNavigate } from 'react-router-dom';
import './Parks.css';

function Parks({ name, address, url }) {
    // Check if the URL has a protocol, if not, prepend with 'http://'
    const externalUrl = url.startsWith('http') ? url : `http://${url}`;
    const navigate = useNavigate();

    function goToPark() {
        navigate(`/park/${name}`);
    }

    return (
        <div className="card">
            <div className="card-body">
                <p className="card-title">{name}</p>
                <p className="card-subtitle">Address: {address}</p>
                <a href={externalUrl} className="card-link" target="_blank" rel="noopener noreferrer">Their site: <span style={{ "textDecoration": "underline" }}>Link</span></a>
            </div>
            <br />
            <div className='card-btn'>
                <button className='card-btn-btn' onClick={goToPark}>More Info</button>
            </div>
            <br />
        </div>
    )
}

export default Parks;
