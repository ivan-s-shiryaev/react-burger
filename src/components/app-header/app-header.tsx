import { FC, useCallback } from "react";
import { NavLink, Link } from "react-router-dom";
import {
  Logo,
  BurgerIcon,
  ListIcon,
  ProfileIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./app-header.module.css";

const AppHeader: FC = () => {
  const isNavLinkActive = useCallback(({ isActive }: { isActive: boolean }) => {
    const result = "text text_type_main-default";

    return isActive
      ? `${result} ${styles.text_color_active}`
      : `${result} text_color_inactive`;
  }, []);

  return (
    <header className="">
      <div className="pt-4 pb-4">
        <nav className={styles.menu}>
          <ul>
            <li>
              <NavLink to="/" className={isNavLinkActive}>
                <BurgerIcon type="secondary" />
                <span>Конструктор</span>
              </NavLink>
            </li>
            <li>
              <NavLink to="/feed" className={isNavLinkActive}>
                <ListIcon type="secondary" />
                <span>Лента заказов</span>
              </NavLink>
            </li>
          </ul>
        </nav>
        <nav className={styles.menu}>
          <ul>
            <li>
              <NavLink to="/profile" className={isNavLinkActive}>
                <ProfileIcon type="secondary" />
                <span>Личный кабинет</span>
              </NavLink>
            </li>
          </ul>
        </nav>
        <Link to="/">
          <Logo />
        </Link>
      </div>
    </header>
  );
};

export default AppHeader;
