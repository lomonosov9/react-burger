import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './modal-header.module.css';
import classNames from 'classnames';
import PropTypes from 'prop-types';

const ModalHeader = ({ onClose, children }) => {
    const headerClassName = classNames(styles.header);
    const titleClassName = classNames('text text_type_main-large');

    return (
        <div className={headerClassName}>
            <span className={titleClassName}>
                {children}
            </span>
            <CloseIcon type="primary" onClick={onClose} />
        </div>
    )
}

ModalHeader.propTypes = {
    children: PropTypes.node , 
    onClose: PropTypes.func.isRequired
};

export default ModalHeader;