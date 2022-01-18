import React, { useState } from 'react'
import axios from 'axios';
import { useHistory } from 'react-router';
const {config} = require('../config/index.js')

const Register = (props) => {
    // const [instrumentInput, setInstrumentInput] = useState("")

    const [formInfo, setFormInfo] = useState({
        firstName:"",
        lastName:"",
        email:"",
        password:"",
        address: "",
        city: "",
        state: "",
        zip_code: "",
        location: {
            lat: 0,
            lng: 0
        }
    })

    const [errors, setErrors] = useState({});
    const history = useHistory();

    const handleChange = event => {
        setFormInfo({
            ...formInfo,
            [event.target.name]: event.target.value
        })
    }
    const [location, setLocation] = useState({
        location: {
            lat: "",
            lng: ""
        }
    })

    const getCoordinates = address => {
        let geoUrl = config.geo;
        geoUrl.query = "address="+address+"&key=AIzaSyAWB7uaYPitCLrrk1GN9Oo1I6VA3mwDg08";
        console.log(geoUrl)
        const url = geoUrl.href.toString()
        axios.get(url)
            .then(res => {
                setFormInfo({
                    ...formInfo,
                    location: {
                        lat: res.data.results[0].geometry.location.lat,
                        lng: res.data.results[0].geometry.location.lng,
                    }
                })
            })
            .catch(err=>console.log("Geocode api call error:", err))
    }

    const register = event => {
        event.preventDefault();
        const address = `${formInfo.address}+${formInfo.city}+${formInfo.state}+${formInfo.zip_code}`;
        getCoordinates(address);
        axios.post("http://localhost:8000/api/register", formInfo, {withCredentials: true})
            .then(res => {
                if(res.data.errors){
                    setErrors(res.data.errors)
                }
            })
            .catch(err => console.log(err))
        // axios.post("http://localhost:8000/api/register", formInfo, {withCredentials: true})
        //     .then(res => {
        //         console.log("here is res2", res)
        //         const _id = res.data.user._id;
        //         if(res.data.errors){
        //             setErrors(res.data.errors)
        //         } else {
        //             const addressString = res.data.user.address + "+" + res.data.user.city + "+" + res.data.user.state + "+" + res.data.user.zip_code;
        //             console.log("addressString:", addressString)
        //             axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${addressString}&key=AIzaSyAWB7uaYPitCLrrk1GN9Oo1I6VA3mwDg08`)
        //                 .then(res=>{
        //                     console.log(res);
        //                     setLocation(() => { 
        //                         location.location.lat = res.data.results[0].geometry.location.lat;
        //                         location.location.lng = res.data.results[0].geometry.location.lng;
        //                     })
        //                     console.log(location);
        //                     axios.patch("http://localhost:8000/api/user/update/"+ _id, location)
        //                         .then(res=>{
        //                             console.log(res);
        //                             history.push("/instruments/"+_id)
        //                         })
        //                         .catch(err=>console.log(err))
        //                 })
        //                 .catch(err=>console.log("Geocode api call error:", err))
        //         }
        //     })
        //     .catch(err => {
        //         console.log(err)
        //     })
    }
    
    return(
        <div>
            <h1>Register</h1>
            <form onSubmit={register} id="regForm"> 
                <div className="form-group">
                    <label>First Name: </label>                
                    <input type="text" name="firstName" className="form-control" aria-label='firstName' onChange={handleChange}/>
                    <span className="alert-danger">{errors.firstName && errors.firstName.message}</span>
                </div>
                <div className="form-group">
                    <label>Last Name: </label>                
                    <input type="text" name="lastName" className="form-control" aria-label='lastName' onChange={handleChange}/>
                    <span className="alert-danger">{errors.lastName && errors.lastName.message}</span>
                </div>
                <div className="form-group">
                    <label>Email: </label>                
                    <input type="text" name="email" className="form-control" aria-label='email' onChange={handleChange}/>
                    <span className="alert-danger">{errors.email && errors.email.message}</span>
                </div>
                <div className="form-group">
                    <label>Password: </label>                
                    <input type="password" name="password" className="form-control" aria-label='password' onChange={handleChange}/>
                    <span className="alert-danger">{errors.password && errors.password.message}</span>
                </div>
                <div className="form-group">
                    <label>Confirm Password: </label>                
                    <input type="password" name="confirm" className="form-control" aria-label='confPass' onChange={handleChange}/>
                    <span className="alert-danger">{errors.confirm && errors.confirm.message}</span>
                </div>
                <div className="form-group">
                    <label>Address: </label>                
                    <input type="text" name="address" className="form-control" aria-label='address' onChange={handleChange}/>
                    <span className="alert-danger">{errors.address && errors.address.message}</span>
                </div>
                <div className="form-group">
                    <label>City: </label>                
                    <input type="text" name="city" className="form-control" aria-label='city' onChange={handleChange}/>
                    <span className="alert-danger">{errors.city && errors.city.message}</span>
                </div>
                <div className="form-group">
                    <label>State: </label>                
                    <input type="text" name="state" className="form-control" aria-label='state' onChange={handleChange}/>
                    <span className="alert-danger">{errors.state && errors.state.message}</span>
                </div>
                <div className="form-group">
                    <label>Zip Code:  </label>                
                    <input type="number" name="zip_code" className="form-control" aria-label='zip_code' onChange={handleChange}/>
                    <span className="alert-danger">{errors.zip_code && errors.zip_code.message}</span>
                </div>
                <input type="submit" value="Tune In" className="btn btn-primary"/>
            </form>
        </div>
    )
}

export default Register;