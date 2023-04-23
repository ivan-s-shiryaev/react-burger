import {
  READ_AUTH_USER_REQUEST,
  READ_AUTH_USER_ERROR,
  READ_AUTH_USER_SUCCESS,
  UPDATE_AUTH_USER_REQUEST,
  UPDATE_AUTH_USER_ERROR,
  UPDATE_AUTH_USER_SUCCESS,
  SET_AUTH_USER_DATA,
  READ_AUTH_REGISTER_REQUEST,
  READ_AUTH_REGISTER_ERROR,
  READ_AUTH_REGISTER_SUCCESS,
  SET_AUTH_REGISTER_DATA,
  READ_AUTH_LOGIN_REQUEST,
  READ_AUTH_LOGIN_ERROR,
  READ_AUTH_LOGIN_SUCCESS,
  SET_AUTH_LOGIN_DATA,
  READ_AUTH_LOGOUT_REQUEST,
  READ_AUTH_LOGOUT_ERROR,
  READ_AUTH_LOGOUT_SUCCESS,
  READ_AUTH_FORGOT_REQUEST,
  READ_AUTH_FORGOT_ERROR,
  READ_AUTH_FORGOT_SUCCESS,
  SET_AUTH_FORGOT_DATA,
  READ_AUTH_RESET_REQUEST,
  READ_AUTH_RESET_ERROR,
  READ_AUTH_RESET_SUCCESS,
  SET_AUTH_RESET_DATA,
} from "../actions/auth";
import { authReducer, initialState } from "./auth";

const userData = {
  email: "Ivan Ivanov",
  name: "ivan@ivanov.ii",
};
const registerData = {
  ...userData,
  password: "123456",
};
const loginData = {
  email: userData.email,
  password: registerData.password,
};
const forgotData = {
  email: userData.email,
};
const resetData = {
  password: registerData.password,
  token: "%abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890",
};
const errorMessage = "Error message";

describe("Auth reducer", () => {
  it("Should return the initial state", () => {
    expect(authReducer(undefined, {})).toEqual(initialState);
  });

  it("Should handle READ_AUTH_USER_REQUEST", () => {
    expect(authReducer(initialState, { type: READ_AUTH_USER_REQUEST })).toEqual(
      {
        ...initialState,
        user: { ...initialState.user, request: true, error: false },
      }
    );
  });

  it("Should handle UPDATE_AUTH_USER_REQUEST", () => {
    expect(
      authReducer(initialState, { type: UPDATE_AUTH_USER_REQUEST })
    ).toEqual({
      ...initialState,
      user: { ...initialState.user, request: true, error: false },
    });
  });

  it("Should handle READ_AUTH_USER_ERROR", () => {
    const consoleErrorMock = jest
      .spyOn(console, "error")
      .mockImplementation(() => {});
    expect(
      authReducer(initialState, {
        type: READ_AUTH_USER_ERROR,
        payload: new Error(errorMessage),
      })
    ).toEqual({
      ...initialState,
      user: { ...initialState.user, request: false, error: true },
    });
    expect(consoleErrorMock).toHaveBeenCalledWith(errorMessage);
    consoleErrorMock.mockReset();
  });

  it("Should handle UPDATE_AUTH_USER_ERROR", () => {
    const consoleErrorMock = jest
      .spyOn(console, "error")
      .mockImplementation(() => {});
    expect(
      authReducer(initialState, {
        type: UPDATE_AUTH_USER_ERROR,
        payload: new Error(errorMessage),
      })
    ).toEqual({
      ...initialState,
      user: { ...initialState.user, request: false, error: true },
    });
    expect(consoleErrorMock).toHaveBeenCalledWith(errorMessage);
    consoleErrorMock.mockReset();
  });

  it("Should handle READ_AUTH_USER_SUCCESS", () => {
    expect(
      authReducer(initialState, {
        type: READ_AUTH_USER_SUCCESS,
      })
    ).toEqual({
      ...initialState,
      user: {
        ...initialState.user,
        data: { ...initialState.user.data },
        request: false,
        error: false,
      },
    });
  });

  it("Should handle UPDATE_AUTH_USER_SUCCESS", () => {
    expect(
      authReducer(initialState, {
        type: UPDATE_AUTH_USER_SUCCESS,
      })
    ).toEqual({
      ...initialState,
      user: {
        ...initialState.user,
        data: { ...initialState.user.data },
        request: false,
        error: false,
      },
    });
  });

  it("Should handle SET_AUTH_USER_DATA", () => {
    expect(
      authReducer(initialState, {
        type: SET_AUTH_USER_DATA,
        payload: { ...userData },
      })
    ).toEqual({
      ...initialState,
      user: {
        data: { ...userData },
        request: false,
        error: false,
      },
    });
  });

  it("Should handle READ_AUTH_REGISTER_REQUEST", () => {
    expect(
      authReducer(initialState, {
        type: READ_AUTH_REGISTER_REQUEST,
      })
    ).toEqual({
      ...initialState,
      register: {
        ...initialState.register,
        request: true,
        error: false,
      },
    });
  });

  it("Should handle READ_AUTH_REGISTER_ERROR", () => {
    const consoleErrorMock = jest
      .spyOn(console, "error")
      .mockImplementation(() => {});
    expect(
      authReducer(initialState, {
        type: READ_AUTH_REGISTER_ERROR,
        payload: new Error(errorMessage),
      })
    ).toEqual({
      ...initialState,
      register: {
        ...initialState.register,
        request: false,
        error: true,
      },
    });
    expect(consoleErrorMock).toHaveBeenCalledWith(errorMessage);
    consoleErrorMock.mockReset();
  });

  it("Should handle READ_AUTH_REGISTER_SUCCESS", () => {
    expect(
      authReducer(initialState, {
        type: READ_AUTH_REGISTER_SUCCESS,
      })
    ).toEqual({
      ...initialState,
      register: {
        ...initialState.register,
        data: { ...initialState.register.data },
        request: false,
        error: false,
      },
    });
  });

  it("Should handle SET_AUTH_REGISTER_DATA", () => {
    expect(
      authReducer(initialState, {
        type: SET_AUTH_REGISTER_DATA,
        payload: { ...registerData },
      })
    ).toEqual({
      ...initialState,
      register: {
        data: { ...registerData },
        request: false,
        error: false,
      },
    });
  });

  it("Should handle READ_AUTH_LOGIN_REQUEST", () => {
    expect(
      authReducer(initialState, {
        type: READ_AUTH_LOGIN_REQUEST,
      })
    ).toEqual({
      ...initialState,
      login: {
        ...initialState.login,
        request: true,
        error: false,
      },
    });
  });

  it("Should handle READ_AUTH_LOGIN_ERROR", () => {
    const consoleErrorMock = jest
      .spyOn(console, "error")
      .mockImplementation(() => {});
    expect(
      authReducer(initialState, {
        type: READ_AUTH_LOGIN_ERROR,
        payload: new Error(errorMessage),
      })
    ).toEqual({
      ...initialState,
      login: {
        ...initialState.login,
        request: false,
        error: true,
      },
    });
    expect(consoleErrorMock).toHaveBeenCalledWith(errorMessage);
    consoleErrorMock.mockReset();
  });

  it("Should handle READ_AUTH_LOGIN_SUCCESS", () => {
    expect(
      authReducer(initialState, {
        type: READ_AUTH_LOGIN_SUCCESS,
      })
    ).toEqual({
      ...initialState,
      login: {
        ...initialState.login,
        data: { ...initialState.login.data },
        request: false,
        error: false,
      },
    });
  });

  it("Should handle SET_AUTH_LOGIN_DATA", () => {
    expect(
      authReducer(initialState, {
        type: SET_AUTH_LOGIN_DATA,
        payload: { ...loginData },
      })
    ).toEqual({
      ...initialState,
      login: {
        data: { ...loginData },
        request: false,
        error: false,
      },
    });
  });

  it("Should handle READ_AUTH_LOGOUT_REQUEST", () => {
    expect(
      authReducer(initialState, {
        type: READ_AUTH_LOGOUT_REQUEST,
      })
    ).toEqual({
      ...initialState,
      logout: {
        request: true,
        error: false,
      },
    });
  });

  it("Should handle READ_AUTH_LOGOUT_ERROR", () => {
    const consoleErrorMock = jest
      .spyOn(console, "error")
      .mockImplementation(() => {});
    expect(
      authReducer(initialState, {
        type: READ_AUTH_LOGOUT_ERROR,
        payload: new Error(errorMessage),
      })
    ).toEqual({
      ...initialState,
      logout: {
        request: false,
        error: true,
      },
    });
    expect(consoleErrorMock).toHaveBeenCalledWith(errorMessage);
    consoleErrorMock.mockReset();
  });

  it("Should handle READ_AUTH_LOGOUT_SUCCESS", () => {
    expect(
      authReducer(initialState, {
        type: READ_AUTH_LOGOUT_SUCCESS,
      })
    ).toEqual({
      ...initialState,
      logout: {
        request: false,
        error: false,
      },
    });
  });

  it("Should handle READ_AUTH_FORGOT_REQUEST", () => {
    expect(
      authReducer(initialState, {
        type: READ_AUTH_FORGOT_REQUEST,
      })
    ).toEqual({
      ...initialState,
      forgot: {
        ...initialState.forgot,
        request: true,
        error: false,
      },
    });
  });

  it("Should handle READ_AUTH_FORGOT_ERROR", () => {
    const consoleErrorMock = jest
      .spyOn(console, "error")
      .mockImplementation(() => {});
    expect(
      authReducer(initialState, {
        type: READ_AUTH_FORGOT_ERROR,
        payload: new Error(errorMessage),
      })
    ).toEqual({
      ...initialState,
      forgot: {
        ...initialState.forgot,
        request: false,
        error: true,
      },
    });
    expect(consoleErrorMock).toHaveBeenCalledWith(errorMessage);
    consoleErrorMock.mockReset();
  });

  it("Should handle READ_AUTH_FORGOT_SUCCESS", () => {
    expect(
      authReducer(initialState, {
        type: READ_AUTH_FORGOT_SUCCESS,
      })
    ).toEqual({
      ...initialState,
      forgot: {
        ...initialState.forgot,
        data: { ...initialState.forgot.data },
        request: false,
        error: false,
      },
    });
  });

  it("Should handle SET_AUTH_FORGOT_DATA", () => {
    expect(
      authReducer(initialState, {
        type: SET_AUTH_FORGOT_DATA,
        payload: { ...forgotData },
      })
    ).toEqual({
      ...initialState,
      forgot: {
        data: { ...forgotData },
        request: false,
        error: false,
      },
    });
  });

  it("Should handle READ_AUTH_RESET_REQUEST", () => {
    expect(
      authReducer(initialState, {
        type: READ_AUTH_RESET_REQUEST,
      })
    ).toEqual({
      ...initialState,
      reset: {
        ...initialState.reset,
        request: true,
        error: false,
      },
    });
  });

  it("Should handle READ_AUTH_RESET_ERROR", () => {
    const consoleErrorMock = jest
      .spyOn(console, "error")
      .mockImplementation(() => {});
    expect(
      authReducer(initialState, {
        type: READ_AUTH_RESET_ERROR,
        payload: new Error(errorMessage),
      })
    ).toEqual({
      ...initialState,
      reset: {
        ...initialState.reset,
        request: false,
        error: true,
      },
    });
    expect(consoleErrorMock).toHaveBeenCalledWith(errorMessage);
    consoleErrorMock.mockReset();
  });

  it("Should handle READ_AUTH_RESET_SUCCESS", () => {
    expect(
      authReducer(initialState, {
        type: READ_AUTH_RESET_SUCCESS,
      })
    ).toEqual({
      ...initialState,
      reset: {
        ...initialState.reset,
        data: { ...initialState.reset.data },
        request: false,
        error: false,
      },
    });
  });

  it("Should handle SET_AUTH_RESET_DATA", () => {
    expect(
      authReducer(initialState, {
        type: SET_AUTH_RESET_DATA,
        payload: { ...resetData },
      })
    ).toEqual({
      ...initialState,
      reset: {
        data: { ...resetData },
        request: false,
        error: false,
      },
    });
  });
});
