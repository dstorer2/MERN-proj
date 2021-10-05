import React from "react";

const NavBar = props => {
    const user = props.userData;

    return(
        <div className="navBar">
            <h1>Welcome, {user.firstName}</h1>
            <div className="navRight">
                <a href={`/profile/${user._id}`}>Profile</a>
            </div>
        </div>
    )
}

export default NavBar;