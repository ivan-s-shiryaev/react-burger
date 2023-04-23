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
  TAuthActions,
} from "../actions/auth";
import { TAuth } from "../../utils";

export const initialState: TAuth = {
  user: {
    data: {
      email: "",
      name: "",
    },
    request: false,
    error: false,
  },
  register: {
    data: {
      name: "",
      email: "",
      password: "",
    },
    request: false,
    error: false,
  },
  login: {
    data: {
      email: "",
      password: "",
    },
    request: false,
    error: false,
  },
  logout: {
    request: false,
    error: false,
  },
  forgot: {
    data: {
      email: "",
    },
    request: false,
    error: false,
  },
  reset: {
    data: {
      password: "",
      token: "",
    },
    request: false,
    error: false,
  },
};

export const authReducer = (state = initialState, action: TAuthActions) => {
  switch (action.type) {
    case READ_AUTH_USER_REQUEST:
    case UPDATE_AUTH_USER_REQUEST: {
      return {
        ...state,
        user: {
          ...state.user,
          request: true,
        },
      };
    }

    case READ_AUTH_USER_ERROR:
    case UPDATE_AUTH_USER_ERROR: {
      console.error(action.payload.message);

      return {
        ...state,
        user: {
          ...state.user,
          request: false,
          error: true,
        },
      };
    }

    case READ_AUTH_USER_SUCCESS:
    case UPDATE_AUTH_USER_SUCCESS: {
      return {
        ...state,
        user: {
          ...initialState.user,
        },
      };
    }

    case SET_AUTH_USER_DATA: {
      return {
        ...state,
        user: {
          ...state.user,
          data: {
            ...state.user.data,
            ...action.payload,
          },
        },
      };
    }

    case READ_AUTH_REGISTER_REQUEST: {
      return {
        ...state,
        register: {
          ...state.register,
          data: {
            ...state.register.data,
          },
          request: true,
        },
      };
    }

    case READ_AUTH_REGISTER_ERROR: {
      console.error(action.payload.message);

      return {
        ...state,
        register: {
          ...initialState.register,
          data: {
            ...initialState.register.data,
          },
          error: true,
        },
      };
    }

    case READ_AUTH_REGISTER_SUCCESS: {
      return {
        ...state,
        register: {
          ...initialState.register,
          data: {
            ...initialState.register.data,
          },
        },
      };
    }

    case SET_AUTH_REGISTER_DATA: {
      return {
        ...state,
        register: {
          ...state.register,
          data: {
            ...state.register.data,
            ...action.payload,
          },
        },
      };
    }

    case READ_AUTH_LOGIN_REQUEST: {
      return {
        ...state,
        login: {
          ...state.login,
          request: true,
        },
      };
    }

    case READ_AUTH_LOGIN_ERROR: {
      console.error(action.payload.message);

      return {
        ...state,
        login: {
          ...initialState.login,
          data: {
            ...initialState.login.data,
          },
          error: true,
        },
      };
    }

    case READ_AUTH_LOGIN_SUCCESS: {
      return {
        ...state,
        login: {
          ...initialState.login,
        },
      };
    }

    case SET_AUTH_LOGIN_DATA: {
      return {
        ...state,
        login: {
          ...state.login,
          data: {
            ...state.login.data,
            ...action.payload,
          },
        },
      };
    }

    case READ_AUTH_LOGOUT_REQUEST: {
      return {
        ...state,
        logout: {
          ...state.logout,
          request: true,
        },
      };
    }

    case READ_AUTH_LOGOUT_ERROR: {
      console.error(action.payload.message);

      return {
        ...state,
        logout: {
          ...state.logout,
          request: false,
          error: true,
        },
      };
    }

    case READ_AUTH_LOGOUT_SUCCESS: {
      return {
        ...state,
        logout: {
          ...initialState.logout,
        },
      };
    }

    case READ_AUTH_FORGOT_REQUEST: {
      return {
        ...state,
        forgot: {
          ...state.forgot,
          data: {
            ...state.forgot.data,
          },
          request: true,
        },
      };
    }

    case READ_AUTH_FORGOT_ERROR: {
      console.error(action.payload.message);

      return {
        ...state,
        forgot: {
          ...initialState.forgot,
          data: {
            ...initialState.forgot.data,
          },
          request: false,
          error: true,
        },
      };
    }

    case READ_AUTH_FORGOT_SUCCESS: {
      return {
        ...state,
        forgot: {
          ...initialState.forgot,
          data: {
            ...initialState.forgot.data,
          },
        },
      };
    }

    case SET_AUTH_FORGOT_DATA: {
      return {
        ...state,
        forgot: {
          ...state.forgot,
          data: {
            ...state.forgot.data,
            ...action.payload,
          },
        },
      };
    }

    case READ_AUTH_RESET_REQUEST: {
      return {
        ...state,
        reset: {
          ...state.reset,
          data: {
            ...state.reset.data,
          },
          request: true,
        },
      };
    }

    case READ_AUTH_RESET_ERROR: {
      console.error(action.payload.message);

      return {
        ...state,
        reset: {
          ...initialState.reset,
          data: {
            ...initialState.reset.data,
          },
          request: false,
          error: true,
        },
      };
    }

    case READ_AUTH_RESET_SUCCESS: {
      return {
        ...state,
        reset: {
          ...initialState.reset,
          data: {
            ...initialState.reset.data,
          },
        },
      };
    }

    case SET_AUTH_RESET_DATA: {
      return {
        ...state,
        reset: {
          ...state.reset,
          data: {
            ...state.reset.data,
            ...action.payload,
          },
        },
      };
    }

    default:
      return state;
  }
};
