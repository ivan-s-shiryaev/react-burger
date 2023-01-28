import {
    combineReducers,
} from 'redux';

import {
    GET_MENU_ITEMS_REQUEST,
    GET_MENU_ITEMS_SUCCESS,
    GET_MENU_ITEMS_FAILED,
    SET_MENU_ITEM,
    SET_MENU_CATEGORY,
    INCREASE_MENU_ITEM,
    DECREASE_MENU_ITEM,
    ADD_ORDER_ITEM,
    REMOVE_ORDER_ITEM,
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
            const items = action.payload.map((value) => ({ ...value, count: 0 }));
            return {
                ...state,
                items,
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
            const item = state.items.find((value) => value._id === action.payload);
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
    
        case INCREASE_MENU_ITEM: {

            const item = state.items.find((value) => value._id === action.payload.id);
            const items = item === undefined
                ? state.items
                : state.items.reduce(
                    (accumulator, value) => {
                        accumulator.push(
                            {
                                ...value,
                                count: item.type === 'bun'
                                    ? value._id === item._id
                                        ? 2
                                        : value.type === 'bun'
                                            ? 0
                                            : value.count
                                    : value._id === item._id
                                        ? value.count + 1
                                        : value.count
                                ,
                            }
                        );
                        return accumulator;
                    }
                    , []
                )
            ;

            return {
                ...state,
                items,
            };

        }

        case DECREASE_MENU_ITEM: {

            const item = state.items.find((value) => value._id === action.payload);
            const items = item === undefined
                ? state.items
                : state.items.reduce(
                    (accumulator, value) => {
                        accumulator.push(
                            {
                                ...value,
                                count: item.type === 'bun'
                                    ? value._id === item._id
                                        ? 0
                                        : value.count
                                    : value._id === item._id
                                        ? value.count - 1
                                        : value.count
                            }
                        );
                        return accumulator;
                    }
                    , []
                )
            ;

            return {
                ...state,
                items,
            };

        }

        default:
            return state;

    }

};

const orderReducer = (
    state = {
        items: {
            locked: [],
            unlocked: [],
        },
        status: {
            _id: null,
            name: '',
        },
    }
    , action
) => {

    switch(action.type) {

        case ADD_ORDER_ITEM: {
            return action.payload.type === 'bun'
                ? {
                    ...state,
                    items: {
                        ...state.items,
                        locked: [ action.payload.id ],
                    },
                }
                : {
                    ...state,
                    items: {
                        ...state.items,
                        unlocked: [ action.payload.id, ...state.items.unlocked ],
                    },
                }
            ;
        }

        case REMOVE_ORDER_ITEM: {
            return state.items.unlocked[action.payload] !== undefined
                ? {
                    ...state,
                    items: {
                        ...state.items,
                        unlocked: [
                            ...state.items.unlocked.slice(0, action.payload),
                            ...state.items.unlocked.slice(action.payload + 1)
                        ],
                    }
                }
                : state
            ;
        }

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