// import React from 'react';
// import {
//     DndProvider,
// } from 'react-dnd';
// import {
//     HTML5Backend,
// } from 'react-dnd-html5-backend';

// import AppHeader from '../app-header/app-header';
// import BurgerIngredients from '../burger-ingredients/burger-ingredients'
// import BurgerConstructor from '../burger-constructor/burger-constructor'
// import withModal from '../hocs/with-modal';
// import appStyles from './app.module.css';

import {
    BrowserRouter,
    Routes,
    Route,
} from 'react-router-dom';

import {
    HomePage,
    LoginPage,
    RegisterPage,
    ForgotPasswordPage,
    ResetPasswordPage,
    ProfilePage,
    IngredientPage,
    NotFound404,
} from '../../pages';

// const WithModalBurgerIngredients = withModal(BurgerIngredients);
// const WithModalBurgerConstructor = withModal(BurgerConstructor);

const App = () => {

    return (
        <BrowserRouter>
            <Routes>
                <Route
                    path="/"
                    element={<HomePage />}
                />
                <Route
                    path="/login"
                    element={<LoginPage />}
                />
                <Route
                    path="/register"
                    element={<RegisterPage />}
                />
                <Route
                    path="/forgot-password"
                    element={<ForgotPasswordPage />}
                />
                <Route
                    path="/reset-password"
                    element={<ResetPasswordPage />}
                />
                <Route
                    path="/profile"
                    element={<ProfilePage />}
                />
                <Route
                    path="/ingredients/:id"
                    element={<IngredientPage />}
                />
                <Route
                    path="*"
                    element={<NotFound404 />}
                />
            </Routes>
        </BrowserRouter>
    );

    // return (
    //     <React.Fragment>
    //         <AppHeader />
    //         <DndProvider
    //             backend={HTML5Backend}
    //         >
    //             <main
    //                 className={appStyles.home}
    //             >
    //                 <article>
    //                     <h1
    //                         className="text text_type_main-large mt-10 mb-5"
    //                     >
    //                         Соберите бургер
    //                     </h1>
    //                     <WithModalBurgerIngredients />
    //                 </article>
    //                 <WithModalBurgerConstructor />
    //             </main>
    //         </DndProvider>
    //     </React.Fragment>
    // );

};

export default App;