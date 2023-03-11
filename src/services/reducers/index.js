import {
    combineReducers,
} from 'redux';

import authReduser from './auth';
import {
    menuReducer,
    orderReducer,
    modalReducer,
} from './order';

export const rootReducer = combineReducers({
    auth: authReduser,
    menu: menuReducer,
    order: orderReducer,
    modal: modalReducer,
});