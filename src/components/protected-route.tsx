import { FC, ReactElement, useState, useEffect } from "react";
import { useLocation, Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "../hooks/redux";

import {
  TAuth,
  TAuthUser,
  getCookie,
  validateName,
  validateEmail,
} from "../utils";
import { readAuthUser } from "../services/actions/auth";

type TState = {
  auth: TAuth;
};
type TProps = {
  anonymous?: boolean;
  children: ReactElement;
};

const ProtectedRoute: FC<TProps> = ({ children, anonymous = false }) => {
  const dispatch = useDispatch();
  const location = useLocation();
  const locationFrom = location.state?.from || "/";
  const accessToken = getCookie("access");
  const isAuth = !!accessToken;
  const {
    data: { name, email },
  } = useSelector((state: TState): TAuthUser => state.auth.user);
  const [isUser, setIsUser] = useState(
    name && email && validateName(name) && validateEmail(email)
  );

  useEffect(() => {
    if (isAuth && !isUser) {
      (async () => {
        if (await dispatch(readAuthUser({ token: accessToken }))) {
          setIsUser(true);
        }
      })();
    }
  }, [dispatch, isAuth, isUser, accessToken]);

  if (isAuth && !isUser) {
    return null;
  }

  if (isAuth && anonymous) {
    return <Navigate to={locationFrom} />;
  }

  if (!isAuth && !anonymous) {
    return <Navigate to="/login" state={{ from: location }} />;
  }

  return children;
};

export default ProtectedRoute;
