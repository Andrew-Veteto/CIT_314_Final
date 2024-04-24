import { useState } from "react";

export default function useID() {
    function getID() {
        const IDString = localStorage.getItem('_id');
        const userID = JSON.parse(IDString);
        if (userID) {
            return useID;
        } else {
            return null;
        }
    }

    const [_id, setID] = useState(getID());

    function saveID(useID) {
        localStorage.setItem('_id', JSON.stringify(useID));
        setID(useID);
    }

    return{
        _id,
        setID: saveID
    }
    
}