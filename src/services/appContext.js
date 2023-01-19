import React from 'react';
import PropTypes from 'prop-types';

import {
    INGREDIENT_PROPTYPES,
} from '../constants';

const OrderContext = React.createContext();

OrderContext.Provider.propTypes = {
    value: PropTypes.shape({
        data: PropTypes.shape({
            body: PropTypes.arrayOf(INGREDIENT_PROPTYPES.isRequired).isRequired,
            head: PropTypes.arrayOf(INGREDIENT_PROPTYPES.isRequired).isRequired,
            tail: PropTypes.arrayOf(INGREDIENT_PROPTYPES.isRequired).isRequired,
        }).isRequired,
        _setData: PropTypes.func.isRequired,
        getStatus: PropTypes.func.isRequired,
        setStatus: PropTypes.func.isRequired,
        getTotal: PropTypes.func.isRequired,
        removeIngredient: PropTypes.func.isRequired,
    }).isRequired
};

export {
    OrderContext
};
