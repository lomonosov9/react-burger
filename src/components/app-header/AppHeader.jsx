import { BurgerIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import { ListIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import { Logo } from '@ya.praktikum/react-developer-burger-ui-components'
import { ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components'

import styles from './AppHeader.module.css';

function AppHeader() {
  return (
    <header className={`${styles.header} mt-10 mr-10 ml-10 p-4`}>
      <div className={styles.wrapper}>

        <nav className={styles.nav}>
          <div className={`${styles.navItem} pt-4 pr-5 pb-4 pl-5`}>
            <BurgerIcon type="primary" />
            <p className='text text_type_main-small ml-2'>
              Конструктор
            </p>
          </div>
          <div className={`${styles.navItem} pt-4 pr-5 pb-4 pl-5`}>
            <ListIcon type="secondary" />
            <p className='text text_type_main-small text_color_inactive ml-2'>
              Лента заказов
            </p>
          </div>

        </nav>

        <Logo className={styles.logo} />

        <div className={styles.profile}  >
          <div className={`${styles.navItem} pt-4 pr-5 pb-4 pl-5`}>
            <ProfileIcon type="secondary" />
            <p className='text text_type_main-small text_color_inactive ml-2'>
              Личный кабинет
            </p>
          </div>
        </div>

      </div>
    </header>
  );
}

export default AppHeader;