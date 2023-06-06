import ComponentIcon from "./component-icon/component-icon";
import styles from './icons-list.module.css'

type IconsListProps = {
    icons: ReadonlyArray<string>
}

const IconsList: React.FC<IconsListProps> = ({ icons }) => {

    return (
        <div className={styles.container}>
            {
                icons.map((item, index) => index <= 5 &&
                    <ComponentIcon
                        key={index}
                        src={item}
                        extraClass={styles.item}
                        overflow={!index ? icons.length - 5 : 0}
                    />
                )
            }
        </div>
    )
};

export default IconsList;