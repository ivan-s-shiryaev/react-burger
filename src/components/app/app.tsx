import { FC, useEffect, Fragment } from "react";
import { useDispatch } from "react-redux";
import { useLocation, Routes, Route } from "react-router-dom";

import { getMenuItems } from "../../services/actions/order";
import ProtectedRoute from "../protected-route";
import AppHeader from "../app-header/app-header";
import {
  HomePage,
  LoginPage,
  RegisterPage,
  ForgotPasswordPage,
  ResetPasswordPage,
  ProfilePage,
  IngredientPage,
  NotFound404,
} from "../../pages";

const App: FC = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const background = location.state?.background;

  useEffect(() => {
    (async () => {
      await dispatch(getMenuItems() as any);
    })();
  }, [dispatch]);

  return (
    <Fragment>
      <AppHeader />
      <Routes location={background ?? location}>
        <Route path="/" element={<HomePage />} />
        <Route
          path="/login"
          element={<ProtectedRoute children={<LoginPage />} anonymous={true} />}
        />
        <Route
          path="/register"
          element={
            <ProtectedRoute children={<RegisterPage />} anonymous={true} />
          }
        />
        <Route
          path="/forgot-password"
          element={
            <ProtectedRoute
              children={<ForgotPasswordPage />}
              anonymous={true}
            />
          }
        />
        <Route
          path="/reset-password"
          element={
            <ProtectedRoute children={<ResetPasswordPage />} anonymous={true} />
          }
        />
        <Route
          path="/profile"
          element={<ProtectedRoute children={<ProfilePage />} />}
        />
        <Route path="/ingredients/:id" element={<IngredientPage />} />
        <Route path="*" element={<NotFound404 />} />
      </Routes>
    </Fragment>
  );
};

export default App;
