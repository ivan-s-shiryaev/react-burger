import {
  useCallback,
  useEffect,
  Fragment,
  FormEventHandler,
  FormEvent,
  ChangeEvent,
} from "react";
import { useNavigate, useLocation, Navigate, Link } from "react-router-dom";
import { useDispatch, useSelector } from "../hooks/redux";
import {
  Input,
  PasswordInput,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";

import { TAuth, TAuthUser, TAuthReset, validatePassword } from "../utils";
import { SET_AUTH_RESET_DATA, readAuthReset } from "../services/actions/auth";
import styles from "./reset-password.module.css";

type TState = {
  auth: TAuth;
};

export function ResetPasswordPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const {
    data: { password, token },
    request,
  } = useSelector((state: TState): TAuthReset => state.auth.reset);
  const { data: user } = useSelector(
    (state: TState): TAuthUser => state.auth.user
  );

  useEffect(() => {
    if (!location.state?.forgot) {
      navigate("/forgot-password", { replace: true });
    }
  }, [navigate, location.state]);

  const onFormSubmit = useCallback<FormEventHandler>(
    (event: FormEvent) => {
      event.preventDefault();

      if (password && validatePassword(password)) {
        (async () => {
          if (await dispatch(readAuthReset({ password, token }))) {
            navigate("/login", { replace: true });
          } else {
            navigate("/forgot-password", { replace: true });
          }
        })();
      }
    },
    [dispatch, navigate, password, token]
  );

  const onInputChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      dispatch({
        type: SET_AUTH_RESET_DATA,
        payload: {
          password:
            event.target.name === "password" ? event.target.value : password,
          token,
        },
      });
    },
    [dispatch, password, token]
  );

  return user?.email ? (
    <Navigate to="/" replace />
  ) : (
    <Fragment>
      <main className={styles.wrapper}>
        <form onSubmit={onFormSubmit}>
          <article className={styles.container}>
            <h1 className="text text_type_main-medium">
              Восстановление пароля
            </h1>
            <PasswordInput
              name={"password"}
              value={password}
              onChange={onInputChange}
              disabled={request}
              placeholder={"Введите новый пароль"}
              extraClass="mt-6"
            />
            <Input
              type="text"
              name={"token"}
              value={token}
              onChange={onInputChange}
              disabled={request}
              placeholder={"Введите код из письма"}
              extraClass="mt-6"
            />
            <Button
              htmlType="submit"
              type="primary"
              disabled={request}
              size="medium"
              extraClass="mt-6"
            >
              Сохранить
            </Button>
            <p className="text text_type_main-default text_color_inactive mt-20">
              Вспомнили пароль? <Link to="/login">Войти</Link>
            </p>
          </article>
        </form>
      </main>
    </Fragment>
  );
}
