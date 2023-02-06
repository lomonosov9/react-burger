import styles from './burger-constructor.module.css';
import { ConstructorElement } from '@ya.praktikum/react-developer-burger-ui-components';
import { DragIcon, CurrencyIcon, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import classNames from 'classnames';

function BurgerConstructor() {

  let sectionClassName = classNames(styles.section, 'pt-25');
  let componentClassName = classNames(styles.component, 'ml-4 mr-4');
  let componentsInfoClassName = classNames(styles.componentsInfo, 'ml-4 mt-10 mr-4');

  return (
    <section className={sectionClassName}>
      <div className={componentClassName}>
        <span style={{ width: 24 }}></span>
        <ConstructorElement
          type="top"
          isLocked={true}
          text="Краторная булка N-200i (верх)"
          price={200}
          thumbnail={'https://code.s3.yandex.net/react/code/bun-02.png'}
        />
      </div>

      <div className={styles.innerComponentsList}>
        <div className={componentClassName}>
          <DragIcon type="primary" />
          <ConstructorElement
            text="Соус традиционный галактический"
            price={15}
            thumbnail={'https://code.s3.yandex.net/react/code/sauce-03.png'}
          />
        </div>

        <div className={componentClassName}>
          <DragIcon type="primary" />
          <ConstructorElement
            text="Мясо бессмертных моллюсков Protostomia"
            price={1337}
            thumbnail={'https://code.s3.yandex.net/react/code/meat-02.png'}
          />
        </div>

        <div className={componentClassName}>
          <DragIcon type="primary" />
          <ConstructorElement
            text="Плоды Фалленианского дерева"
            price={874}
            thumbnail={'https://code.s3.yandex.net/react/code/sp_1.png'}
          />
        </div>
        <div className={componentClassName}>
          <DragIcon type="primary" />
          <ConstructorElement
            text="Хрустящие минеральные кольца"
            price={300}
            thumbnail={'https://code.s3.yandex.net/react/code/mineral_rings.png'}
          />
        </div>
      </div>

      <div className={componentClassName}>
        <span style={{ width: 24 }}></span>
        <ConstructorElement
          type="bottom"
          isLocked={true}
          text="Краторная булка N-200i (низ)"
          price={200}
          thumbnail={'https://code.s3.yandex.net/react/code/bun-02.png'}
        />
      </div>

      <div className={componentsInfoClassName}>
        <span className='pr-10'><span className='pr-2 text text_type_digits-medium'>610</span><CurrencyIcon type="primary" /></span>
        <Button htmlType="button" type="primary" size="large">Оформить заказ</Button>
      </div>
    </section>
  );
}

export default BurgerConstructor;