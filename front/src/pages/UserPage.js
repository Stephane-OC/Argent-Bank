import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { clearRememberedUser } from "../utils/store";

import "../css/main.css";
import argentBankLogo from "../img/argentBankLogo.png";

function UserPage() {

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear the JWT token and other user credentials from localStorage
    localStorage.removeItem("jwt");
    localStorage.removeItem("email");
    localStorage.removeItem("password");
    localStorage.removeItem("isRemember");

    // Clear the token from the Redux store
    dispatch(clearRememberedUser());

    // Redirect the user to the home page
    navigate("/");
  };

  return (
    <div>
      <nav className="main-nav">
        <a className="main-nav-logo" href="./index.html">
          <img
            className="main-nav-logo-image"
            src={argentBankLogo}
            alt="Argent Bank Logo"
          />
          <h1 className="sr-only">Argent Bank</h1>
        </a>
        <div>
          <a className="main-nav-item" href="./user.html">
            <i className="fa fa-user-circle"></i>
            Tony
          </a>
          <a
            className="main-nav-item"
            href="./"
            onClick={handleLogout}
          >
            <i className="fa fa-sign-out"></i>
            Sign Out
          </a>
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
