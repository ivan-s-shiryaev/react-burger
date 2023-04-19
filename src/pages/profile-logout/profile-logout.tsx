import { useEffect } from "react";
import { useNavigate } from "react-router";

import { useDispatch } from "../../hooks/redux";
import { getCookie } from "../../utils";
import { readAuthLogout } from "../../services/actions/auth";
import styles from "./profile-logout.module.css";

export function ProfileLogoutPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const refreshToken = getCookie("refresh");
  const accessToken = getCookie("access");
  const isAuth = !!accessToken;

  useEffect(() => {
    if (isAuth) {
      (async () => {
        await dispatch(readAuthLogout({ token: refreshToken }));
      })();
    } else {
      navigate("/login", { replace: true });
    }
  }, [dispatch, navigate, isAuth, refreshToken]);

  return (
    <article className={`${styles.container} mt-10`}>
      <p className="text text_type_main-small">Подждите...</p>
    </article>
  );
}
