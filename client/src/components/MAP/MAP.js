import USA from '@svg-maps/usa';
import { SVGMap } from 'react-svg-map';
import { useNavigate } from 'react-router-dom';

function MAP() {

    const navigate = useNavigate();
    var StateAbriviation = '';

    const handleClick = (event) => {
        StateAbriviation = event.target.id;
        navigate(`/state/${StateAbriviation}`);
    };

    return (
        <div>
            <div className=''>
                <SVGMap map={USA} onLocationClick={handleClick} />
            </div>
        </div>
    )
}

export default MAP;