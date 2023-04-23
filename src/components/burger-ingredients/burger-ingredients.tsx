import React, { useMemo, useRef, useEffect, RefObject } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styles from './burger-ingredients.module.css';
import BurgerItem from './burger-item/burger-item';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import classNames from 'classnames';
import { ingredientsSelector } from '../../services/selectors';
import { bunSelector, fillingSelector } from '../../services/selectors';
import { currentActionCreator } from '../../services/action-creators';
import { TIngredient, TIngredientType } from '../../utils/types';

function BurgerIngredients() {
  const dispatch = useDispatch();
  const [currentType, setCurrentType] = React.useState('bun');
  const ingredientsContainerRef = useRef<HTMLDivElement>(null);

  const headingClassName = classNames('mt-10 mb-5 text text_type_main-large');
  const titleClassName = classNames(styles.heading2, 'mt-4 text text_type_main-medium');
  const tabsClassName = classNames(styles.tabs, 'mb-6');

  const data = useSelector<any>(ingredientsSelector) as TIngredient[];
  const constructorBun = useSelector<any>(bunSelector) as TIngredient;
  const constructorfilling = useSelector<any>(fillingSelector) as TIngredient[];

  const ingredientTypesList = useMemo((): { code: TIngredientType, title: string }[] => ([
    { code: "bun", title: "Булки" },
    { code: "sauce", title: "Соусы" },
    { code: "main", title: "Начинки" }
  ]), []);


  const typesListRefs = new Map<TIngredientType, RefObject<HTMLSpanElement>>();
  typesListRefs.set('bun', useRef<HTMLSpanElement>(null));
  typesListRefs.set('sauce', useRef<HTMLSpanElement>(null));
  typesListRefs.set('main', useRef<HTMLSpanElement>(null));

  const ingredientsByType = useMemo(() => {
    const itemsByType = new Map<TIngredientType, TIngredient[]>();
    for (const type of ingredientTypesList) {
      itemsByType.set(
        type.code,
        data.filter((elem) => (elem.type === type.code))
      );
    }
    return itemsByType;
  }, [ingredientTypesList, data]);


  const handleOpenModal = (item: TIngredient): void => {
    dispatch<any>(currentActionCreator.setCurrentIngridient(item));
  }

  const getIngredientsByType = (typeCode: TIngredientType) => (
    ingredientsByType?.
      get(typeCode)?.
      map(item => {
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

    const typeTitleInViewport: { [key: string]: boolean } = {};
    const callback = (entries: IntersectionObserverEntry[]) => {
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
    typesListRefs.forEach((typeTitle) => {
      if (typeTitle?.current) {
        observer.observe(typeTitle?.current)
      }
    });

  });

  return (
    <section className={styles.section}>
      <span className={headingClassName}>Соберите бургер</span>

      <div className={tabsClassName}>
        {
          ingredientTypesList.map(type => (
            <Tab value={type.code} active={currentType === type.code} key={type.code} onClick={() => { }}>
              {type.title}
            </Tab>
          ))
        }
      </div>

      <div className={`${styles.ingredients} custom-scroll`} ref={ingredientsContainerRef}>
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
    </section>
  );
}

export default BurgerIngredients;