import axios from 'axios';
import React, { useEffect, useState } from 'react';
import MapContainer from '../components/MapContainer';
import NearbyUserList from './NearbyUsersList';

const Load = props => {
    const {userData} = props;
    const defaultCenter = props.defaultCenter

    const [nearbyUsers, setNearbyUsers] = useState([])

    useEffect(() => {
        console.log("What is userData?", userData)
        axios.get("http://localhost:8000/api/user/nearbyUsers/"+userData.city)
            .then(res=>{
                console.log("find all users function results:", res.data.results)
                setNearbyUsers(res.data.results)
            })
            .catch(err=>console.log("something went wrong... poop :(", err))
    }, [])


    return(
        <div>
            {
                nearbyUsers.length > 0 ?
                <div>
                    <NearbyUserList users={nearbyUsers} />
                    <MapContainer userData={userData} defaultCenter={defaultCenter} nearbyUsers={nearbyUsers}/>
                </div>: 
                null
            }
        </div>
    )
}

export default Load;