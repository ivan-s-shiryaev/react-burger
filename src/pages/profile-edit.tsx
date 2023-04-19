import {
  useState,
  useEffect,
  useCallback,
  useMemo,
  useRef,
  FormEventHandler,
  FormEvent,
  ChangeEvent,
} from "react";
import { useDispatch, useSelector } from "../hooks/redux";
import {
  Button,
  Input,
} from "@ya.praktikum/react-developer-burger-ui-components";

import {
  TAuth,
  TAuthUser,
  validateName,
  validateEmail,
  validatePassword,
  getCookie,
} from "../utils";
import { updateAuthUser } from "../services/actions/auth";
import styles from "./profile-edit.module.css";

type TState = {
  auth: TAuth;
};

export function ProfileEditPage() {
  const dispatch = useDispatch();

  const accessToken = getCookie("access");

  const {
    data: { name, email },
    request,
  } = useSelector((state: TState): TAuthUser => state.auth.user);

  const [data, setData] = useState({ name, email, password: "" });
  const [active, setActive] = useState("");
  const ref = {
    name: useRef<HTMLInputElement>(null),
    email: useRef<HTMLInputElement>(null),
    password: useRef<HTMLInputElement>(null),
  };

  useEffect(() => {
    setData({ name, email, password: "" });
  }, [name, email]);

  const control = useMemo(
    () =>
      JSON.stringify(data) !== JSON.stringify({ name, email, password: "" }),
    [data, name, email]
  );

  const onInputChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      setData({
        ...data,
        [event.target.name]: event.target.value,
      });
    },
    [data]
  );

  const onInputBlur = useCallback(() => {
    setActive("");
  }, [setActive]);

  const onInputIconClick =
    (argument: "name" | "email" | "password") => (): void => {
      setActive(argument);
      setTimeout(() => ref[argument].current?.focus(), 0);
    };

  const onFormSubmit = useCallback<FormEventHandler>(
    (event: FormEvent) => {
      event.preventDefault();

      if (
        data.name &&
        data.email &&
        validateName(data.name) &&
        validateEmail(data.email) &&
        (!data.password || (data.password && validatePassword(data.password)))
      ) {
        (async () => {
          await dispatch(updateAuthUser({ data, token: accessToken }));
        })();

        setData((state) => ({ ...state, password: "" }));
      }
    },
    [dispatch, data, accessToken]
  );

  const onFormReset = useCallback<FormEventHandler>(
    (event: FormEvent) => {
      event.preventDefault();

      setData({ name, email, password: "" });
    },
    [name, email]
  );

  return (
    <article className={`${styles.container} mt-30`}>
      <form onSubmit={onFormSubmit} onReset={onFormReset}>
        <Input
          name={"name"}
          value={data.name}
          onChange={onInputChange}
          onIconClick={onInputIconClick("name")}
          onBlur={onInputBlur}
          disabled={active !== "name"}
          placeholder={"Имя"}
          icon={active === "name" ? "CloseIcon" : "EditIcon"}
          extraClass={`${styles["placeholder-filled"]}`}
          ref={ref.name}
        />
        <Input
          name={"email"}
          value={data.email}
          onChange={onInputChange}
          onIconClick={onInputIconClick("email")}
          onBlur={onInputBlur}
          disabled={active !== "email"}
          placeholder={"Логин"}
          icon={active === "email" ? "CloseIcon" : "EditIcon"}
          extraClass={`${styles["placeholder-filled"]} mt-6`}
          ref={ref.email}
        />
        <Input
          name={"password"}
          value={
            active === "password"
              ? data.password
              : new Array(data.password.length + 1).join("*")
          }
          onChange={onInputChange}
          onIconClick={onInputIconClick("password")}
          onBlur={onInputBlur}
          disabled={active !== "password"}
          placeholder={"Пароль"}
          icon={active === "password" ? "CloseIcon" : "EditIcon"}
          extraClass={`${styles["placeholder-filled"]} mt-6`}
          ref={ref.password}
        />
        {control ? (
          <div className={`${styles.control} mt-6`}>
            <Button
              htmlType="reset"
              type="secondary"
              disabled={request}
              size="medium"
            >
              Отмена
            </Button>
            <Button
              htmlType="submit"
              type="primary"
              disabled={request}
              size="medium"
            >
              Сохранить
            </Button>
          </div>
        ) : null}
      </form>
    </article>
  );
}
