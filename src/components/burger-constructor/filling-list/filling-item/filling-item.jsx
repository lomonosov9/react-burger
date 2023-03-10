import { useDispatch } from "react-redux";
import { ConstructorElement } from '@ya.praktikum/react-developer-burger-ui-components';
import { constructorActionCreator } from '../../../../services/action-creators';
import { DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './filling-item.module.css';
import ingredientType from '../../../../utils/prop-types';

import classNames from 'classnames';

const FillingItem = ({item}) => {
    const componentClassName = classNames(styles.component, 'ml-4 mr-4');

    const dispatch = useDispatch();
    const handleItemDelete = (id) => {
        dispatch(constructorActionCreator.deleteComponent(id))
    }

return (
    <div className={componentClassName} key={item.dragId} >
              <DragIcon type="primary" />
              <ConstructorElement
                text={item.name}
                price={item.price}
                thumbnail={item.image}
                handleClose = {() => handleItemDelete(item.dragId)}
              />
            </div>
)
}

FillingItem.propTypes = {
  item: ingredientType.isRequired, 
}

export default FillingItem;