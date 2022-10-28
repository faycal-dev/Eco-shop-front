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
  RESET_PASSWORD_FROM_EMAIL_FAIL,
  RESET_PASSWORD_FROM_EMAIL_SUCCESS,
} from "../actions/types";

const initialState = {
  user: null,
  isAuthenticated: false,
  loading: false,
  register_success: false,
  auth_response: "",
  reset_password_success: false,
  reset_password_from_email_success: false,
};

const authReducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case REGISTER_SUCCESS:
      return {
        ...state,
        register_success: true,
        auth_response: payload,
      };
    case REGISTER_FAIL:
      return {
        ...state,
        auth_response: payload,
      };
    case RESET_REGISTER_SUCCESS:
      return {
        ...state,
        register_success: false,
      };
    case LOGIN_SUCCESS:
      return {
        ...state,
        isAuthenticated: true,
        auth_response: payload,
      };
    case LOGIN_FAIL:
      return {
        ...state,
        isAuthenticated: false,
        auth_response: payload,
      };
    case LOGOUT_SUCCESS:
      return {
        ...state,
        isAuthenticated: false,
        user: null,
      };
    case LOGOUT_FAIL:
      return {
        ...state,
      };
    case LOAD_USER_SUCCESS:
      return {
        ...state,
        user: payload.user,
      };
    case LOAD_USER_FAIL:
      return {
        ...state,
        user: null,
      };
    case AUTHENTICATED_SUCCESS:
      return {
        ...state,
        isAuthenticated: true,
      };
    case AUTHENTICATED_FAIL:
      return {
        ...state,
        isAuthenticated: false,
        user: null,
      };
    case REFRESH_SUCCESS:
      return {
        ...state,
        isAuthenticated: true,
      };
    case REFRESH_FAIL:
      return {
        ...state,
        isAuthenticated: false,
        user: null,
      };
    case SET_AUTH_LOADING:
      return {
        ...state,
        loading: true,
      };
    case REMOVE_AUTH_LOADING:
      return {
        ...state,
        loading: false,
      };
    case RESET_PASSWORD_SUCCESS:
      return {
        ...state,
        loading: false,
        auth_response: payload,
        reset_password_success: true,
      };
    case RESET_PASSWORD_FAIL:
      return {
        ...state,
        loading: false,
        auth_response: payload,
        reset_password_success: false,
      };
    case RESET_PASSWORD_FROM_EMAIL_SUCCESS:
      return {
        ...state,
        loading: false,
        auth_response: payload,
        reset_password_from_email_success: true,
      };
    case RESET_PASSWORD_FROM_EMAIL_FAIL:
      return {
        ...state,
        loading: false,
        auth_response: payload,
        reset_password_from_email_success: false,
      };
    default:
      return state;
  }
};

export default authReducer;
