import { FC, useEffect, Fragment } from "react";
import { useDispatch } from "../../hooks/redux";
import { useLocation, useNavigate, Routes, Route } from "react-router-dom";

import { getMenuItems } from "../../services/actions/order";
import ProtectedRoute from "../protected-route";
import AppHeader from "../app-header/app-header";
import {
  HomePage,
  FeedPage,
  OrderPage,
  LoginPage,
  RegisterPage,
  ForgotPasswordPage,
  ResetPasswordPage,
  ProfilePage,
  ProfileEditPage,
  ProfileHistoryPage,
  ProfileLogoutPage,
  IngredientPage,
  NotFound404,
} from "../../pages";
import { HIDE_MODAL } from "../../services/actions/modal";
import Modal from "../modal/modal";
import OrderInfo from "../order-info/order-info";

const App: FC = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const background = location.state?.background;

  useEffect(() => {
    (async () => {
      await dispatch(getMenuItems());
    })();
  }, [dispatch]);

  const handleOrderInfoModalClose = () => {
    dispatch({ type: HIDE_MODAL });
    navigate(-1);
  };

  return (
    <Fragment>
      <AppHeader />
      <Routes location={background ?? location}>
        <Route path="/" element={<HomePage />} />
        <Route path="/feed" element={<FeedPage />} />
        <Route path="/feed/:id" element={<OrderPage />} />
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
        >
          <Route index element={<ProfileEditPage />} />
          <Route path="orders" element={<ProfileHistoryPage />} />
          <Route path="orders/:id" element={<OrderPage />} />
          <Route path="logout" element={<ProfileLogoutPage />} />
        </Route>
        <Route path="/ingredients/:id" element={<IngredientPage />} />
        <Route path="*" element={<NotFound404 />} />
      </Routes>
      {background && (
        <Routes>
          <Route
            path="/feed/:id"
            element={
              <Modal handleClose={handleOrderInfoModalClose}>
                <OrderInfo />
              </Modal>
            }
          />
          <Route
            path="/profile/orders/:id"
            element={
              <Modal handleClose={handleOrderInfoModalClose}>
                <OrderInfo />
              </Modal>
            }
          />
        </Routes>
      )}
    </Fragment>
  );
};

export default App;
