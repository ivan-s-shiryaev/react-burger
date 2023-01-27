import React from 'react';
import {
    useSelector,
    useDispatch,
} from 'react-redux';

import {
    SHOW_MODAL,
    HIDE_MODAL,
} from '../../services/actions';

const withModal = (WrappedComponent) => (props) => {

    const modal = useSelector((state) => state.modal);

    const dispatch = useDispatch();

    const handleModalShow = React.useCallback(
        () => {

            dispatch({ type: SHOW_MODAL });

        }
        , [ dispatch ]
    );

    const handleModalHide = React.useCallback(
        () => {

            dispatch({ type: HIDE_MODAL });

        }
        , [ dispatch ]
    );

    return (
        <WrappedComponent
            {...props}
            modal={modal}
            handleModalShow={handleModalShow}
            handleModalHide={handleModalHide}
        />
    )
};

export default withModal;