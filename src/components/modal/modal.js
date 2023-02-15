import React from 'react';
import ReactDOM from 'react-dom';
import ModalHeader from './modal-header/modal-header';
import ModalOverlay from './modal-overlay/modal-overlay';
import styles from './modal.module.css'
import classNames from 'classnames';
import PropTypes from 'prop-types';

const rootPortal = document.getElementById("root-portal");

const Modal = ({ children, header, onClose, isOpen }) => {
    const modalClassName = classNames(styles.modal, 'pt-10 pr-10 pb-15 pl-10');
    const modalWrapperClassName = classNames(styles.wrapper);

    React.useEffect(() => {
        const handleEscKeyUp = (e) => {
            if (isOpen && e.keyCode === 27) {
                onClose();
            }
        };
        document.addEventListener('keyup', handleEscKeyUp);

        return (() => {
            document.removeEventListener('keyup', handleEscKeyUp)
        });
    }, [isOpen, onClose]);

    if (!isOpen) return;
    return ReactDOM.createPortal(
        (
            <div className={modalWrapperClassName}>
                <div className={modalClassName}>
                    <ModalHeader onClose={onClose}>{header}</ModalHeader>
                    {children}
                </div>
                <ModalOverlay onClose={onClose} />
            </div>
        ), rootPortal);
}

Modal.propTypes = {
    children: PropTypes.node.isRequired,
    header: PropTypes.string,
    onClose: PropTypes.func.isRequired,
    isOpen: PropTypes.bool.isRequired
};

export default Modal;