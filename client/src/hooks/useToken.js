import { useState } from "react";

export default function useToken(){
    function getToken() {
        const tokenString = localStorage.getItem('accessToken');
        if (tokenString) {
            return tokenString;
        } else {
            return null;
        }
    }

    const [token, setToken] = useState(getToken());

    function saveToken(userToken) {
        localStorage.setItem('accessToken', JSON.stringify(userToken));
        setToken(useToken);
    }

    return {
        token,
        setToken: saveToken
    }
}