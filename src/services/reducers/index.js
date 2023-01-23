import {
    combineReducers,
} from 'redux';

const appReducer = (
    state = {
        loading: true,
    }
    , action
) => {

    switch(action.type) {
        default:
            return state;
    }

};

const menuReducer = (
    state = {
        items: [],
        item: null,
    }
    , action
) => {

    switch(action.type) {
        default:
            return state;
    }

};

const orderReducer = (
    state = {
        items: [],
        status: {
            number: null,
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

export const rootReducer = combineReducers({
    app: appReducer,
    menu: menuReducer,
    order: orderReducer,
});