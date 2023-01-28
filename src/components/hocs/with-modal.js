import {
    useSelector,
} from 'react-redux';

import {
    MODAL_PROPTYPES,
} from '../../constants';

const withModal = (WrappedComponent) => (props) => {

    const modal = useSelector((state) => state.modal);

    return (
        <WrappedComponent
            {...props}
            modal={modal}
        />
    )
};

withModal.propTypes = MODAL_PROPTYPES;

export default withModal;