import React, {PropsWithChildren} from 'react';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './modal-header.module.css';
import classNames from 'classnames';

type ModalHeaderProps = {
    onClose() : void;
}

const ModalHeader = ({ onClose, children }: PropsWithChildren<ModalHeaderProps>) => {
    const headerClassName = classNames(styles.header);
    const titleClassName = classNames('text text_type_main-large');

    return (
        <div className={headerClassName}>
            <span className={titleClassName}>
                {children}
            </span>
            <span className={styles.iconWrapper} data-test='modal-close'>
                <CloseIcon type="primary" onClick={onClose} />
            </span>
        </div>
    )
}

export default ModalHeader;