import React from 'react';
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
import {
    ProtectedRoute,
} from '../protected-route';

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
                    element={
                        <ProtectedRoute
                            element={<ProfilePage />}
                        />
                    }
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

};

export default App;