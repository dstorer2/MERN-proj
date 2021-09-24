import React from 'react';
import Register from '../components/Register';
import Login from '../components/Login';

const SignIn = (props) => {
    return(
        <div className="row">
            <div className="col">
                <Register />
            </div>

            <div className="col">
                <Login />
            </div>
        </div>
    )
}


export default SignIn;