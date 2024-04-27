import USA from '@svg-maps/usa';
import { SVGMap } from 'react-svg-map';
import { useNavigate } from 'react-router-dom';
import './MAP.css'

function MAP() {

    const navigate = useNavigate();
    var StateAbriviation = '';

    const handleClick = (event) => {
        StateAbriviation = event.target.id;
        navigate(`/state/${StateAbriviation}`);
    };

    return (
        <div className='map'>
            <SVGMap map={USA}
            onLocationClick={handleClick}
            locationClassName='location'
            />
        </div>
    )
}

export default MAP;