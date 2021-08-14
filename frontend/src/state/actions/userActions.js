import axios from "axios";

export const userLoginAction = (email, password) => async (callReducer) => {
  callReducer({ type: "LOGIN/REGISTER_REQUEST" });

  try {
    const { data } = await axios.post(
      "/users/login",
      { email, password },
      { headers: { "Content-Type": "application/json" } }
    );

    callReducer({ type: "LOGIN/REGISTER_SUCCESS", payload: data });
    localStorage.setItem("User Info", JSON.stringify(data));
  } catch (error) {
    callReducer({
      type: "LOGIN/REGISTER_FAIL",
      payload: error.response.data.msg,
    });
  }
};

export const userRegisterAction =
  (name, email, password, confpass) => async (callReducer) => {
    callReducer({ type: "LOGIN/REGISTER_REQUEST" });

    if (password === confpass) {
      try {
        const { data } = await axios.post(
          "/users/register",
          { name, email, password },
          { headers: { "Content-Type": "application/json" } }
        );

        callReducer({ type: "LOGIN/REGISTER_SUCCESS", payload: data });
        localStorage.setItem("User Info", JSON.stringify(data));
      } catch (error) {
        callReducer({
          type: "LOGIN/REGISTER_FAIL",
          payload: error.response.data.msg,
        });
      }
    } else {
      callReducer({
        type: "LOGIN/REGISTER_FAIL",
        payload: "Passwords Don't Match",
      });
    }
  };

export const clearErrorAction = () => async (callReducer) => {
  callReducer({ type: "CLEAR_ERROR" });
};

export const userLogoutAction = () => async (callReducer) => {
  localStorage.setItem("User Info", null);
  callReducer({ type: "LOGOUT" });
};
