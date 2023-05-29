import styles from './component-icon.module.css'

type ComponentIconProps = {
    src: string;
    overflow?: number;
    extraClass?: string;
}
const ComponentIcon: React.FC<ComponentIconProps> = ({ src, overflow = 0, extraClass = "" }) => {
    return (
        <div className={`${styles.container} ${extraClass}`}>
            <div className={styles.picture}>
                <img src={src} alt="" width="112" height="56" />
            </div>
            {overflow > 0 &&
                <div className={`${styles.container} ${styles.picture} ${styles.overflow}`}>
                    <div className={`${styles.picture} text text_type_main-small`}>
                        +{overflow}
                    </div>
                </div>
            }
        </div>

    )
}

export default ComponentIcon;