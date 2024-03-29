import {
  useCallback,
  Fragment,
  FormEventHandler,
  FormEvent,
  ChangeEvent,
} from "react";
import { useDispatch, useSelector } from "../../hooks/redux";
import { Navigate, Link } from "react-router-dom";
import {
  Input,
  EmailInput,
  PasswordInput,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";

import {
  TAuth,
  TAuthUser,
  TAuthRegister,
  validateName,
  validateEmail,
  validatePassword,
} from "../../utils";
import {
  SET_AUTH_REGISTER_DATA,
  readAuthRegister,
} from "../../services/actions/auth";
import styles from "./register.module.css";

type TState = {
  auth: TAuth;
};

export function RegisterPage() {
  const dispatch = useDispatch();

  const {
    data: { email, name, password },
    request,
  } = useSelector((state: TState): TAuthRegister => state.auth.register);
  const { data: user } = useSelector(
    (state: TState): TAuthUser => state.auth.user
  );

  const onFormSubmit = useCallback<FormEventHandler>(
    (event: FormEvent) => {
      event.preventDefault();

      if (
        name &&
        email &&
        password &&
        validateName(name) &&
        validateEmail(email) &&
        validatePassword(password)
      ) {
        (async () => {
          await dispatch(readAuthRegister({ email, name, password }));
        })();
      }
    },
    [dispatch, name, email, password]
  );

  const onInputChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      dispatch({
        type: SET_AUTH_REGISTER_DATA,
        payload: {
          name: event.target.name === "name" ? event.target.value : name,
          email: event.target.name === "email" ? event.target.value : email,
          password:
            event.target.name === "password" ? event.target.value : password,
        },
      });
    },
    [dispatch, name, email, password]
  );

  return user?.email ? (
    <Navigate to="/" replace />
  ) : (
    <Fragment>
      <main className={styles.wrapper}>
        <form onSubmit={onFormSubmit}>
          <article className={styles.container}>
            <h1 className="text text_type_main-medium">Регистрация</h1>
            <Input
              type="text"
              name={"name"}
              value={name}
              onChange={onInputChange}
              disabled={request}
              placeholder={"Имя"}
              extraClass="mt-6"
            />
            <EmailInput
              name={"email"}
              value={email}
              onChange={onInputChange}
              disabled={request}
              placeholder={"E-mail"}
              isIcon={false}
              extraClass="mt-6"
            />
            <PasswordInput
              name={"password"}
              value={password}
              onChange={onInputChange}
              disabled={request}
              extraClass="mt-6"
            />
            <Button
              htmlType="submit"
              type="primary"
              disabled={request}
              size="medium"
              extraClass="mt-6"
            >
              Зарегистрироваться
            </Button>
            <p className="text text_type_main-default text_color_inactive mt-20">
              Уже зарегистрированы? <Link to="/login">Войти</Link>
            </p>
          </article>
        </form>
      </main>
    </Fragment>
  );
}
