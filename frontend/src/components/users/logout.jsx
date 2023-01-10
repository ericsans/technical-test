import React from 'react';
import { logout } from '../../services/authenticationService';

const Logout = () => {
    
    React.useEffect(() => {
        logout();
        window.location = "/login";
    });

    return null;
}
 
export default Logout;