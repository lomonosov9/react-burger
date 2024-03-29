import styles from './modal-overlay.module.css'

type ModalOverlayProps = {
    onClose(): void;
}

const ModalOverlay: React.FC<ModalOverlayProps> = ({onClose})=>{
    return (
        <div className={styles.overlay} onClick = {onClose} data-test="modal-overlay"/>
    )
}

export default ModalOverlay;