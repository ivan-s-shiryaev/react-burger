import React from 'react';
import ReactDOM from 'react-dom';
// import PropTypes from 'prop-types';

import modalStyles from './modal.module.css';
import ModalOverlay from '../modal-overlay/modal-overlay';

const modalRoot = document.getElementById('root-modal');

const Modal = props => {

    return ReactDOM.createPortal(
        <React.Fragment>
            <ModalOverlay close={props.close} />
            <div className={`${modalStyles.container} pt-30 pr-25 pb-30 pl-25`}>
                <h2 className={modalStyles.header}>{props.header}</h2>
                {props.children}
            </div>
        </React.Fragment>,
        modalRoot
    );

}

//TODO: PropTypes
// App.propTypes = {
//     ingredients: PropTypes.arrayOf(DATA_INGREDIENT_PROPTYPES.isRequired).isRequired,
// };

export default Modal;