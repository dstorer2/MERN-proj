import React, { useState } from 'react'
import axios from 'axios';
import { useHistory } from 'react-router';

const Login = (props) => {
    const [formInfo, setFormInfo] = useState({
        email: "",
        password: ""
    })
    
    const [errors, setErrors] = useState({});
    const history = useHistory();

    const handleChange = event => {
        event.preventDefault();
        setFormInfo({
            ...formInfo,
            [event.target.name]: event.target.value
        })
    }

    const login = event => {
        event.preventDefault();
        axios.post("http://localhost:8000/api/login", formInfo, {withCredentials: true})
            .then(res => {
                console.log(res)
                if(res.data.message === "login was successful!") {
                    history.push("/dashboard/"+res.data._id)
                } else {
                    setErrors({message: res.data.message})
                    console.log(res.data.message)
                }
            })
            .catch( err => {
                console.log(err)
            })
    }

    return(
        <div>
        <h1>Login</h1>
        <form onSubmit={login}>
            <div className="form-group">
                <label>Email: </label>                
                <input type="text" name="email" className="form-control" onChange={handleChange}/>
                <span className="alert-danger">{errors && errors.message}</span>
            </div>
            <div className="form-group">
                <label>Password: </label>                
                <input type="password" name="password" className="form-control" onChange={handleChange}/>
            </div>
            <input type="submit" value="Tune In" className="btn btn-primary"/>
        </form>
    </div>
    )
}

export default Login;