import { useDispatch } from "react-redux";
import { ConstructorElement } from '@ya.praktikum/react-developer-burger-ui-components';
import { constructorActionCreator } from '../../../../services/action-creators';
import { DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './filling-item.module.css';
import { TIngredient } from '../../../../utils/types';

import classNames from 'classnames';

type FillingItemProps = {
  item: TIngredient & { dragId: string };
}

const FillingItem: React.FC<FillingItemProps> = ({ item }) => {
  const componentClassName = classNames(styles.component, 'ml-4 mr-4');

  const dispatch = useDispatch();
  const handleItemDelete = (id: string) => {
    dispatch(constructorActionCreator.deleteComponent(id))
  }

  return (
    <div className={componentClassName} key={item.dragId} >
      <DragIcon type="primary" />
      <ConstructorElement
        text={item.name}
        price={item.price}
        thumbnail={item.image}
        handleClose={() => handleItemDelete(item.dragId)}
      />
    </div>
  )
}

export default FillingItem;