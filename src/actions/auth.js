import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  RESET_REGISTER_SUCCESS,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT_SUCCESS,
  LOGOUT_FAIL,
  LOAD_USER_SUCCESS,
  LOAD_USER_FAIL,
  AUTHENTICATED_SUCCESS,
  AUTHENTICATED_FAIL,
  REFRESH_SUCCESS,
  REFRESH_FAIL,
  SET_AUTH_LOADING,
  REMOVE_AUTH_LOADING,
  RESET_PASSWORD_SUCCESS,
  RESET_PASSWORD_FAIL,
  RESET_PASSWORD_FROM_EMAIL_SUCCESS,
  RESET_PASSWORD_FROM_EMAIL_FAIL,
} from "./types";

export const load_user = () => async (dispatch) => {
  try {
    const res = await fetch("/api/account/user", {
      method: "GET",
      headers: {
        Accept: "application/json",
      },
    });

    const data = await res.json();

    if (res.status === 200) {
      dispatch({
        type: LOAD_USER_SUCCESS,
        payload: data,
      });
    } else {
      dispatch({
        type: LOAD_USER_FAIL,
        payload: res.error,
      });
    }
  } catch (err) {
    dispatch({
      type: LOAD_USER_FAIL,
      payload: err,
    });
  }
};

export const check_auth_status = () => async (dispatch) => {
  try {
    const res = await fetch("/api/account/verify", {
      method: "GET",
      headers: {
        Accept: "application/json",
      },
    });

    if (res.status === 200) {
      dispatch({
        type: AUTHENTICATED_SUCCESS,
      });
    } else {
    //   dispatch({
    //     type: AUTHENTICATED_FAIL,
    //   });
      dispatch(request_refresh());
    }
  } catch (err) {
    dispatch({
      type: AUTHENTICATED_FAIL,
    });
  }
};

export const request_refresh = () => async (dispatch) => {
  try {
    const res = await fetch("/api/account/refresh", {
      method: "GET",
      headers: {
        Accept: "application/json",
      },
    });

    if (res.status === 200) {
      dispatch({
        type: REFRESH_SUCCESS,
      });
    } else {
      dispatch({
        type: REFRESH_FAIL,
      });
    }
  } catch (err) {
    dispatch({
      type: REFRESH_FAIL,
    });
  }
};

export const register =
  (full_name, email, username, password, re_password) => async (dispatch) => {
    const body = JSON.stringify({
      full_name,
      email,
      username,
      password,
      re_password,
    });

    dispatch({
      type: SET_AUTH_LOADING,
    });

    try {
      const res = await fetch("/api/account/register", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: body,
      });
      const data = await res.json();

      if (res.status === 201) {
        dispatch({
          type: REGISTER_SUCCESS,
          payload: data.success,
        });
      } else {
        dispatch({
          type: REGISTER_FAIL,
          payload: data.error,
        });
      }
    } catch (err) {
      dispatch({
        type: REGISTER_FAIL,
        payload: err,
      });
    }

    dispatch({
      type: REMOVE_AUTH_LOADING,
    });
  };

export const reset_register_success = () => (dispatch) => {
  dispatch({
    type: RESET_REGISTER_SUCCESS,
  });
};

export const login = (email, password) => async (dispatch) => {
  const body = JSON.stringify({
    email,
    password,
  });

  dispatch({
    type: SET_AUTH_LOADING,
  });

  try {
    const res = await fetch("/api/account/login", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: body,
    });

    const data = await res.json();

    if (res.status === 200) {
      dispatch({
        type: LOGIN_SUCCESS,
        payload: data.success,
      });
      dispatch(load_user());
    } else {
      dispatch({
        type: LOGIN_FAIL,
        payload: data.error,
      });
    }
  } catch (err) {
    dispatch({
      type: LOGIN_FAIL,
      payload: err,
    });
  }

  dispatch({
    type: REMOVE_AUTH_LOADING,
  });
};

export const reset_password = (email) => async (dispatch) => {
  const body = JSON.stringify({
    email,
  });

  dispatch({
    type: SET_AUTH_LOADING,
  });

  try {
    const res = await fetch("/api/account/reset_password", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: body,
    });

    const data = await res.json();

    if (res.status === 200) {
      dispatch({
        type: RESET_PASSWORD_SUCCESS,
        payload: data.success,
      });
    } else {
      dispatch({
        type: RESET_PASSWORD_FAIL,
        payload: data.error,
      });
    }
  } catch (err) {
    dispatch({
      type: RESET_PASSWORD_FAIL,
      payload: err,
    });
  }

  dispatch({
    type: REMOVE_AUTH_LOADING,
  });
};

export const reset_password_from_email =
  (password, token, uidb64) => async (dispatch) => {
    const body = JSON.stringify({
      password,
      token,
      uidb64,
    });

    dispatch({
      type: SET_AUTH_LOADING,
    });

    try {
      const res = await fetch("/api/account/reset_password_from_email", {
        method: "PATCH",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: body,
      });

      const data = await res.json();

      if (res.status === 200) {
        dispatch({
          type: RESET_PASSWORD_FROM_EMAIL_SUCCESS,
          payload: data.success,
        });
      } else {
        dispatch({
          type: RESET_PASSWORD_FROM_EMAIL_FAIL,
          payload: data.error,
        });
      }
    } catch (err) {
      dispatch({
        type: RESET_PASSWORD_FROM_EMAIL_FAIL,
        payload: err,
      });
    }

    dispatch({
      type: REMOVE_AUTH_LOADING,
    });
  };

export const logout = () => async (dispatch) => {
  try {
    const res = await fetch("/api/account/logout", {
      method: "POST",
      headers: {
        Accept: "application/json",
      },
    });

    if (res.status === 200) {
      dispatch({
        type: LOGOUT_SUCCESS,
      });
    } else {
      dispatch({
        type: LOGOUT_FAIL,
      });
    }
  } catch (err) {
    dispatch({
      type: LOGOUT_FAIL,
    });
  }
};
