import React from 'react';

const UserCard = props => {
    const userData = props.userData;

    return(
        <div className="userCard">
            <div className="userCardLeft">
                <h3>{userData.firstName} {userData.lastName}</h3>
                <p>Instruments:</p>
                <ul className="instrumentList">
                {
                    userData.instruments.map((item, i)=> {
                        console.log("poop", item);
                        return(
                            <li key={i}>{item.instrument}; {item.proficiency}</li>
                        )
                    })
                }
                </ul>
            </div>
            <div className="userCardRight">
                <button className="btn btn-sm btn-success">Message</button>
                <button className="btn btn-sm btn-info">View Profile</button>
            </div>
        </div>
    )
}

export default UserCard;