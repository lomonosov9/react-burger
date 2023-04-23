import { BurgerIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import { ListIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import { Logo } from '@ya.praktikum/react-developer-burger-ui-components'
import { ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import { Link, NavLink } from 'react-router-dom'
import {ROUTES} from '../../utils/routes'

import styles from './AppHeader.module.css';

const AppHeader: React.FC = () => {
  return (
    <header className={`${styles.header} mt-10 mr-10 ml-10 p-4`}>
      <div className={styles.wrapper}>

        <nav className={styles.nav}>
          <div className={`pt-4 pr-5 pb-4 pl-5`}>
            <NavLink
              to={ROUTES.CONSTRUCTOR} 
              className={({ isActive, isPending }) =>
                isPending ? `text text_type_main-small ${styles.navItem}  ${styles.isNotActive}` :
                  isActive ? `text text_type_main-small ${styles.navItem} ${styles.isActive} ` :
                    `text text_type_main-small ${styles.navItem} ${styles.isNotActive} `
              }
            >
              {
                ({ isActive }) => (
                  <>
                    <BurgerIcon type={isActive ? "primary" : "secondary"} />
                    <span className='ml-2 text text_type_main-small'>Конструктор</span>
                  </>
                )
              }
            </NavLink>
          </div>
          <div className={`pt-4 pr-5 pb-4 pl-5`}>
            <NavLink
              to='/some'
              className={({ isActive, isPending }) =>
                isPending ? `text text_type_main-small  ${styles.navItem}  ${styles.isNotActive}` :
                  isActive ? `text text_type_main-small ${styles.navItem} ${styles.isActive} ` :
                    `text text_type_main-small  ${styles.navItem} ${styles.isNotActive} `
              }
            >
              <ListIcon type="secondary" />
              <span className='ml-2 text text_type_main-small text_color_inactive'>Лента заказов</span>
            </NavLink>
          </div>
        </nav>

        <Link to='/' ><span className={styles.logo}><Logo /></span></Link>

        <div className={styles.profile}  >
          <div className={`pt-4 pr-5 pb-4 pl-5`}>
            <NavLink
              to={ROUTES.PROFILE}
              className={({ isActive, isPending }) =>
                isPending ? `text text_type_main-small ${styles.navItem}  ${styles.isNotActive}` :
                  isActive ? `text text_type_main-small ${styles.navItem} ${styles.isActive} ` :
                    `text text_type_main-small ${styles.navItem} ${styles.isNotActive} `
              }
            >
              {
                ({ isActive }) => (
                  <>
                    <ProfileIcon type={isActive ? "primary" : "secondary"} />
                    <span className='ml-2'>Личный кабинет</span>
                  </>
                )
              }
            </NavLink>
          </div>
        </div>

      </div>
    </header>
  );
}

export default AppHeader;