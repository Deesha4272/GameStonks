import './page1.css';
import React from "react";
import history from './history';
import { Button } from 'react-bootstrap';

function Page1() {


    return (
        
        <div className = "page1">
            <div className = "center">
            <h1>FindMyHomie</h1>
            <h3>Search for homies that share your passion</h3>
            {/* Dropdown menu */}
            <label for="cars">Choose something you care about:</label>

            <select name="cars" id="cars">
            <option value="audi"></option>
            <option value="volvo">Environmentalism</option>
            <option value="saab">Feminism</option>
            <option value="mercedes">Equal Pay</option>
            <option value="mercedes">Black Lives Matter</option>
            </select>
            <div><Button variant="btn btn-success" onClick={() => {history.push('/page2'); window.location.reload();}}>Connect</Button></div>
            </div>
        </div>
        
    );
}

export default Page1;