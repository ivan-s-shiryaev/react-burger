import { useCallback } from "react";
import { useLocation, matchPath, Outlet } from "react-router";
import { NavLink } from "react-router-dom";

import styles from "./profile.module.css";

export function ProfilePage() {
  const { pathname } = useLocation();

  let info = "";
  if (matchPath(pathname, "/profile/orders")) {
    info = "В этом разделе вы можете просмотреть свою историю заказов";
  } else if (matchPath(pathname, "/profile")) {
    info = "В этом разделе вы можете изменить свои персональные данные";
  }

  const isNavLinkActive = useCallback(({ isActive }: { isActive: boolean }) => {
    const result = "text text_type_main-medium";

    return isActive ? `${result} ${styles.active}` : result;
  }, []);

  return (
    <main
      className={`${styles.wrapper} pl-5 pr-5`}
      style={{
        justifyContent: pathname === "/profile" ? "center" : "flex-end",
      }}
    >
      <Outlet />
      <aside className={`${styles.container} mt-30`}>
        <nav className={styles.menu}>
          <ul>
            <li>
              <NavLink to="/profile" end className={isNavLinkActive}>
                Профиль
              </NavLink>
            </li>
            <li>
              <NavLink to="orders" className={isNavLinkActive}>
                История заказов
              </NavLink>
            </li>
            <li>
              <NavLink to="logout" className={isNavLinkActive}>
                Выход
              </NavLink>
            </li>
          </ul>
        </nav>
        <p
          className={`${styles.info} text text_type_main-default text_color_inactive mt-20`}
        >
          {info}
        </p>
      </aside>
    </main>
  );
}
