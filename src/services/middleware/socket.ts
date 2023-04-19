import type { AnyAction, Middleware, MiddlewareAPI } from "redux";

import type { RootState, TDispatch, TwsActions } from "../../utils";
import { getEventError, getCookie } from "../../utils";
import { refreshAuthToken } from "../actions/auth";
import { WS_STATUS_CODE } from "../../constants";

const socketMiddleware = (wsActions: TwsActions): Middleware => {
  return (store: MiddlewareAPI<TDispatch, RootState>) => {
    let url = "";
    let isConnected = false;
    let timerReconnect = 0;
    let socket: WebSocket | null = null;

    return (next) => (action: AnyAction) => {
      const { dispatch } = store;

      if (action.type === wsActions.onStart) {
        url = action.payload;
        if (action.auth) {
          url += `?token=${getCookie("access")}`;
        }

        socket = new WebSocket(url);

        isConnected = true;
        window.clearTimeout(timerReconnect);
        dispatch({ type: wsActions.onSuccess });
      }

      if (socket) {
        socket.onopen = () => {
          dispatch({ type: wsActions.onOpen });
        };

        socket.onclose = (event) => {
          if (event.code !== WS_STATUS_CODE.CLOSE_NORMAL) {
            dispatch({
              type: wsActions.onError,
              payload: getEventError(event),
            });
            socket?.close();
          }
          if (isConnected) {
            dispatch({ type: wsActions.onClosed });
            timerReconnect = window.setTimeout(() => {
              dispatch({
                type: wsActions.onStart,
                payload: url,
                auth: action.auth,
              });
            }, 3000);
          }
        };

        socket.onmessage = (event) => {
          const { data } = event;
          const content = JSON.parse(data);

          if (content?.success) {
            const { success, ...restContent } = content;
            dispatch({ type: wsActions.onMessage, payload: restContent });
          } else {
            if (content?.message === "Invalid or missing token") {
              (async () => {
                await refreshAuthToken();
              })();
            }
            dispatch({
              type: wsActions.onError,
              payload: new Error(content?.message),
            });
          }
        };

        socket.onerror = (event) => {
          dispatch({ type: wsActions.onError, payload: getEventError(event) });
        };

        if (action.type === wsActions.onDisconnect) {
          window.clearTimeout(timerReconnect);
          isConnected = false;
          timerReconnect = 0;
          socket.close();
          dispatch({ type: wsActions.onClosed });
        }
      }

      next(action);
    };
  };
};

export default socketMiddleware;
