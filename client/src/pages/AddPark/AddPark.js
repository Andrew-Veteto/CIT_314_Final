import './AddPark.css';
import Header from '../../components/Header/Header';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function AddPark() {

    const [viewForm, setViewForm] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        if (localStorage.getItem('_id')) {
            setViewForm(true);
        }
    }, []);

    function goToLogin(){
        navigate('/login');
    }

    return (
        <div>
            <Header />
            <div className='AddParkcontainer'>
                <h1>New Park Form</h1>
                {viewForm ? (<form className='addParkForm' action={'http://localhost:8080/add-park'} method='POST'>
                    <br />
                    <label className='form-label' for="park_name">Name: </label>
                    <input type="text" id="park_name" name="park_name" required />
                    <br />
                    <br />
                    <label className='form-label' for="address">Address: </label>
                    <input type="text" id="address" name="address" required />
                    <br />
                    <br />
                    <label className='form-label' for="state">State Abbreviation: </label>
                    <input type="text" id="state" name="state" maxlength="2" required />
                    <br />
                    <br />
                    <label className='form-label' for="link">Website Link: </label>
                    <input type="url" id="link" name="link" required />
                    <br />
                    <br />
                    <label className='form-label' for="roller_coasters">Number of Roller Coasters: </label>
                    <input type="number" id="roller_coasters" name="roller_coasters" min="0" required />
                    <br />
                    <br />
                    <label className='form-label' for="flat_rides">Number of Flat Rides: </label>
                    <input type="number" id="flat_rides" name="flat_rides" min="0" required />
                    <br />
                    <br />
                    <label className='form-label' for="water_rides">Number of Water Rides: </label>
                    <input type="number" id="water_rides" name="water_rides" min="0" required />
                    <br />
                    <br />
                    <label className='form-label' for="arcade">Arcade: </label>
                    <input type="radio" id="arcade_yes" name="arcade" value="yes" />
                    <label for="arcade_yes">Yes</label>
                    <input type="radio" id="arcade_no" name="arcade" value="no" />
                    <label for="arcade_no">No</label>
                    <br />
                    <br />
                    <label className='form-label' for="water_park">Water Park: </label>
                    <input type="radio" id="water_park_yes" name="water_park" value="yes" />
                    <label for="water_park_yes">Yes</label>
                    <input type="radio" id="water_park_no" name="water_park" value="no" />
                    <label for="water_park_no">No</label>
                    <br />
                    <br />
                    <label className='form-label' for="kiddie_park">Kiddie Park: </label>
                    <input type="radio" id="kiddie_park_yes" name="kiddie_park" value="yes" />
                    <label for="kiddie_park_yes">Yes</label>
                    <input type="radio" id="kiddie_park_no" name="kiddie_park" value="no" />
                    <label for="kiddie_park_no">No</label>
                    <br />
                    <br />
                    <label className='form-label' for="sell_food">Sell Food: </label>
                    <input type="radio" id="sell_food_yes" name="sell_food" value="yes" />
                    <label for="sell_food_yes">Yes</label>
                    <input type="radio" id="sell_food_no" name="sell_food" value="no" />
                    <label for="sell_food_no">No</label>
                    <br />
                    <br />
                    <label className='form-label' for="family_accommodations">Family Accommodations: </label>
                    <input type="radio" id="family_accommodations_yes" name="family_accommodations" value="yes" />
                    <label for="family_accommodations_yes">Yes</label>
                    <input type="radio" id="family_accommodations_no" name="family_accommodations" value="no" />
                    <label for="family_accommodations_no">No</label>
                    <br />
                    <br />
                    <hr />
                    <br />
                    <div className='form-btn'>
                        <input className='form-btn-btn' type="submit" value="Submit" />
                    </div>
                </form>) : (
                    <div className='form-login-btn'>
                        <h3>Log in to add a park!</h3>
                        <button className='form-login-btn-btn' onClick={goToLogin}>Click Here</button>
                    </div>
                )}
            </div>
        </div>

    )
}

export default AddPark;