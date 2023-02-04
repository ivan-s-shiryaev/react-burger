import React from 'react';
import {
    DndProvider,
} from 'react-dnd';
import {
    HTML5Backend,
} from 'react-dnd-html5-backend';

import AppHeader from '../app-header/app-header';
import BurgerIngredients from '../burger-ingredients/burger-ingredients'
import BurgerConstructor from '../burger-constructor/burger-constructor'
import withModal from '../hocs/with-modal';
import appStyles from './app.module.css';

const WithModalBurgerIngredients = withModal(BurgerIngredients);
const WithModalBurgerConstructor = withModal(BurgerConstructor);

const App = () => {

    return (
        <React.Fragment>
            <AppHeader />
            <DndProvider
                backend={HTML5Backend}
            >
                <main
                    className={appStyles.home}
                >
                    <article>
                        <h1
                            className="text text_type_main-large mt-10 mb-5"
                        >
                            Соберите бургер
                        </h1>
                        <WithModalBurgerIngredients />
                    </article>
                    <WithModalBurgerConstructor />
                </main>
            </DndProvider>
        </React.Fragment>
    );

};

export default App;