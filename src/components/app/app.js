import React from 'react';

import appStyles from './app.module.css';
import AppHeader from '../app-header/app-header';
import BurgerIngredients from '../burger-ingredients/burger-ingredients'


class App extends React.Component {

    render() {

        return (
            <React.Fragment>
                <AppHeader />
                <main className={appStyles.content}>
                    <article>
                        <h1 className="text text_type_main-large">Соберите бургер</h1>
                        <BurgerIngredients />
                    </article>
                </main>
            </React.Fragment>
        );

    }

}

export default App;