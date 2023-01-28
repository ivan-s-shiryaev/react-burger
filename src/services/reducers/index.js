import {
    combineReducers,
} from 'redux';

import {
    GET_MENU_ITEMS_REQUEST,
    GET_MENU_ITEMS_SUCCESS,
    GET_MENU_ITEMS_ERROR,
    RESET_MENU_ITEMS_COUNT,
    SET_MENU_ITEM,
    SET_MENU_CATEGORY,
    INCREASE_MENU_ITEM_COUNT,
    DECREASE_MENU_ITEM_COUNT,
    GET_ORDER_STATUS_REQUEST,
    GET_ORDER_STATUS_SUCCESS,
    GET_ORDER_STATUS_ERROR,
    RESET_ORDER_STATUS,
    REORDER_ORDER_ITEMS,
    ADD_ORDER_ITEM,
    REMOVE_ORDER_ITEM,
    SHOW_MODAL,
    HIDE_MODAL,
} from '../actions';

const initialStateMenu = {
    item: null,
    items: [],
    itemsRequest: false,
    itemsError: false,
    category: null,
    categories: new Set(),
};
const initialStateOrder = {
    total: {
        locked: 0,
        unlocked: 0,
    },
    items: {
        locked: [],
        unlocked: [],
    },
    status: {
        number: null,
        name: null,
    },
    statusRequest: false,
    statusError: false,
}

const menuReducer = (state = initialStateMenu, action) => {

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
                itemsError: false,
                category: action.payload[0].type,
                categories: action.payload.reduce(
                    (accumulator, { type }) => accumulator.add(type)
                    , new Set()
                ),
            };
        }

        case GET_MENU_ITEMS_ERROR: {
            return {
                ...initialStateMenu,
                itemsError: true,
            };
        }

        case RESET_MENU_ITEMS_COUNT: {
            return {
                ...state,
                items: state.items.map((value) => ({ ...value, count: 0 }))
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
    
        case INCREASE_MENU_ITEM_COUNT: {

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

        case DECREASE_MENU_ITEM_COUNT: {

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

const orderReducer = (state = initialStateOrder, action) => {

    switch(action.type) {

        case GET_ORDER_STATUS_REQUEST: {
            return {
                ...state,
                statusRequest: true,
            };
        }

        case GET_ORDER_STATUS_SUCCESS: {
            return {
                ...state,
                status: { ...action.payload },
                statusRequest: false,
                statusError: false,
            };
        }

        case GET_ORDER_STATUS_ERROR: {
            return {
                ...state,
                statusError: true,
            };
        }
    
        case RESET_ORDER_STATUS: {
            return {
                ...state,
                status: { ...initialStateOrder.status },
            };
        }

        case REORDER_ORDER_ITEMS: {

            const items = [ ...state.items.unlocked ];
            const item = items.splice(action.payload.from, 1)[0];

            items.splice(action.payload.to, 0, item);

            return {
                ...state,
                items: {
                    ...state.items,
                    unlocked: items,
                },
            };

        }

        case ADD_ORDER_ITEM: {

            const time = new Date().getTime();

            return action.payload.type === 'bun'
                ? {
                    ...state,
                    total: {
                        ...state.total,
                        locked: action.payload.price * 2,
                    },
                    items: {
                        ...state.items,
                        locked: [ { id: action.payload.id, time } ],
                    },
                }
                : {
                    ...state,
                    total: {
                        ...state.total,
                        unlocked: state.total.unlocked + action.payload.price,
                    },
                    items: {
                        ...state.items,
                        unlocked: [ { id: action.payload.id, time }, ...state.items.unlocked ],
                    },
                }
            ;
        }

        case REMOVE_ORDER_ITEM: {
            return state.items.unlocked[action.payload.index] !== undefined
                ? {
                    ...state,
                    total: {
                        ...state.total,
                        unlocked: state.total.unlocked - action.payload.price,
                    },
                    items: {
                        ...state.items,
                        unlocked: [
                            ...state.items.unlocked.slice(0, action.payload.index),
                            ...state.items.unlocked.slice(action.payload.index + 1)
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
    state = ''
    , action
) => {

    switch(action.type) {

        case SHOW_MODAL: {
            return action.payload;
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