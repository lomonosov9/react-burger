import React from 'react';
import styles from './burger-ingredients.module.css';
import BurgerItem from './burger-item/burger-item';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components'
import PropTypes from 'prop-types';
import classNames from 'classnames';

function BurgerIngredients({ data }) {
  const [current, setCurrent] = React.useState('bun');

  let headingClassName = classNames('mt-10 mb-5 text text_type_main-large');
  let titleClassName = classNames(styles.heading2, 'mt-4 text text_type_main-medium');
  let tabsClassName = classNames(styles.tabs, 'mb-6');

  let ingredientTypesList = [
    { code: "bun", title: "Булки" },
    { code: "sauce", title: "Соусы" },
    { code: "main", title: "Начинки" }
  ];
  return (
    <section className={styles.section}>
      <span className={headingClassName}>Соберите бургер</span>

      <div className={tabsClassName}>
        {
          ingredientTypesList.map(type => (
            <Tab value={type.code} active={current === type.code} onClick={setCurrent} key={type.code}>
              {type.title}
            </Tab>
          ))
        }
      </div>

      <div className={styles.ingredients}>
        
        <span className={titleClassName}>Булки</span>
        {
          data
            .filter(item => (item.type === "bun"))
            .map(item => (
              <BurgerItem name={item.name} price={item.price} image={item.image} count={0} key={item["_id"]} />
            ))
        }

        <span className={titleClassName}>Соусы</span>
        {
          data
            .filter(item => (item.type === "sauce"))
            .map(item => (
              <BurgerItem name={item.name} price={item.price} image={item.image} count={0} key={item["_id"]}  />
            ))
        }

        <span className={titleClassName}>Начинки</span>
        {
          data
            .filter(item => (item.type === "main"))
            .map(item => (
              <BurgerItem name={item.name} price={item.price} image={item.image} count={0} key={item["_id"]}  />
            ))
        }

      </div>
    </section>
  );
}

BurgerIngredients.propTypes = {
  data : PropTypes.arrayOf(PropTypes.shape({
    "_id":PropTypes.string.isRequired,
    "name":PropTypes.string.isRequired,
    "type":PropTypes.oneOf(['bun', 'sauce', 'main']).isRequired,
    "proteins":PropTypes.number,
    "fat":PropTypes.number,
    "carbohydrates":PropTypes.number,
    "calories":PropTypes.number,
    "price":PropTypes.number.isRequired,
    "image":PropTypes.string.isRequired,
    "image_mobile":PropTypes.string,
    "image_large":PropTypes.string,
    "__v":PropTypes.number
  })).isRequired
}

export default BurgerIngredients;