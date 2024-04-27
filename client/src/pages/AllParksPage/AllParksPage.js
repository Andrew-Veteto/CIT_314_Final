import Header from '../../components/Header/Header';
import Parks from '../../components/Parks/Parks';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { nanoid } from 'nanoid';
import './AllParksPage.css';

function AllParksPage() {

    const [parks, setParks] = useState([]);

    useEffect(() => {
        const loadParks = async () => {
            try {
                const response = await axios.get('http://localhost:8080/parks/all');
                setParks(() => [...response.data]);
            }
            catch (error) {
                console.error(error);
            }
        }
        loadParks();
    }, []);

    const parkList = parks.map((park) => (
        <Parks
            key={nanoid()}
            name={park.Park_Name}
            address={park.Address}
            url={park.Park_URL}
        />
    ))

    return (
        <div>
            <Header />
            <div className='container'>
                <h1>All Parks:</h1>
                <hr />
                <br />
                <div className='parkList'>
                    {parkList}
                </div>
            </div>
        </div>
    )
}

export default AllParksPage;