import React from 'react';
import ReactDOM from 'react-dom';
// import PropTypes from 'prop-types';
import {
    CloseIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";

import modalStyles from './modal.module.css';
import ModalOverlay from '../modal-overlay/modal-overlay';

const modalRoot = document.getElementById('root-modal');

const Modal = props => {

    React.useEffect(() => {

        const handleEscapePress = (event) => {

            if (event.keyCode === 27) {
                event.preventDefault();
                props.close();
            }
    
        };

        document.addEventListener('keydown', handleEscapePress);
        
        return () => {
            document.removeEventListener('keydown', handleEscapePress);
        }

    }, [props]);

    const handleContainerClick = event => {

        event.preventDefault();
        event.stopPropagation();
        props.close();

    };

    const handleContentClick = event => {

        event.preventDefault();
        event.stopPropagation();

    };

    const handleControlClick = event => {

        event.preventDefault();
        event.stopPropagation();
        props.close();

    };

    return ReactDOM.createPortal(
        <div className={`${modalStyles.wrapper}`}>
            <ModalOverlay />
            <div className={`${modalStyles.container}`} onClick={handleContainerClick}>
                <div className={`${modalStyles.content}`} onClick={handleContentClick}>
                    {props.header === '' ? null : (<h2 className={`${modalStyles.header}`}>{props.header}</h2>)}
                    {props.children}
                    <div  className={`${modalStyles.control}`} onClick={handleControlClick}>
                        <CloseIcon type="primary" />
                    </div>
                </div>
            </div>
        </div>,
        modalRoot
    );

}

//TODO: PropTypes
// App.propTypes = {
//     ingredients: PropTypes.arrayOf(DATA_INGREDIENT_PROPTYPES.isRequired).isRequired,
// };

export default Modal;