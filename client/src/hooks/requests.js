const API_URL = "v1";

/*=========================================================================================
                                    AUTH REQUESTS
==========================================================================================*/
async function httpRegisterUser(user) {
  try {
    const response = await fetch(`${API_URL}/auth/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });
    console.log(response);
    return response;
  } catch (err) {
    alert("Registration failed. Invalid user.");
  }
}

async function httpLoginUser(user) {
  try {
    const response = await fetch(`${API_URL}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        credentials: "include",
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
      method: "GET",
      credentials: "include", // Include credentials (cookies) in the request
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
      method: "POST",
      credentials: "include", // Include credentials (cookies) in the request
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

/*=========================================================================================
                                    MENU REQUESTS
==========================================================================================*/
async function httpGetLength(title, userId) {
  try {
    const response = await fetch(`${API_URL}/menu/${title}/length/${userId}`);

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    console.log(`Notifications length for user ${userId}: ${data.notificationCount}`);
    return data;
  } catch (error) {
    console.error("Error:", error);
    throw error; 
  }
}

async function httpGetNotifications(title, userId) {
  try {
    const response = await fetch(`${API_URL}/menu/${title}/${userId}`);

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error:", error);
    throw error; 
  }
}

async function httpApproveApproval(userId, approvalId) {
  try {
    const response = await fetch(`${API_URL}/menu/approvals/approve/${userId}/${approvalId}`, {
      method: "POST",
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error:", error);
    throw error; 
  }
}

export {
  httpRegisterUser,
  httpLoginUser,
  httpGetUser,
  httpLogoutUser,
  httpGetLength,
  httpGetNotifications,
  httpApproveApproval,
};
