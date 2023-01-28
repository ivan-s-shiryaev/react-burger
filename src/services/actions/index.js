import {
    BASE_URL,
} from '../../constants';
import {
    checkResponse,
} from '../../utils';

export const GET_MENU_ITEMS_REQUEST = 'GET_MENU_ITEMS_REQUEST';
export const GET_MENU_ITEMS_SUCCESS = 'GET_MENU_ITEMS_SUCCESS';
export const GET_MENU_ITEMS_ERROR = 'GET_MENU_ITEMS_ERROR';
export const RESET_MENU_ITEMS_COUNT = 'RESET_MENU_ITEMS_COUNT';
export const SET_MENU_ITEM = 'SET_MENU_ITEM';
export const SET_MENU_CATEGORY = 'SET_MENU_CATEGORY';
export const INCREASE_MENU_ITEM_COUNT = 'INCREASE_MENU_ITEM_COUNT';
export const DECREASE_MENU_ITEM_COUNT = 'DECREASE_MENU_ITEM_COUNT';
export const GET_ORDER_STATUS_REQUEST = 'GET_ORDER_STATUS_REQUEST';
export const GET_ORDER_STATUS_SUCCESS = 'GET_ORDER_STATUS_SUCCESS';
export const GET_ORDER_STATUS_ERROR = 'GET_ORDER_STATUS_ERROR';
export const RESET_ORDER_STATUS = 'RESET_ORDER_STATUS';
export const REORDER_ORDER_ITEMS = 'REORDER_ORDER_ITEMS';
export const ADD_ORDER_ITEM = 'ADD_ORDER_ITEM';
export const REMOVE_ORDER_ITEM = 'REMOVE_ORDER_ITEM';
export const CALCULATE_ORDER_TOTAL = 'CALCULATE_ORDER_TOTAL';
export const SHOW_MODAL = 'SHOW_MODAL';
export const HIDE_MODAL = 'HIDE_MODAL';

export function getMenuItems() {
    return function(dispatch) {

        dispatch({
            type: GET_MENU_ITEMS_REQUEST
        });

        fetch(
            `${BASE_URL}/ingredients`
            , {
                method: 'GET',
                headers: { 'Content-Type':'application/json' },
            }
        )
        .then((response) => {

            checkResponse(response);

            return response.json();

        })
        .then((content) => {

            dispatch({
                type: GET_MENU_ITEMS_SUCCESS,
                payload: content.data,
            });

            dispatch({ type: RESET_MENU_ITEMS_COUNT });

        })
        .catch((error) => {

            dispatch({
                type: GET_MENU_ITEMS_ERROR,
                payload: error,
            });

            dispatch({
                type: GET_ORDER_STATUS_ERROR,
                payload: error,
            });

        });

    };

}

export function addOrderItem(item) {
    return function(dispatch) {

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

export function removeOrderItem(item) {
    return function(dispatch) {

        dispatch({
            type: DECREASE_MENU_ITEM_COUNT,
            payload: item,
        });

        dispatch({
            type: REMOVE_ORDER_ITEM,
            payload: item
        });

    };
}

export function getOrderStatus(items) {
    return function(dispatch) {

        const getOrderItem_Id = (value)  => value.id;

        dispatch({ type: RESET_ORDER_STATUS });

        dispatch({ type: GET_ORDER_STATUS_REQUEST });

        fetch(
            `${BASE_URL}/orders`
            , {
                method: 'POST',
                headers: { 'Content-Type':'application/json' },
                body: JSON.stringify({
                    ingredients: [
                        ...items.locked.map(getOrderItem_Id),
                        ...items.unlocked.map(getOrderItem_Id),
                        ...items.locked.map(getOrderItem_Id),
                    ],
                }),
            }
        )
        .then((response) => {

            checkResponse(response);

            return response.json();

        })
        .then((content) => {

            dispatch({
                type: GET_ORDER_STATUS_SUCCESS,
                payload: {
                    number: content.order.number,
                    name: content.name,
                },
            });

        })
        .catch((error) => {

            dispatch({ type: RESET_ORDER_STATUS });

            dispatch({
                type: GET_ORDER_STATUS_ERROR,
                payload: error,
            });

        });

    };

}
