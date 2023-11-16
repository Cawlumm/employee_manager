const API_URL = "http://3.141.14.220:8000/v1";

async function httpRegisterUser(user) {
  try {
    const response = await fetch(`${API_URL}/auth/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });
    console.log(response)
    return response;
  } catch (err) {
      alert('Registration failed. Invalid user.')
  }
}

async function httpLoginUser(user) {
  try {
    const response = await fetch(`${API_URL}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        credentials: 'include',
      },
      
      body: JSON.stringify(user),
    });

    // Check if the response is successful (status code 2xx)
    if (response.ok) {
      return response.json().then((res) => {
        console.log(res);

        return { ok: true, message: res.message };
      });
    } else {
      // If the response status is not ok, return an object with ok set to false
      return response.json().then((res) => {
        console.log(res);

        return { ok: false, message: res.message };
      });
    }
  } catch (err) {
    console.error(err);
    return { ok: false };
  }
}

async function httpGetUser() {
    try {
      const response = await fetch(`${API_URL}/auth/user`, {
        method: 'GET',
        credentials: 'include', // Include credentials (cookies) in the request
      });
      // Check if the response is successful (status code 2xx)
      if (response) {
        // Assuming the response contains JSON data, use response.json()
        const userData = await response.json();
        return userData;
      } else {
        // If the response status is not ok, return an object with ok set to false
        return { ok: false };
      }
    } catch (err) {
      console.error(err);
      return { ok: false };
    }
  }

  async function httpLogoutUser() {
    try {
      const response = await fetch(`${API_URL}/auth/logout`, {
        method: 'POST',
        credentials: 'include', // Include credentials (cookies) in the request
      });
      // Check if the response is successful (status code 2xx)
      if (response.ok) {
        // Assuming the response contains JSON data, use response.json()
        return await response.json();
      } else {
        // If the response status is not ok, return an object with ok set to false
        return { ok: false };
      }
    } catch (err) {
      console.error(err);
      return { ok: false };
    }
  }
  


export { httpRegisterUser, httpLoginUser, httpGetUser, httpLogoutUser };
