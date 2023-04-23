import { BASE_URL_HTTP } from "../../constants";
import {
  TDnDItem,
  TMenuItems,
  TMenuCategory,
  TOrderReorder,
  TOrderItem,
  TOrderItems,
  TOrderStatus,
  TOrderEntry,
  TDispatch,
  TThunk,
  checkResponse,
  getCookie,
  TOrderData,
} from "../../utils";

export const GET_MENU_ITEMS_REQUEST: "GET_MENU_ITEMS_REQUEST" =
  "GET_MENU_ITEMS_REQUEST";
export const GET_MENU_ITEMS_SUCCESS: "GET_MENU_ITEMS_SUCCESS" =
  "GET_MENU_ITEMS_SUCCESS";
export const GET_MENU_ITEMS_ERROR: "GET_MENU_ITEMS_ERROR" =
  "GET_MENU_ITEMS_ERROR";
export const RESET_MENU_ITEMS_COUNT: "RESET_MENU_ITEMS_COUNT" =
  "RESET_MENU_ITEMS_COUNT";
export const SET_MENU_ITEM: "SET_MENU_ITEM" = "SET_MENU_ITEM";
export const SET_MENU_CATEGORY: "SET_MENU_CATEGORY" = "SET_MENU_CATEGORY";
export const INCREASE_MENU_ITEM_COUNT: "INCREASE_MENU_ITEM_COUNT" =
  "INCREASE_MENU_ITEM_COUNT";
export const DECREASE_MENU_ITEM_COUNT: "DECREASE_MENU_ITEM_COUNT" =
  "DECREASE_MENU_ITEM_COUNT";
export const GET_ORDER_STATUS_REQUEST: "GET_ORDER_STATUS_REQUEST" =
  "GET_ORDER_STATUS_REQUEST";
export const GET_ORDER_STATUS_SUCCESS: "GET_ORDER_STATUS_SUCCESS" =
  "GET_ORDER_STATUS_SUCCESS";
export const GET_ORDER_STATUS_ERROR: "GET_ORDER_STATUS_ERROR" =
  "GET_ORDER_STATUS_ERROR";
export const RESET_ORDER_STATUS: "RESET_ORDER_STATUS" = "RESET_ORDER_STATUS";
export const REORDER_ORDER_ITEMS: "REORDER_ORDER_ITEMS" = "REORDER_ORDER_ITEMS";
export const ADD_ORDER_ITEM: "ADD_ORDER_ITEM" = "ADD_ORDER_ITEM";
export const REMOVE_ORDER_ITEM: "REMOVE_ORDER_ITEM" = "REMOVE_ORDER_ITEM";
export const START_ORDER_FEED = "START_ORDER_FEED";
export const OPEN_ORDER_FEED = "OPEN_ORDER_FEED";
export const SUCCESS_ORDER_FEED = "SUCCESS_ORDER_FEED";
export const CLOSED_ORDER_FEED = "CLOSED_ORDER_FEED";
export const DISCONNECT_ORDER_FEED = "DISCONNECT_ORDER_FEED";
export const ERROR_ORDER_FEED = "ERROR_ORDER_FEED";
export const MESSAGE_ORDER_FEED = "MESSAGE_ORDER_FEED";
export const START_ORDER_USER = "START_ORDER_USER";
export const OPEN_ORDER_USER = "OPEN_ORDER_USER";
export const SUCCESS_ORDER_USER = "SUCCESS_ORDER_USER";
export const CLOSED_ORDER_USER = "CLOSED_ORDER_USER";
export const DISCONNECT_ORDER_USER = "DISCONNECT_ORDER_USER";
export const ERROR_ORDER_USER = "ERROR_ORDER_USER";
export const MESSAGE_ORDER_USER = "MESSAGE_ORDER_USER";
export const GET_ORDER_ENTRY_REQUEST: "GET_ORDER_ENTRY_REQUEST" =
  "GET_ORDER_ENTRY_REQUEST";
export const GET_ORDER_ENTRY_SUCCESS: "GET_ORDER_ENTRY_SUCCESS" =
  "GET_ORDER_ENTRY_SUCCESS";
export const GET_ORDER_ENTRY_ERROR: "GET_ORDER_ENTRY_ERROR" =
  "GET_ORDER_ENTRY_ERROR";

export interface IGetMenuItemsRequestAction {
  readonly type: typeof GET_MENU_ITEMS_REQUEST;
}

export interface IGetMenuItemsSuccessAction {
  readonly type: typeof GET_MENU_ITEMS_SUCCESS;
  readonly payload: TMenuItems;
}

export interface IGetMenuItemsErrorAction {
  readonly type: typeof GET_MENU_ITEMS_ERROR;
  readonly payload: Error;
}

export interface IResetMenuItemsCountAction {
  readonly type: typeof RESET_MENU_ITEMS_COUNT;
}

export interface ISetMenuItemAction {
  readonly type: typeof SET_MENU_ITEM;
  readonly payload: string | null;
}

export interface ISetMenuCategoryAction {
  readonly type: typeof SET_MENU_CATEGORY;
  readonly payload: TMenuCategory;
}

export interface IIncreaseMenuItemCountAction {
  readonly type: typeof INCREASE_MENU_ITEM_COUNT;
  readonly payload: TDnDItem;
}

export interface IDecreaseMenuItemCountAction {
  readonly type: typeof DECREASE_MENU_ITEM_COUNT;
  readonly payload: TDnDItem;
}

export interface IGetOrderStatusRequestAction {
  readonly type: typeof GET_ORDER_STATUS_REQUEST;
}

export interface IGetOrderStatusSuccessAction {
  readonly type: typeof GET_ORDER_STATUS_SUCCESS;
  readonly payload: TOrderStatus;
}

export interface IGetOrderStatusErrorAction {
  readonly type: typeof GET_ORDER_STATUS_ERROR;
  readonly payload: Error;
}

export interface IResetOrderStatusAction {
  readonly type: typeof RESET_ORDER_STATUS;
}

export interface IReorderOrderItemsAction {
  readonly type: typeof REORDER_ORDER_ITEMS;
  readonly payload: TOrderReorder;
}

export interface IAddOrderItemAction {
  readonly type: typeof ADD_ORDER_ITEM;
  readonly payload: TDnDItem;
}

export interface IRemoveOrderItemAction {
  readonly type: typeof REMOVE_ORDER_ITEM;
  readonly payload: TDnDItem;
}

export interface IStartOrderFeedAction {
  readonly type: typeof START_ORDER_FEED;
  readonly payload: string;
}

export interface IOpenOrderFeedAction {
  readonly type: typeof OPEN_ORDER_FEED;
}

export interface ISuccessOrderFeedAction {
  readonly type: typeof SUCCESS_ORDER_FEED;
}

export interface IClosedOrderFeedAction {
  readonly type: typeof CLOSED_ORDER_FEED;
}

export interface IDisconnectOrderFeedAction {
  readonly type: typeof DISCONNECT_ORDER_FEED;
}

export interface IErrorOrderFeedAction {
  readonly type: typeof ERROR_ORDER_FEED;
  readonly payload: Error;
}

export interface IMeaasegOrderFeedAction {
  readonly type: typeof MESSAGE_ORDER_FEED;
  readonly payload: TOrderData;
}

export interface IStartOrderUserAction {
  readonly type: typeof START_ORDER_USER;
  readonly payload: string;
  readonly auth: boolean;
}

export interface IOpenOrderUserAction {
  readonly type: typeof OPEN_ORDER_USER;
}

export interface ISuccessOrderUserAction {
  readonly type: typeof SUCCESS_ORDER_USER;
}

export interface IClosedOrderUserAction {
  readonly type: typeof CLOSED_ORDER_USER;
}

export interface IDisconnectOrderUserAction {
  readonly type: typeof DISCONNECT_ORDER_USER;
}

export interface IErrorOrderUserAction {
  readonly type: typeof ERROR_ORDER_USER;
  readonly payload: Error;
}

export interface IMeaasegOrderUserAction {
  readonly type: typeof MESSAGE_ORDER_USER;
  readonly payload: TOrderData;
}

export interface IGetOrderEntryRequestAction {
  readonly type: typeof GET_ORDER_ENTRY_REQUEST;
}

export interface IGetOrderEntrySuccessAction {
  readonly type: typeof GET_ORDER_ENTRY_SUCCESS;
  readonly payload: TOrderEntry;
}

export interface IGetOrderEntryErrorAction {
  readonly type: typeof GET_ORDER_ENTRY_ERROR;
  readonly payload: Error;
}

export type TMenuActions =
  | IGetMenuItemsRequestAction
  | IGetMenuItemsSuccessAction
  | IGetMenuItemsErrorAction
  | IResetMenuItemsCountAction
  | ISetMenuItemAction
  | ISetMenuCategoryAction
  | IIncreaseMenuItemCountAction
  | IDecreaseMenuItemCountAction;

export type TOrderActions =
  | IGetOrderStatusRequestAction
  | IGetOrderStatusSuccessAction
  | IGetOrderStatusErrorAction
  | IResetOrderStatusAction
  | IReorderOrderItemsAction
  | IAddOrderItemAction
  | IRemoveOrderItemAction;

export type TOrderFeedActions =
  | IStartOrderFeedAction
  | IOpenOrderFeedAction
  | ISuccessOrderFeedAction
  | IClosedOrderFeedAction
  | IDisconnectOrderFeedAction
  | IErrorOrderFeedAction
  | IMeaasegOrderFeedAction;

export type TOrderUserActions =
  | IStartOrderUserAction
  | IOpenOrderUserAction
  | ISuccessOrderUserAction
  | IClosedOrderUserAction
  | IDisconnectOrderUserAction
  | IErrorOrderUserAction
  | IMeaasegOrderUserAction;

export type TOrderDataActions =
  | TOrderFeedActions
  | TOrderUserActions
  | IGetOrderEntryRequestAction
  | IGetOrderEntrySuccessAction
  | IGetOrderEntryErrorAction;

export type TwsOrderFeedActions = {
  onStart: typeof START_ORDER_FEED;
  onOpen: typeof OPEN_ORDER_FEED;
  onSuccess: typeof SUCCESS_ORDER_FEED;
  onClosed: typeof CLOSED_ORDER_FEED;
  onDisconnect: typeof DISCONNECT_ORDER_FEED;
  onError: typeof ERROR_ORDER_FEED;
  onMessage: typeof MESSAGE_ORDER_FEED;
};

export type TwsOrderUserActions = {
  onStart: typeof START_ORDER_USER;
  onOpen: typeof OPEN_ORDER_USER;
  onSuccess: typeof SUCCESS_ORDER_USER;
  onClosed: typeof CLOSED_ORDER_USER;
  onDisconnect: typeof DISCONNECT_ORDER_USER;
  onError: typeof ERROR_ORDER_USER;
  onMessage: typeof MESSAGE_ORDER_USER;
};

export function getMenuItems(): TThunk {
  return async function (dispatch: TDispatch) {
    let result = false;

    try {
      dispatch({
        type: GET_MENU_ITEMS_REQUEST,
      });

      const response = await fetch(`${BASE_URL_HTTP}/ingredients`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });
      const content = await response.json();

      try {
        checkResponse(response);
      } catch (error: any) {
        if (content.message) {
          throw new Error(
            `Failed to get burger ingredients: ${content.message}. ${error.message}`
          );
        } else {
          throw error;
        }
      }

      if (content.success) {
        dispatch({
          type: GET_MENU_ITEMS_SUCCESS,
          payload: content.data,
        });

        dispatch({ type: RESET_MENU_ITEMS_COUNT });

        result = true;
      } else {
        throw new Error("Failed to get burger ingredients: empty data");
      }
    } catch (error: any) {
      dispatch({
        type: GET_MENU_ITEMS_ERROR,
        payload: error,
      });

      dispatch({
        type: GET_ORDER_STATUS_ERROR,
        payload: error,
      });
    }

    return result;
  };
}

export function addOrderItem(item: TDnDItem) {
  return function (dispatch: TDispatch) {
    dispatch({
      type: INCREASE_MENU_ITEM_COUNT,
      payload: item,
    });

    dispatch({
      type: ADD_ORDER_ITEM,
      payload: item,
    });
  };
}

export function removeOrderItem(item: TDnDItem) {
  return function (dispatch: TDispatch) {
    dispatch({
      type: DECREASE_MENU_ITEM_COUNT,
      payload: item,
    });

    dispatch({
      type: REMOVE_ORDER_ITEM,
      payload: item,
    });
  };
}

export function getOrderStatus(items: TOrderItems): TThunk {
  return async function (dispatch: TDispatch) {
    let result = false;

    const getOrderItemId = (value: TOrderItem) => value.id;

    try {
      dispatch({ type: RESET_ORDER_STATUS });

      dispatch({ type: GET_ORDER_STATUS_REQUEST });

      const response = await fetch(`${BASE_URL_HTTP}/orders`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getCookie("access")}`,
        },
        body: JSON.stringify({
          ingredients: [
            ...items.locked.map(getOrderItemId),
            ...items.unlocked.map(getOrderItemId),
            ...items.locked.map(getOrderItemId),
          ],
        }),
      });
      const content = await response.json();

      try {
        checkResponse(response);
      } catch (error: any) {
        if (content.message) {
          throw new Error(
            `Failed to make the order: ${content.message}. ${error.message}`
          );
        } else {
          throw error;
        }
      }

      if (content.success) {
        dispatch({
          type: GET_ORDER_STATUS_SUCCESS,
          payload: {
            number: content.order.number,
            name: content.name,
          },
        });

        dispatch({ type: RESET_MENU_ITEMS_COUNT });

        result = true;
      } else {
        throw new Error("Failed to make the order: empty data");
      }
    } catch (error: any) {
      dispatch({ type: RESET_ORDER_STATUS });

      dispatch({
        type: GET_ORDER_STATUS_ERROR,
        payload: error,
      });
    }

    return result;
  };
}

export function getOrderEntry(number: string | undefined): TThunk {
  return async function (dispatch: TDispatch) {
    let result = false;

    try {
      dispatch({ type: GET_ORDER_ENTRY_REQUEST });

      const response = await fetch(`${BASE_URL_HTTP}/orders/${number}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const content = await response.json();

      try {
        checkResponse(response);
      } catch (error: any) {
        if (content.message) {
          throw new Error(
            `Failed to get the order entry: ${content.message}. ${error.message}`
          );
        } else {
          throw error;
        }
      }

      if (content.success) {
        dispatch({
          type: GET_ORDER_ENTRY_SUCCESS,
          payload: content.orders.length > 0 ? { ...content.orders[0] } : null,
        });

        result = true;
      } else {
        throw new Error("Failed to get the order entry: empty data");
      }
    } catch (error: any) {
      dispatch({
        type: GET_ORDER_ENTRY_ERROR,
        payload: error,
      });
    }

    return result;
  };
}

export const wsOrderFeedActions: TwsOrderFeedActions = {
  onStart: START_ORDER_FEED,
  onOpen: OPEN_ORDER_FEED,
  onSuccess: SUCCESS_ORDER_FEED,
  onClosed: CLOSED_ORDER_FEED,
  onDisconnect: DISCONNECT_ORDER_FEED,
  onError: ERROR_ORDER_FEED,
  onMessage: MESSAGE_ORDER_FEED,
};

export const wsOrderUserActions: TwsOrderUserActions = {
  onStart: START_ORDER_USER,
  onOpen: OPEN_ORDER_USER,
  onSuccess: SUCCESS_ORDER_USER,
  onClosed: CLOSED_ORDER_USER,
  onDisconnect: DISCONNECT_ORDER_USER,
  onError: ERROR_ORDER_USER,
  onMessage: MESSAGE_ORDER_USER,
};
