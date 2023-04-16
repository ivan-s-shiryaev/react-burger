import { BASE_URL } from "../../constants";
import {
  TDnDItem,
  TMenuItems,
  TMenuCategory,
  TOrderReorder,
  TOrderItem,
  TOrderItems,
  TOrderStatus,
  TDispatch,
  TThunk,
  checkResponse,
  getCookie,
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

export function getMenuItems(): TThunk {
  return async function (dispatch: TDispatch) {
    let result = false;

    try {
      dispatch({
        type: GET_MENU_ITEMS_REQUEST,
      });

      const response = await fetch(`${BASE_URL}/ingredients`, {
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

      const response = await fetch(`${BASE_URL}/orders`, {
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
