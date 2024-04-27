import Header from "../../components/Header/Header";
import { useParams } from "react-router-dom";
import axios from 'axios';
import { useState, useEffect } from "react";
import { nanoid } from 'nanoid';
import './StateDetailPage.css'
import Parks from "../../components/Parks/Parks";

function StateDetailPage() {

    const params = useParams();
    const [parks, setParks] = useState([]);

    useEffect(() => {
        const loadParks = async () => {
            try {
                const State_Abbreviation = params.state.toLocaleUpperCase();
                const response = await axios.get(`http://localhost:8080/parks/${State_Abbreviation}`);
                setParks(() => [...response.data])
            }
            catch (error) {
                console.log(error);
            }
        }
        loadParks();
    }, [params.state])

    const parkList = parks.map((park) => (
        <Parks
            key={nanoid()}
            name={park.Park_Name}
            address={park.Address}
            url={park.Park_URL}
        />))

    const stateAbbreviations = {
        AL: 'Alabama',
        AK: 'Alaska',
        AZ: 'Arizona',
        AR: 'Arkansas',
        CA: 'California',
        CO: 'Colorado',
        CT: 'Connecticut',
        DE: 'Delaware',
        FL: 'Florida',
        GA: 'Georgia',
        HI: 'Hawaii',
        ID: 'Idaho',
        IL: 'Illinois',
        IN: 'Indiana',
        IA: 'Iowa',
        KS: 'Kansas',
        KY: 'Kentucky',
        LA: 'Louisiana',
        ME: 'Maine',
        MD: 'Maryland',
        MA: 'Massachusetts',
        MI: 'Michigan',
        MN: 'Minnesota',
        MS: 'Mississippi',
        MO: 'Missouri',
        MT: 'Montana',
        NE: 'Nebraska',
        NV: 'Nevada',
        NH: 'New Hampshire',
        NJ: 'New Jersey',
        NM: 'New Mexico',
        NY: 'New York',
        NC: 'North Carolina',
        ND: 'North Dakota',
        OH: 'Ohio',
        OK: 'Oklahoma',
        OR: 'Oregon',
        PA: 'Pennsylvania',
        RI: 'Rhode Island',
        SC: 'South Carolina',
        SD: 'South Dakota',
        TN: 'Tennessee',
        TX: 'Texas',
        UT: 'Utah',
        VT: 'Vermont',
        VA: 'Virginia',
        WA: 'Washington',
        WV: 'West Virginia',
        WI: 'Wisconsin',
        WY: 'Wyoming'
    };

    function getStateNameFromAbbreviation(abbreviation) {
        return stateAbbreviations[abbreviation.toLocaleUpperCase()];
    }

    const stateName = getStateNameFromAbbreviation(params.state);

    return (
        <div>
            <div>
                <Header />
            </div>
            <h1>Here are the parks for: {stateName}</h1>
            <br />
            <div className="parkList">
                {parkList}
            </div>
        </div>
    )
}

export default StateDetailPage;