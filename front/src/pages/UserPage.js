import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getUserProfile } from "../service/apiService";
import {
  clearRememberedUser,
  storeAuthToken,
  setUserProfile,
  setAuthError,
} from "../utils/store";
import UserEdit from "../components/UserEdit/UserEdit";
import "../css/main.css";
import argentBankLogo from "../img/argentBankLogo.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserCircle, faSignOutAlt } from "@fortawesome/free-solid-svg-icons";


/* UserPage is main React component for user's profile page within application.                                   **
**                                                                                                                **
** This page is responsible for displaying user's profile information, bank account details,                      **
** and providing ability to edit user's name and log out. It interacts with Redux store                           **
** to manage global state and with React Router for navigation.                                                   **
**                                                                                                                **
** Key functionalities include:                                                                                   **
** - Retrieving and displaying user's profile data from Redux store.                                              **
** - Enabling user to initiate an edit of their name, which toggles display of UserEdit component.                **
** - Handling user logout, which clears JWT token and other authentication-related information from               **
**   localStorage and Redux store before redirecting user to home page.                                           **
** - On initial load, checking for a valid authentication token and redirecting to sign-in page if none is found. **
** - Displaying a list of user's bank accounts with functionality to view transactions for each account.          **
**                                                                                                                **
** Page is structured with a navigation bar at top, a main content area with user's greeting and account          **
** information, and a conditional rendering of UserEdit component based on editing state.                         */

function UserPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);

  // Access the authentication state from the Redux store
  const authState = useSelector((state) => state.userAuthentication);
  const userProfile = useSelector(
    (state) => state.userAuthentication.userProfile
  );

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleCloseEdit = () => {
    setIsEditing(false);
  };
  // This effect runs when the component mounts
  useEffect(() => {
    const storedToken = localStorage.getItem("jwt");

    if (storedToken && !authState.token) {
      dispatch(storeAuthToken({ token: storedToken }));
    }

    if (!authState.token && !storedToken) {
      navigate("/sign-in");
    } else if (authState.token && !authState.userProfile) {
      getUserProfile(authState.token)
        .then((response) => {
          console.log(response);
          console.log(response.body);
          dispatch(setUserProfile(response.body));
        })
        .catch((err) => {
          console.error(err);
          dispatch(setAuthError(err.toString()));
        });
    }
  }, [authState, navigate, dispatch]);

  const handleLogout = () => {
    localStorage.removeItem("jwt");
    localStorage.removeItem("email");
    localStorage.removeItem("password");
    localStorage.removeItem("isRemember");

    dispatch(clearRememberedUser());
    navigate("/");
  };

  return (
    <div>
      <nav className="main-nav">
        <NavLink to="/" className="main-nav-logo">
          <img
            className="main-nav-logo-image"
            src={argentBankLogo}
            alt="Argent Bank Logo"
          />
          <h1 className="sr-only">Argent Bank</h1>
        </NavLink>
        <div>
          <NavLink to="/user" className="main-nav-item">
            <FontAwesomeIcon icon={faUserCircle} />
            {userProfile ? `${userProfile.firstName}` : "User"}
          </NavLink>
          <NavLink to="/" className="main-nav-item" onClick={handleLogout}>
            <FontAwesomeIcon icon={faSignOutAlt} />
            Sign Out
          </NavLink>
        </div>
      </nav>
      <main className="main bg-dark">
        <div className="header">
          <h1>
            Welcome back
            <br />
            {userProfile ? (
              <React.Fragment>
                {userProfile.firstName} {userProfile.lastName}
              </React.Fragment>
            ) : (
              "User"
            )}
          </h1>

          <div className="edit-button-container">
            {isEditing ? (
              <UserEdit onCloseEdit={handleCloseEdit} />
            ) : (
              <button className="edit-button" onClick={handleEditClick}>
                Edit Name
              </button>
            )}
          </div>
          
        </div>
        <h2 className="sr-only">Accounts</h2>
        <section className="account">
          <div className="account-content-wrapper">
            <h3 className="account-title">Argent Bank Checking (x8349)</h3>
            <p className="account-amount">$2,082.79</p>
            <p className="account-amount-description">Available Balance</p>
          </div>
          <div className="account-content-wrapper cta">
            <button className="transaction-button">View transactions</button>
          </div>
        </section>
        <section className="account">
          <div className="account-content-wrapper">
            <h3 className="account-title">Argent Bank Savings (x6712)</h3>
            <p className="account-amount">$10,928.42</p>
            <p className="account-amount-description">Available Balance</p>
          </div>
          <div className="account-content-wrapper cta">
            <button className="transaction-button">View transactions</button>
          </div>
        </section>
        <section className="account">
          <div className="account-content-wrapper">
            <h3 className="account-title">Argent Bank Credit Card (x8349)</h3>
            <p className="account-amount">$184.30</p>
            <p className="account-amount-description">Current Balance</p>
          </div>
          <div className="account-content-wrapper cta">
            <button className="transaction-button">View transactions</button>
          </div>
        </section>
      </main>
    </div>
  );
}

export default UserPage;
