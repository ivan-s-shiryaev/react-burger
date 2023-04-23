import { BASE_URL_HTTP } from "../../constants";
import {
  TAuthTokenValue,
  TAuthToken,
  TAuthUserData,
  TAuthRegisterData,
  TAuthLoginData,
  TAuthForgotData,
  TAuthResetData,
  TDispatch,
  TThunk,
  checkResponse,
  getCookie,
  setCookie,
  deleteCookie,
} from "../../utils";

export const READ_AUTH_USER_REQUEST: "READ_AUTH_USER_REQUEST" =
  "READ_AUTH_USER_REQUEST";
export const READ_AUTH_USER_ERROR: "READ_AUTH_USER_ERROR" =
  "READ_AUTH_USER_ERROR";
export const READ_AUTH_USER_SUCCESS: "READ_AUTH_USER_SUCCESS" =
  "READ_AUTH_USER_SUCCESS";
export const UPDATE_AUTH_USER_REQUEST: "UPDATE_AUTH_USER_REQUEST" =
  "UPDATE_AUTH_USER_REQUEST";
export const UPDATE_AUTH_USER_ERROR: "UPDATE_AUTH_USER_ERROR" =
  "UPDATE_AUTH_USER_ERROR";
export const UPDATE_AUTH_USER_SUCCESS: "UPDATE_AUTH_USER_SUCCESS" =
  "UPDATE_AUTH_USER_SUCCESS";
export const SET_AUTH_USER_DATA: "SET_AUTH_USER_DATA" = "SET_AUTH_USER_DATA";

export const READ_AUTH_REGISTER_REQUEST: "READ_AUTH_REGISTER_REQUEST" =
  "READ_AUTH_REGISTER_REQUEST";
export const READ_AUTH_REGISTER_ERROR: "READ_AUTH_REGISTER_ERROR" =
  "READ_AUTH_REGISTER_ERROR";
export const READ_AUTH_REGISTER_SUCCESS: "READ_AUTH_REGISTER_SUCCESS" =
  "READ_AUTH_REGISTER_SUCCESS";
export const SET_AUTH_REGISTER_DATA: "SET_AUTH_REGISTER_DATA" =
  "SET_AUTH_REGISTER_DATA";

export const READ_AUTH_LOGIN_REQUEST: "READ_AUTH_LOGIN_REQUEST" =
  "READ_AUTH_LOGIN_REQUEST";
export const READ_AUTH_LOGIN_ERROR: "READ_AUTH_LOGIN_ERROR" =
  "READ_AUTH_LOGIN_ERROR";
export const READ_AUTH_LOGIN_SUCCESS: "READ_AUTH_LOGIN_SUCCESS" =
  "READ_AUTH_LOGIN_SUCCESS";
export const SET_AUTH_LOGIN_DATA: "SET_AUTH_LOGIN_DATA" = "SET_AUTH_LOGIN_DATA";
export const READ_AUTH_LOGOUT_REQUEST: "READ_AUTH_LOGOUT_REQUEST" =
  "READ_AUTH_LOGOUT_REQUEST";
export const READ_AUTH_LOGOUT_ERROR: "READ_AUTH_LOGOUT_ERROR" =
  "READ_AUTH_LOGOUT_ERROR";
export const READ_AUTH_LOGOUT_SUCCESS: "READ_AUTH_LOGOUT_SUCCESS" =
  "READ_AUTH_LOGOUT_SUCCESS";
export const READ_AUTH_FORGOT_REQUEST: "READ_AUTH_FORGOT_REQUEST" =
  "READ_AUTH_FORGOT_REQUEST";
export const READ_AUTH_FORGOT_ERROR: "READ_AUTH_FORGOT_ERROR" =
  "READ_AUTH_FORGOT_ERROR";
export const READ_AUTH_FORGOT_SUCCESS: "READ_AUTH_FORGOT_SUCCESS" =
  "READ_AUTH_FORGOT_SUCCESS";
export const SET_AUTH_FORGOT_DATA: "SET_AUTH_FORGOT_DATA" =
  "SET_AUTH_FORGOT_DATA";
export const READ_AUTH_RESET_REQUEST: "READ_AUTH_RESET_REQUEST" =
  "READ_AUTH_RESET_REQUEST";
export const READ_AUTH_RESET_ERROR: "READ_AUTH_RESET_ERROR" =
  "READ_AUTH_RESET_ERROR";
export const READ_AUTH_RESET_SUCCESS: "READ_AUTH_RESET_SUCCESS" =
  "READ_AUTH_RESET_SUCCESS";
export const SET_AUTH_RESET_DATA: "SET_AUTH_RESET_DATA" = "SET_AUTH_RESET_DATA";

export interface IReadAuthUserRequestAction {
  readonly type: typeof READ_AUTH_USER_REQUEST;
}

export interface IReadAuthUserErrorAction {
  readonly type: typeof READ_AUTH_USER_ERROR;
  readonly payload: Error;
}

export interface IReadAuthUserSuccessAction {
  readonly type: typeof READ_AUTH_USER_SUCCESS;
}

export interface IUpdateAuthUserRequestAction {
  readonly type: typeof UPDATE_AUTH_USER_REQUEST;
}

export interface IUpdateAuthUserErrorAction {
  readonly type: typeof UPDATE_AUTH_USER_ERROR;
  readonly payload: Error;
}

export interface IUpdateAuthUserSuccessAction {
  readonly type: typeof UPDATE_AUTH_USER_SUCCESS;
}

export interface ISetAuthUserDataAction {
  readonly type: typeof SET_AUTH_USER_DATA;
  readonly payload: TAuthUserData;
}

export interface IReadAuthRegisterRequestAction {
  readonly type: typeof READ_AUTH_REGISTER_REQUEST;
}

export interface IReadAuthRegisterErrorAction {
  readonly type: typeof READ_AUTH_REGISTER_ERROR;
  readonly payload: Error;
}

export interface IReadAuthRegisterSuccessAction {
  readonly type: typeof READ_AUTH_REGISTER_SUCCESS;
}

export interface ISetAuthRegisterDataAction {
  readonly type: typeof SET_AUTH_REGISTER_DATA;
  readonly payload: TAuthRegisterData;
}

export interface IReadAuthLoginRequestAction {
  readonly type: typeof READ_AUTH_LOGIN_REQUEST;
}

export interface IReadAuthLoginErrorAction {
  readonly type: typeof READ_AUTH_LOGIN_ERROR;
  readonly payload: Error;
}

export interface IReadAuthLoginSuccessAction {
  readonly type: typeof READ_AUTH_LOGIN_SUCCESS;
}

export interface ISetAuthLoginDataAction {
  readonly type: typeof SET_AUTH_LOGIN_DATA;
  readonly payload: TAuthLoginData;
}

export interface IReadAuthLogoutRequestAction {
  readonly type: typeof READ_AUTH_LOGOUT_REQUEST;
}

export interface IReadAuthLogoutErrorAction {
  readonly type: typeof READ_AUTH_LOGOUT_ERROR;
  readonly payload: Error;
}

export interface IReadAuthLogoutSuccessAction {
  readonly type: typeof READ_AUTH_LOGOUT_SUCCESS;
}

export interface IReadAuthForgorRequestAction {
  readonly type: typeof READ_AUTH_FORGOT_REQUEST;
}

export interface IReadAuthForgorErrorAction {
  readonly type: typeof READ_AUTH_FORGOT_ERROR;
  readonly payload: Error;
}

export interface IReadAuthForgorSuccessAction {
  readonly type: typeof READ_AUTH_FORGOT_SUCCESS;
}

export interface ISetAuthForgorDataAction {
  readonly type: typeof SET_AUTH_FORGOT_DATA;
  readonly payload: TAuthForgotData;
}

export interface IReadAuthResetRequestAction {
  readonly type: typeof READ_AUTH_RESET_REQUEST;
}

export interface IReadAuthResetErrorAction {
  readonly type: typeof READ_AUTH_RESET_ERROR;
  readonly payload: Error;
}

export interface IReadAuthResetSuccessAction {
  readonly type: typeof READ_AUTH_RESET_SUCCESS;
}

export interface ISetAuthResetDataAction {
  readonly type: typeof SET_AUTH_RESET_DATA;
  readonly payload: TAuthResetData;
}

export type TAuthActions =
  | IReadAuthUserRequestAction
  | IReadAuthUserErrorAction
  | IReadAuthUserSuccessAction
  | IUpdateAuthUserRequestAction
  | IUpdateAuthUserErrorAction
  | IUpdateAuthUserSuccessAction
  | ISetAuthUserDataAction
  | IReadAuthRegisterRequestAction
  | IReadAuthRegisterErrorAction
  | IReadAuthRegisterSuccessAction
  | ISetAuthRegisterDataAction
  | IReadAuthLoginRequestAction
  | IReadAuthLoginErrorAction
  | IReadAuthLoginSuccessAction
  | ISetAuthLoginDataAction
  | IReadAuthLogoutRequestAction
  | IReadAuthLogoutErrorAction
  | IReadAuthLogoutSuccessAction
  | IReadAuthForgorRequestAction
  | IReadAuthForgorErrorAction
  | IReadAuthForgorSuccessAction
  | ISetAuthForgorDataAction
  | IReadAuthResetRequestAction
  | IReadAuthResetErrorAction
  | IReadAuthResetSuccessAction
  | ISetAuthResetDataAction;

export async function refreshAuthToken() {
  let result = false;

  const token = getCookie("refresh");

  try {
    const response = await fetch(`${BASE_URL_HTTP}/auth/token`, {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ token }),
    });
    const content = await response.json();

    try {
      checkResponse(response);
    } catch (error: any) {
      if (content.message) {
        throw new Error(
          `Failed to refresh token: ${content.message}. ${error.message}`
        );
      } else {
        throw error;
      }
    }

    if (content.success) {
      setCookie("access", content.accessToken.split("Bearer ")[1]);
      setCookie("refresh", content.refreshToken);

      result = true;
    } else {
      throw new Error("Failed to refresh token: empty data");
    }
  } catch (error) {
    throw error;
  }

  return result;
}

export function readAuthUser({ token }: TAuthToken, refresh = true): TThunk {
  return async function (dispatch: TDispatch) {
    let result = false;

    try {
      dispatch({
        type: READ_AUTH_USER_REQUEST,
      });

      const response = await fetch(`${BASE_URL_HTTP}/auth/user`, {
        method: "GET",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      const content = await response.json();

      try {
        checkResponse(response);
      } catch (error: any) {
        if (content.message) {
          if (refresh && content.message === "jwt expired") {
            await refreshAuthToken();
            await dispatch(readAuthUser({ token: getCookie("access") }, false));
          } else {
            throw new Error(
              `Failed to get the user: ${content.message}. ${error.message}`
            );
          }
        } else {
          throw error;
        }
      }

      if (content.success) {
        dispatch({
          type: READ_AUTH_USER_SUCCESS,
        });

        dispatch({
          type: SET_AUTH_USER_DATA,
          payload: content.user,
        });

        result = true;
      } else {
        throw new Error("Failed to get the user: empty data");
      }
    } catch (error: any) {
      dispatch({
        type: READ_AUTH_USER_ERROR,
        payload: error,
      });
    }

    return result;
  };
}

export function updateAuthUser({
  data,
  token,
}: {
  data: TAuthRegisterData;
  token: TAuthTokenValue;
}): TThunk {
  return async function (dispatch: TDispatch) {
    let result = false;

    try {
      dispatch({
        type: UPDATE_AUTH_USER_REQUEST,
      });

      const response = await fetch(`${BASE_URL_HTTP}/auth/user`, {
        method: "PATCH",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(data),
      });
      const content = await response.json();

      try {
        checkResponse(response);
      } catch (error: any) {
        if (content.message) {
          throw new Error(
            `Failed to update the user: ${content.message}. ${error.message}`
          );
        } else {
          throw error;
        }
      }

      if (content.success) {
        dispatch({
          type: UPDATE_AUTH_USER_SUCCESS,
        });

        dispatch({
          type: SET_AUTH_USER_DATA,
          payload: content.user,
        });

        result = true;
      } else {
        throw new Error("Failed to update the user: empty data");
      }
    } catch (error: any) {
      dispatch({
        type: UPDATE_AUTH_USER_ERROR,
        payload: error,
      });
    }

    return result;
  };
}

export function readAuthRegister(argument: TAuthRegisterData): TThunk {
  return async function (dispatch: TDispatch) {
    let result = false;

    try {
      dispatch({
        type: READ_AUTH_REGISTER_REQUEST,
      });

      const response = await fetch(`${BASE_URL_HTTP}/auth/register`, {
        method: "POST",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(argument),
      });
      const content = await response.json();

      try {
        checkResponse(response);
      } catch (error: any) {
        if (content.message) {
          throw new Error(
            `Failed to register the user: ${content.message}. ${error.message}`
          );
        } else {
          throw error;
        }
      }

      if (content.success) {
        setCookie("access", content.accessToken.split("Bearer ")[1]);
        setCookie("refresh", content.refreshToken);

        dispatch({
          type: READ_AUTH_REGISTER_SUCCESS,
        });

        dispatch({
          type: READ_AUTH_USER_SUCCESS,
        });

        dispatch({
          type: SET_AUTH_USER_DATA,
          payload: content.user,
        });

        result = true;
      } else {
        throw new Error("Failed to register the user: empty data");
      }
    } catch (error: any) {
      dispatch({
        type: READ_AUTH_REGISTER_ERROR,
        payload: error,
      });
    }

    return result;
  };
}

export function readAuthLogin(argument: TAuthLoginData): TThunk {
  return async function (dispatch: TDispatch) {
    let result = false;

    try {
      dispatch({
        type: READ_AUTH_LOGIN_REQUEST,
      });

      const response = await fetch(`${BASE_URL_HTTP}/auth/login`, {
        method: "POST",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(argument),
      });
      const content = await response.json();

      try {
        checkResponse(response);
      } catch (error: any) {
        if (content.message) {
          throw new Error(
            `Failed to login: ${content.message}. ${error.message}`
          );
        } else {
          throw error;
        }
      }

      if (content.success) {
        setCookie("access", content.accessToken.split("Bearer ")[1], {
          expires: 1200,
        });
        setCookie("refresh", content.refreshToken);

        dispatch({
          type: READ_AUTH_LOGIN_SUCCESS,
        });

        dispatch({
          type: READ_AUTH_USER_SUCCESS,
        });

        dispatch({
          type: SET_AUTH_USER_DATA,
          payload: content.user,
        });

        result = true;
      } else {
        throw new Error("Failed to login: empty data");
      }
    } catch (error: any) {
      dispatch({
        type: READ_AUTH_LOGIN_ERROR,
        payload: error,
      });
    }

    return result;
  };
}

export function readAuthLogout(argument: TAuthToken): TThunk {
  return async function (dispatch: TDispatch) {
    let result = false;

    try {
      dispatch({
        type: READ_AUTH_LOGOUT_REQUEST,
      });

      const response = await fetch(`${BASE_URL_HTTP}/auth/logout`, {
        method: "POST",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(argument),
      });
      const content = await response.json();

      try {
        checkResponse(response);
      } catch (error: any) {
        if (content.message) {
          throw new Error(
            `Failed to logout: ${content.message}. ${error.message}`
          );
        } else {
          throw error;
        }
      }

      if (content.success) {
        deleteCookie("access");
        deleteCookie("refresh");

        dispatch({
          type: READ_AUTH_LOGOUT_SUCCESS,
        });

        dispatch({
          type: SET_AUTH_USER_DATA,
          payload: { email: "", name: "" },
        });

        result = true;
      } else {
        throw new Error("Failed to logout: empty data");
      }
    } catch (error: any) {
      dispatch({
        type: READ_AUTH_LOGOUT_ERROR,
        payload: error,
      });
    }

    return result;
  };
}

export function readAuthForgot(argument: TAuthForgotData): TThunk {
  return async function (dispatch: TDispatch) {
    let result = false;

    try {
      dispatch({
        type: READ_AUTH_FORGOT_REQUEST,
      });

      const response = await fetch(`${BASE_URL_HTTP}/password-reset`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(argument),
      });
      const content = await response.json();

      try {
        checkResponse(response);
      } catch (error: any) {
        if (content.message) {
          throw new Error(
            `Failed to send reset email: ${content.message}. ${error.message}`
          );
        } else {
          throw error;
        }
      }

      if (content.success) {
        dispatch({
          type: READ_AUTH_FORGOT_SUCCESS,
        });

        result = true;
      } else {
        throw new Error("Failed to send reset email: empty data");
      }
    } catch (error: any) {
      dispatch({
        type: READ_AUTH_FORGOT_ERROR,
        payload: error,
      });
    }

    return result;
  };
}

export function readAuthReset(argument: TAuthResetData): TThunk {
  return async function (dispatch: TDispatch) {
    let result = false;

    try {
      dispatch({
        type: READ_AUTH_RESET_REQUEST,
      });

      const response = await fetch(`${BASE_URL_HTTP}/password-reset/reset`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(argument),
      });
      const content = await response.json();

      try {
        checkResponse(response);
      } catch (error: any) {
        if (content.message) {
          throw new Error(
            `Failed to reset password: ${content.message}. ${error.message}`
          );
        } else {
          throw error;
        }
      }

      if (content.success) {
        dispatch({
          type: READ_AUTH_RESET_SUCCESS,
        });

        result = true;
      } else {
        throw new Error("Failed to reset password: empty data");
      }
    } catch (error: any) {
      dispatch({
        type: READ_AUTH_RESET_ERROR,
        payload: error,
      });
    }

    return result;
  };
}
