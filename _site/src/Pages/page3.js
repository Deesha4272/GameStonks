import './page2.css';
import React from "react";
import ReactDOM from 'react-dom'
/* Chat function on this page */


function chat() {

    function redirect() {
        window.location.href = 'http://localhost:5000';
        return null;
    } 

    const element = (
        <div className = "chat">
            <h1>FindMyHomie Page 2</h1>
            <h2> Chat function can go here</h2>
            {/* <button type="button" onclick="redirect()">Click Me!</button> */}
        </div>
      );
      

      ReactDOM.render(element, document.getElementById('root'));

    return ( 
        <div className = "chat">
            <h1>FindMyHomie Page 2</h1>
            <h2> Chat function can go here</h2>
             <button type="button" onclick={redirect()}>Click Me!</button>
        </div>
    );
}

export default chat;