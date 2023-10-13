import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { useDispatch } from "react-redux";
import { loginUser } from "../service/apiService";
import { storeAuthToken, clearRememberedUser } from "../utils/store";

import "../css/main.css";
import HeaderSignIn from "../components/HeaderHome/HeaderHome";

/* SignInPage component provides a user interface for users to sign in to application.              **
**                                                                                                  **
** Component uses React hooks to manage its internal state, including user credentials and          **
** whether user has chosen to be remembered on subsequent visits.                                   **
**                                                                                                  **
** handleUserAuthentication function is responsible for making an API call to authenticate          **
** user. If user is authenticated successfully, their token is stored in localStorage, and          **
** they are redirected to their user page. If authentication fails, an error message is displayed.  **
**                                                                                                  **
** useEffect hook checks if the user has a stored token and if they have chosen to be remembered.   **
** If both conditions are met, user is automatically redirected to their user page.                 **
**                                                                                                  **
** Component uses useNavigate hook from 'react-router-dom' to programmatically navigate between     **
** routes and useDispatch hook from 'react-redux' to dispatch actions to the Redux store.           */

function SignInPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [userCredentials, setUserCredentials] = useState({
    email: localStorage.getItem("email") || "",
    password: localStorage.getItem("password") || "",
  });
  const [isRemembered, setIsRemembered] = useState(false);
  // To store error messages
  const [errorMessage, setErrorMessage] = useState(""); 

  const handleUserAuthentication = async (event) => {
    event.preventDefault();

    try {
      const responseData = await loginUser(userCredentials);

      if (responseData.body && responseData.body.token) {
        if (isRemembered) {
          localStorage.setItem("jwt", responseData.body.token);
          localStorage.setItem("email", userCredentials.email);
          localStorage.setItem("password", userCredentials.password);
          dispatch(storeAuthToken({ token: responseData.body.token }));
        } else {
          dispatch(clearRememberedUser());
        }
        // Displays a confirmation message with the user's first name
        console.log(`L'utilisateur est bien connecté !`);
        // Redirect to the user's page
        navigate('/user');
      } else {
        // Handle authentication error
        setErrorMessage("Erreur d'authentification. Veuillez réessayer.");
      }
    } catch (error) {
      console.error(error);
      // Handle authentication error
      setErrorMessage("Une erreur est survenue lors de la connexion. Veuillez réessayer.");
    }
  };

  useEffect(() => {
    const storedToken = localStorage.getItem("jwt");
    const storedRememberFlag = localStorage.getItem("isRemember");
    if (storedRememberFlag && storedToken) {
      // Redirect to the user's page
      navigate('/user');
    }
  }, [navigate]);

  return (
    <div>
      <HeaderSignIn />
      <main className="main bg-dark">
        <section className="sign-in-content">
          <i className="fa fa-user-circle sign-in-icon"></i>
          <h1>Sign In</h1>
          <form onSubmit={handleUserAuthentication}>
            <div className="input-wrapper">
              <label htmlFor="username">Username</label>
              <input
                type="text"
                id="username"
                value={userCredentials.email}
                onChange={(e) =>
                  setUserCredentials({
                    ...userCredentials,
                    email: e.target.value,
                  })
                }
              />
            </div>
            <div className="input-wrapper">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                value={userCredentials.password}
                onChange={(e) =>
                  setUserCredentials({
                    ...userCredentials,
                    password: e.target.value,
                  })
                }
              />
            </div>
            <div className="input-remember">
              <input
                type="checkbox"
                id="remember-me"
                checked={isRemembered}
                onChange={() => setIsRemembered(!isRemembered)}
              />
              <label htmlFor="remember-me">Remember me</label>
            </div>
            {errorMessage && <p className="error-message">{errorMessage}</p>}
            <button type="submit" className="sign-in-button">
              Sign In
            </button>
          </form>
        </section>
      </main>
    </div>
  );
}

export default SignInPage;
