import React from 'react';

const withModal = (WrappedComponent) => (props) => {

    const [modal, setModal] = React.useState(false);

    const handleModalShow = () => {

        setModal(true);

    };

    const handleModalHide = () => {

        setModal(false);

    };

    return (
        <WrappedComponent {...props} modal={modal} handleModalShow={handleModalShow} handleModalHide={handleModalHide} />
    )
};

export default withModal;