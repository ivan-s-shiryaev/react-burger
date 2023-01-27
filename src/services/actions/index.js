import {
    BASE_URL,
} from '../../constants';
import {
    checkResponse,
} from '../../utils';

export const GET_MENU_ITEMS_REQUEST = 'GET_MENU_ITEMS_REQUEST';
export const GET_MENU_ITEMS_SUCCESS = 'GET_MENU_ITEMS_SUCCESS';
export const GET_MENU_ITEMS_FAILED = 'GET_MENU_ITEMS_FAILED';
export const SET_MENU_ITEM = 'SET_MENU_ITEM';
export const SET_MENU_CATEGORY = 'SET_MENU_CATEGORY';
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

        })
        .catch((error) => {

            dispatch({
                type: GET_MENU_ITEMS_FAILED,
                payload: error,
            });

        });

    };

}
