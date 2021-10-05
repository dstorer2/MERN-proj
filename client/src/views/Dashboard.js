import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import Load from '../components/Load';
import NavBar from '../components/NavBar';


const Dashboard = props => {
    const {_id} = useParams();
    const [user, setUser] = useState({})
    const [defaultCenter, setDefaultCenter] = useState({})

    useEffect(() => {
        axios.get("http://localhost:8000/api/user/"+_id)
            .then(res=>{
                console.log("find single user function results:", res.data.results);
                setUser(res.data.results);
                setDefaultCenter({
                    lat: res.data.results.location.lat,
                    lng: res.data.results.location.lng
                })
            })
            .catch(err=>console.log(err))
    }, [])
    

    return(
        <div>
            {
                user.firstName ?
                    <div>
                        <NavBar userData={user} />
                        <Load userData={user} defaultCenter={defaultCenter} />
                    </div>:
                    null
            }
            
        </div>
    )
}

export default Dashboard;