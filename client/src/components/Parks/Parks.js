import { Link } from 'react-router-dom';

function Parks({ name, address, url}) {
    // Check if the URL has a protocol, if not, prepend with 'http://'
    const externalUrl = url.startsWith('http') ? url : `http://${url}`;
    return (
        <div>
            <Link to={`/park/${name}`} style={{'textDecoration': 'none'}}>
                <div className="card" style={{ 'width': '24rem' }}>
                    <div className="card-body">
                        <h5 className="card-title">{name}</h5>
                        <h6 className="card-subtitle mb-2 text-muted">{address}</h6>
                        <a href={externalUrl} className="card-link" target="_blank" rel="noopener noreferrer">Their site</a>
                    </div>
                </div>
            </Link>
        </div>
    )
}

export default Parks;
