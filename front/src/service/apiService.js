const API_BASE_URL = "http://localhost:3001/api/v1";

/* loginUser function is responsible for authenticating a user against backend API.        **
**                                                                                         **
** It takes a credentials object as a parameter, which contains user's email and password. **
**                                                                                         **
** Function sends a POST request to '/user/login' endpoint of API with user's              **
** credentials. If authentication is successful, function returns response data,           **
** which typically includes a JWT token and other user-related information.                **
**                                                                                         **
** If authentication fails, or if there's any other error during request, function         **
** throws an error which can be caught and handled by calling function or component.       **
**                                                                                         **
** API_BASE_URL constant defines base URL for API, making it easy to change in             **
** future if needed.                                                                       */

export const loginUser = async (credentials) => {
  try {
    const response = await fetch(`${API_BASE_URL}/user/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(credentials),
    });

    if (!response.ok) {
      throw new Error("Authentication Error");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

/* getUserProfile function is responsible for retrieving user's profile data from backend API.      **
**                                                                                                  **
** It takes a JWT token as a parameter, which is used to authenticate request to API.               **
**                                                                                                  **
** Function sends a POST request to '/user/profile' endpoint of API, including JWT token in         **
** authorization headers of request. If request is successful, function returns response data,      **
** which typically includes detailed profile information of user.                                   **
**                                                                                                  **
** If there's an error during request, such as a failed authentication or any other issue, function **
** throws an error which can be caught and handled by calling function or component.                **
**                                                                                                  **
** API_BASE_URL constant defines base URL for API, making it easy to change in future if needed.    */

export const getUserProfile = async (token) => {
  try {
    const response = await fetch(`${API_BASE_URL}/user/profile`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({})
    });

    if (!response.ok) {
      throw new Error('Failed to fetch user profile');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};


