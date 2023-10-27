import React from "react";
import { useSelector } from "react-redux";

function UserEdit() {
    
    const userProfile = useSelector((state) => state.userAuthentication.userProfile);
    console.log("userProfile state:", userProfile);

    if (!userProfile) {
        return null;
    }

    return (
        <div className='header'>
        
            <form>
                <label htmlFor='firstName'></label>
                <input id="firstName" defaultValue={userProfile.firstName} type='text' required minLength="2" readOnly></input>
                <label htmlFor='lastName'></label>
                <input id="lastName" defaultValue={userProfile.lastName} type='text' required minLength="2" readOnly></input>
                <div>
                    <input type='submit' className="edit-button" value='Save' disabled />
                    <button className="edit-button" disabled>Cancel</button>
                </div>
            </form>
        </div>
    );
}

export default UserEdit;