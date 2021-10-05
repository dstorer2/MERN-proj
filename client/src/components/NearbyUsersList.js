import React, { useEffect } from "react";
import UserCard from "./UserCard";

const NearbyUsersList = props => {
    const nearbyUsers = props.users;

    useEffect(()=> {
        console.log("nearby users from the NearbyUsersList component", nearbyUsers)
    }, [])

    return(
        <div className="nearbyUsersSideBar">
            <h1>Nearby Musicians ⤵️</h1>
            {
                nearbyUsers[0].map((item, i) => {
                    console.log("item", item)
                    return(
                        <UserCard key={i} userData={item} />
                    )
                })
            }
        </div>
    )
}

export default NearbyUsersList;