import React from 'react';
import {
    DndProvider,
} from 'react-dnd';
import {
    HTML5Backend,
} from 'react-dnd-html5-backend';

import BurgerIngredients from '../components/burger-ingredients/burger-ingredients'
import BurgerConstructor from '../components/burger-constructor/burger-constructor'
import withModal from '../components/hocs/with-modal';
import AppHeader from '../components/app-header/app-header';
import styles from './home.module.css';

const WithModalBurgerConstructor = withModal(BurgerConstructor);

export function HomePage() {

    return (
        <React.Fragment>
            <AppHeader />
            <DndProvider
                backend={HTML5Backend}
            >
                <main
                    className={styles.home}
                >
                    <article>
                        <h1
                            className="text text_type_main-large mt-10 mb-5"
                        >
                            Соберите бургер
                        </h1>
                        <BurgerIngredients />
                    </article>
                    <WithModalBurgerConstructor />
                </main>
                </DndProvider>
        </React.Fragment>
    );
}