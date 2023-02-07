import React from 'react';
import styles from './burger-ingredients.module.css';
import BurgerItem from './burger-item/burger-item';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import ingredientType from '../../utils/prop-types';
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

  let ingredientsByType = new Map();
  for (let type of ingredientTypesList) {
    ingredientsByType.set(
      type.code,
      data.filter(item => (item.type === type.code))
    );
  }

  const getIngredientsByType = (typeCode) => (
    ingredientsByType
      .get(typeCode)
      .map(item => (
        <BurgerItem
          key = {item["_id"]}
          _id = {item["_id"]}
          name = {item.name}
          price = {item.price}
          image = {item.image}
          type = {item.type}
          count = {0}
        />
      ))
  );



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
        {
          ingredientTypesList.map(type => (
              <React.Fragment key={type.code} >
                <span className={titleClassName}>{type.title}</span>

                { getIngredientsByType(type.code) }

              </React.Fragment>
            )
          )
        }
      </div>
    </section>
  );
}

BurgerIngredients.propTypes = {
  data: PropTypes.arrayOf(ingredientType).isRequired
}

export default BurgerIngredients;