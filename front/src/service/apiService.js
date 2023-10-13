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
