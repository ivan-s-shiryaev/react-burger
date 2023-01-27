import PropTypes from 'prop-types';
import React from 'react';
import ReactDOM from 'react-dom';
import {
    CloseIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";

import ModalOverlay from '../modal-overlay/modal-overlay';
import modalStyles from './modal.module.css';

const modalRoot = document.getElementById('root-modal');

const Modal = (props) => {

    React.useEffect(() => {

        const handleEscapePress = (event) => {

            if (event.key === 'Escape') {
                event.preventDefault();
                props.handleClose();
            }
    
        };

        document.addEventListener('keydown', handleEscapePress);
        
        return () => {
            document.removeEventListener('keydown', handleEscapePress);
        }

    }, [ props ]);

    const handleContainerClick = React.useCallback(
        (event) => {

            event.preventDefault();
            event.stopPropagation();
            props.handleClose();

        }
        , [ props ]
    );

    const handleContentClick = React.useCallback(
        (event) => {

            event.preventDefault();
            event.stopPropagation();

        }
        , []
    );

    const handleControlClick = React.useCallback(
        (event) => {

            event.preventDefault();
            event.stopPropagation();
            props.handleClose();

        }
        , [ props ]
    );

    return ReactDOM.createPortal(
        <div
            className={`${modalStyles.wrapper}`
        }>
            <ModalOverlay />
            <div
                className={`${modalStyles.container}`}
                onClick={handleContainerClick}
            >
                <div
                    className={`${modalStyles.content}`}
                    onClick={handleContentClick}
                >
                    {
                        props.header
                            ? (
                                <h2
                                    className={`${modalStyles.header} text text_type_main-large mt-10 mr-10 ml-10 pr-15`}
                                >
                                    {props.header}
                                </h2>
                            )
                            : null
                    }
                    {
                        props.children
                    }
                    <div
                        className={`${modalStyles.control}`}
                        onClick={handleControlClick}
                    >
                        <CloseIcon
                            type="primary"
                        />
                    </div>
                </div>
            </div>
        </div>
        , modalRoot
    );

};

Modal.propTypes = PropTypes.shape({
    header: PropTypes.string,
    handleClose: PropTypes.func.isRequired,
}).isRequired;

export default Modal;