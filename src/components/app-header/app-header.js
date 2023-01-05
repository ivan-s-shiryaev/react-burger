import React from 'react';
import {
	Logo,
	BurgerIcon,
	ListIcon,
	ProfileIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import appHeaderStyles from './app-header.module.css';

class AppHeader extends React.Component {

    render() {

        return (
            <header className="mt-10 pt-4 pb-4">
                <nav className={appHeaderStyles.menu}>
                    <ul>
                        <li className="text text_type_main-default mr-2 pl-5 pr-5">
                            <BurgerIcon type="primary" />
                            <span className="ml-2">Конструктор</span>
                        </li>
                        <li className="text text_type_main-default text_color_inactive pl-5 pr-5">
                            <ListIcon type="secondary" />
                            <span className="ml-2">Лента заказов</span>
                        </li>
                    </ul>
                </nav>
                <Logo />
                <nav className={appHeaderStyles.menu}>
                    <ul>
                        <li className="text text_type_main-default text_color_inactive pl-5 pr-5">
                            <ProfileIcon type="secondary" />
                            <span className="ml-2">Конструктор</span>
                        </li>
                    </ul>
                </nav>
            </header>
        );

    }

}

export default AppHeader;