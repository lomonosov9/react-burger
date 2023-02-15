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
          <div className={`pt-4 pr-5 pb-4 pl-5`}>
            <a href="#" className={styles.navItem}>
              <BurgerIcon type="primary" />
              <span className='ml-2 text text_type_main-small'>Конструктор</span>
            </a>
          </div>
          <div className={`pt-4 pr-5 pb-4 pl-5`}>
            <a href="#" className={styles.navItem}>
              <ListIcon type="secondary" />
              <span className='ml-2 text text_type_main-small text_color_inactive'>Лента заказов</span>
            </a>
          </div>
        </nav>

        <Logo className={styles.logo} />

        <div className={styles.profile}  >
          <div className={`pt-4 pr-5 pb-4 pl-5`}>
            <a href="#" className={styles.navItem}>
            <ProfileIcon type="secondary" />
              <span className='ml-2 text text_type_main-small text_color_inactive'>Личный кабинет</span>
            </a>
          </div>
        </div>

      </div>
    </header>
  );
}

export default AppHeader;