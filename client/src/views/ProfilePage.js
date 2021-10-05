import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import NavBar from "../components/NavBar";

const ProfilePage  = props => {
    const {_id} = useParams();
    const [user, setUser] = useState({})

    useEffect(() => {
        axios.get("http://localhost:8000/api/user/"+_id)
            .then(res=>{
                console.log("find single user function results:", res.data.results);
                setUser(res.data.results);
            })
            .catch(err=>console.log(err))
    }, [])
    return(
        <div>
            <NavBar userData={user}/>
            <div className="profileUserInfo">
                
            </div>
        </div>
    )
}

export default ProfilePage;