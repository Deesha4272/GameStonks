import './page2.css';
import React from "react";
import { Button } from 'react-bootstrap';
import history from './history';
/* Page 2 */


function page3() {
    return ( 
        <div className = "chat">
            <h1>Covid Hotspots in Your Area</h1>
            <h2> Display map</h2>
            <Button variant="btn btn-success" onClick={() => {history.push('/page3'); window.location.reload();}}>Button</Button>
        </div>
    );
}

export default page3;