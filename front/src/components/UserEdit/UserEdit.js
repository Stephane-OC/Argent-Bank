import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateUserProfile } from '../../service/apiService';
import { setUserProfile } from '../../utils/store';

/* UserEdit component allows for editing  first and last name of user's profile.  **
**                                                                                **
** It utilizes Redux state for accessing and dispatching user's profile data.     **
** Component contains input fields for first and last name, which are pre-filled  **
** with current profile data. These fields are controlled inputs,                 **
** with their state being managed locally within component.                       **
**                                                                                **
** Upon form submission, `updateUserProfile` function is called with updated      **
** data, and Redux state is updated accordingly. If update is successful,         **
** editing form is closed by calling `onCloseEdit` function passed as a prop.     **
**                                                                                **
** If there is an error during profile update process, it is logged to console.   **
** This component is intended to be used where a user has option to edit their    **
** profile information.                                                           */

function UserEdit({ onCloseEdit }) {
  const dispatch = useDispatch();
  const userProfile = useSelector((state) => state.userAuthentication.userProfile);
  const token = useSelector((state) => state.userAuthentication.token);

  // Local state for editable fields
  const [firstName, setFirstName] = useState(userProfile.firstName);
  const [lastName, setLastName] = useState(userProfile.lastName);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const updatedProfile = await updateUserProfile(token, { firstName, lastName });
      dispatch(setUserProfile(updatedProfile.body));
      onCloseEdit(); // Close the form after update
    } catch (error) {
      console.error('Failed to update profile:', error);
    }
  };

  return (
    <div className='header'>
      <form onSubmit={handleSubmit}>
        <label htmlFor='firstName'>First Name</label>
        <input
          id="firstName"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          type='text'
          required
          minLength="2"
        />
        <label htmlFor='lastName'>Last Name</label>
        <input
          id="lastName"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          type='text'
          required
          minLength="2"
        />
        <div>
          <input type='submit' className="edit-button" value='Save' />
          <button type="button" className="edit-button" onClick={onCloseEdit}>Cancel</button>
        </div>
      </form>
    </div>
  );
}

export default UserEdit;