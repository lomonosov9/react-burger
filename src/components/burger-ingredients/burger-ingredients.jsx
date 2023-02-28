import React, { useMemo, useRef, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styles from './burger-ingredients.module.css';
import BurgerItem from './burger-item/burger-item';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import classNames from 'classnames';
import Modal from '../modal/modal';
import IngredientDetails from './ingredient-details/ingredient-details';
import { dataSelector, currentIngridientSelector } from '../../services/selectors';
import { bunSelector, fillingSelector } from '../../services/selectors';
import { actionCreators } from '../../services/actionCreators';



function BurgerIngredients() {
  const dispatch = useDispatch();
  const [currentType, setCurrentType] = React.useState('bun');
  const currentIngredient = useSelector(currentIngridientSelector);
  const ingredientsContainerRef = useRef(null);

  const headingClassName = classNames('mt-10 mb-5 text text_type_main-large');
  const titleClassName = classNames(styles.heading2, 'mt-4 text text_type_main-medium');
  const tabsClassName = classNames(styles.tabs, 'mb-6');

  const data = useSelector(dataSelector);
  const constructorBun = useSelector(bunSelector);
  const constructorfilling = useSelector(fillingSelector);

  const ingredientTypesList = useMemo(() => ([
    { code: "bun", title: "Булки" },
    { code: "sauce", title: "Соусы" },
    { code: "main", title: "Начинки" }
  ]), []);


  const typesListRefs = new Map();
  typesListRefs.set('bun', useRef(null));
  typesListRefs.set('sauce', useRef(null));
  typesListRefs.set('main', useRef(null));


  const ingredientsByType = useMemo(() => {
    const itemsByType = new Map();
    for (const type of ingredientTypesList) {
      itemsByType.set(
        type.code,
        data.filter(item => (item.type === type.code))
      );
    }
    return itemsByType;
  }, [ingredientTypesList, data]);


  const handleOpenModal = (item) => {
    dispatch(actionCreators.setCurrentIngridient(item));
  }

  const handleCLoseModal = () => {
    dispatch(actionCreators.resetCurrentIngridient());
  }

  const getIngredientsByType = (typeCode) => (
    ingredientsByType
      .get(typeCode)
      .map(item => {
        let count = 0;
        if (typeCode === 'bun') {
          count = constructorBun?._id === item._id ? 1 : 0;
        }
        else {
          count = constructorfilling.filter(elem => elem._id === item._id).length;
        }
        return (
          <BurgerItem
            item={item}
            key={item["_id"]}
            count={count}
            handleClick={handleOpenModal}
          />
        )
      })
  )

  useEffect(() => {

    const typeTitleInViewport = {};
    const callback = (entries) => {
      entries.forEach((entry) => {
        typeTitleInViewport[entry.target.id] = entry.isIntersecting;
      })
      for (let typeTitle of Object.keys(typeTitleInViewport)) {
        if (typeTitleInViewport[typeTitle]) {
          setCurrentType(typeTitle);
        }
      }
    };

    const options = {
      root: ingredientsContainerRef.current,
      rootMargin: '20% 0% -80% 0%',
      threshold: 0
    };
    const observer = new IntersectionObserver(callback, options);
    typesListRefs.forEach((typeTitle) => observer.observe(typeTitle.current));

  });

  return (
    <section className={styles.section}>
      <span className={headingClassName}>Соберите бургер</span>

      <div className={tabsClassName}>
        {
          ingredientTypesList.map(type => (
            <Tab value={type.code} active={currentType === type.code} key={type.code}>
              {type.title}
            </Tab>
          ))
        }
      </div>

      <div className={styles.ingredients} ref={ingredientsContainerRef}>
        {
          ingredientTypesList.map(type => (
            <React.Fragment key={type.code} >
              <span className={titleClassName} ref={typesListRefs.get(type.code)} id={type.code}>{type.title}</span>

              {getIngredientsByType(type.code)}

            </React.Fragment>
          )
          )
        }
      </div>

      {
        currentIngredient &&

        <Modal isOpen={currentIngredient ? true : false} onClose={handleCLoseModal} header={'Детали ингредиента'}>
          <IngredientDetails {...currentIngredient} />
        </Modal>
      }
    </section>
  );
}

export default BurgerIngredients;