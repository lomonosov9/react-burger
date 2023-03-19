import { useDrag } from "react-dnd";
import styles from './burger-item.module.css';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import { Counter } from '@ya.praktikum/react-developer-burger-ui-components';
import ingredientType from '../../../utils/prop-types';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { Link, useLocation } from "react-router-dom";

function BurgerItem({ item, count, handleClick }) {
  const { _id, name, price, image } = item;
  const itemClassName = classNames(styles.item, 'ml-4 mt-6 mr-2 mb-4');
  const itemImgClassName = classNames(styles.itemImg, 'ml-4 mr-4');
  const itemPriceClassName = classNames(styles.itemPrice, 'text text_type_digits-default text_color_primary');
  const itemNameClassName = classNames(styles.itemName, 'text text_type_main-small text_color_primary');

  const location = useLocation();
  const ingredientId = _id;

  // drag
  // Получаем реф для каждого элемента, который можно перетащить,
  // opacity - возвращается из функции collect
  const [{ opacity }, dragRef] = useDrag({
    // Указываем тип получаемых элементов, чтобы dnd понимал,
    // в какой контейнер можно класть перетаскиваемый элемент, а в какой нельзя.
    // Элементы и контейнеры с разными типами не будут взаимодействовать
    type: 'ingredient',
    // Тут мы положим данные о нашем ингредиенте,
    // которые dnd будет передавать в качестве аргумента во внутренние колбэки  
    item,
    // Метод collect агрегириует информацию, полученную из мониторов
    // и возвращает ее в объекте, первым аргументом нашего хукка
    collect: monitor => ({
      // Зададим прозрачность перетаскиваемому элементу для красоты
      opacity: monitor.isDragging() ? 0.5 : 1
    })
  })

  return (

    <Link
      key={ingredientId}
      to={{
        // Тут мы формируем динамический путь для нашего ингредиента
        // а также сохраняем в свойство background роут, на котором была открыта наша модалка.
        pathname: `/ingredients/${ingredientId}`
      }}
      state={{ background: location }}
      className={styles.link}
      ref={dragRef}
    >

      <article className={itemClassName} onClick={() => handleClick(item)} style={{ opacity }}>
        <img
          alt=''
          src={image}
          className={itemImgClassName}
        />

        {count > 0 && <Counter count={count} size="default" extraClass="" />}

        <span className={itemPriceClassName}><span className='pr-2'>
          {price}
        </span><CurrencyIcon type="primary" /></span>
        <p className={itemNameClassName}>
          {name}
        </p>
      </article>
    </Link>
  );
}

BurgerItem.propTypes = {
  ingredientType,
  count: PropTypes.number,
  handleClick: PropTypes.func
};


export default BurgerItem;