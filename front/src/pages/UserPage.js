import React, { useEffect } from "react";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getUserProfile } from '../service/apiService';
import { clearRememberedUser, storeAuthToken, setUserProfile, setAuthError } from "../utils/store";

import "../css/main.css";
import argentBankLogo from "../img/argentBankLogo.png";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserCircle, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';

function UserPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Access the authentication state from the Redux store
  const authState = useSelector((state) => state.userAuthentication);
  const userProfile = useSelector((state) => state.userAuthentication.userProfile); 
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
        .then(response  => {
          console.log(response);
          console.log(response.body);
          dispatch(setUserProfile(response.body));
        })
        .catch(err => {
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
                <img className="main-nav-logo-image" src={argentBankLogo} alt="Argent Bank Logo" />
                <h1 className="sr-only">Argent Bank</h1>
            </NavLink>
            <div>
                <NavLink to="/user" className="main-nav-item">
                    <FontAwesomeIcon icon={faUserCircle} />
                    {userProfile ? `${userProfile.firstName}` : 'User'}
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
            Tony Jarvis!
          </h1>
          <button className="edit-button">Edit Name</button>
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
