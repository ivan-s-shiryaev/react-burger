import {
    useSelector,
    useDispatch,
} from 'react-redux';

import {
    SHOW_MODAL,
    HIDE_MODAL,
} from '../../services/actions';

const withModal = (WrappedComponent) => (props) => {

    const modal = useSelector((state) => {
        // console.log('M', state.modal);
        return state.modal;
    });
    const dispatch = useDispatch();

    const handleModalShow = () => {

        dispatch({ type: SHOW_MODAL });

    };

    const handleModalHide = () => {

        dispatch({ type: HIDE_MODAL });

    };

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