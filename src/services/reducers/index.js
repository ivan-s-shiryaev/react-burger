import {
    combineReducers,
} from 'redux';

import {
    GET_MENU_ITEMS_REQUEST,
    GET_MENU_ITEMS_SUCCESS,
    GET_MENU_ITEMS_FAILED,
    SET_MENU_ITEM,
    SET_MENU_CATEGORY,
    SHOW_MODAL,
    HIDE_MODAL,
} from '../actions';

const menuReducer = (
    state = {
        item: null,
        items: [],
        itemsRequest: false,
        itemsFailed: false,
        category: null,
        categories: new Set(),
    }
    , action
) => {

    switch(action.type) {

        case GET_MENU_ITEMS_REQUEST: {
            return {
                ...state,
                itemsRequest: true,
            };
        }

        case GET_MENU_ITEMS_SUCCESS: {
            return {
                ...state,
                items: action.payload,
                itemsRequest: false,
                itemsFailed: false,
                category: action.payload[0].type,
                categories: action.payload.reduce(
                    (accumulator, { type }) => accumulator.add(type)
                    , new Set()
                ),
            };
        }

        case GET_MENU_ITEMS_FAILED: {
            return {
                ...state,
                itemsRequest: false,
                itemsFailed: true,
            };
        }

        case SET_MENU_ITEM: {
            const item = state.items.find((value) => value._id === action.id);
            return {
                ...state,
                item: item === undefined ? null : {...item},
            };
        }

        case SET_MENU_CATEGORY: {
            const categories = state.categories;
            const category = [...categories].find((value) => value === action.payload);
            return {
                ...state,
                category: category === undefined ? null : category,
            };
        }

        default:
            return state;

    }

};

const orderReducer = (
    state = {
        items: [],
        status: {
            _id: null,
            name: '',
        },
    }
    , action
) => {

    switch(action.type) {
        default:
            return state;
    }

};

const modalReducer = (
    state = false
    , action
) => {

    switch(action.type) {

        case SHOW_MODAL: {
            return true;
        }

        case HIDE_MODAL: {
            return false;
        }

        default:
            return state;

    }

};

export const rootReducer = combineReducers({
    menu: menuReducer,
    order: orderReducer,
    modal: modalReducer,
});