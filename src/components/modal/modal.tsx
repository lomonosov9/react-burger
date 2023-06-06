import React, {PropsWithChildren, ReactPortal} from 'react';
import ReactDOM from 'react-dom';
import ModalHeader from './modal-header/modal-header';
import ModalOverlay from './modal-overlay/modal-overlay';
import styles from './modal.module.css'
import classNames from 'classnames';

const rootPortal: HTMLElement = document.getElementById("root-portal") as HTMLElement;

type ModalProps = {
    header?: string;
    isOpen: boolean,
    onClose(): void
}

const Modal = ({ children, header, onClose, isOpen }: PropsWithChildren<ModalProps> ): ReactPortal => {
    const modalClassName = classNames(styles.modal, 'pt-10 pr-10 pb-15 pl-10');
    const modalWrapperClassName = classNames(styles.wrapper);

    React.useEffect(() => {
        const handleEscKeyUp = (e: KeyboardEvent) => {
            if (isOpen && e.key === 'Escape') {
                onClose();
            }
        };
        document.addEventListener('keyup', handleEscKeyUp);

        return (() => {
            document.removeEventListener('keyup', handleEscKeyUp)
        });
    }, [isOpen, onClose]);

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

export default Modal;