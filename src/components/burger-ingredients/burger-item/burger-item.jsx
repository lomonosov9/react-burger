import styles from './burger-item.module.css';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import { Counter } from '@ya.praktikum/react-developer-burger-ui-components';
import ingredientType from '../../../utils/prop-types';
import classNames from 'classnames';
import PropTypes from 'prop-types';

function BurgerItem({ _id, name, price, image, type, count, handleClick}) {
  let itemClassName = classNames(styles.item, 'ml-4 mt-6 mr-2 mb-4');
  let itemImgClassName = classNames(styles.itemImg, 'ml-4 mr-4');
  let itemPriceClassName = classNames(styles.itemPrice, 'text text_type_digits-default');
  let itemNameClassName = classNames(styles.itemName, 'text text_type_main-small');

  return (
    <article className={itemClassName} onClick={() => handleClick(_id)}>
      <img 
        alt='' 
        src={image} 
        className={itemImgClassName} 
      />

      {count > 0 && <Counter count={1} size="default" extraClass="" />}

      <span className={itemPriceClassName}><span className='pr-2'>
        {price}
      </span><CurrencyIcon type="primary" /></span>
      <p className={itemNameClassName}>
        {name}
      </p>
    </article>
  );
}

BurgerItem.propTypes = {
  ingredientType,
  count: PropTypes.number,
  handleClick : PropTypes.func
};


export default BurgerItem;