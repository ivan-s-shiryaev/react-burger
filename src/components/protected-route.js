import React from 'react';
import {
    useDispatch,
    useSelector,
} from 'react-redux';
import {
    useLocation,
    Navigate,
} from 'react-router-dom';

import {
    getCookie,
    validateName,
    validateEmail,
} from '../utils';
import {
    readAuthUser,
} from '../services/actions/auth';

export default function ProtectedRoute({ children, anonymous = false }) {

    const dispatch = useDispatch();
    const location = useLocation();
    const locationFrom = location.state?.from || '/';
    const accessToken = getCookie('access');
    const isAuth = !!accessToken;
    const {
        data: {
            name,
            email,
        },
    } = useSelector((state) => state.auth.user);
    const [isUser, setIsUser] = React.useState(
        name
        && email
        && validateName(name)
        && validateEmail(email)
    );

    React.useEffect(
        () => {

            if (
                isAuth
                && !isUser
            ) {
                (
                    async () => {
                        if (await dispatch(readAuthUser({ token: accessToken }))) {
                            setIsUser(true);
                        }
                    }
                )();
            }

        }
        ,[
            dispatch,
            isAuth,
            isUser,
            accessToken,
        ]
    );

    if (isAuth && !isUser) {
        return null;
    }

    if (isAuth && anonymous) {
        return <Navigate to={locationFrom} />;
    }

    if (!isAuth && !anonymous) {
        return <Navigate to="/login" state={{ from: location}}/>;
    }

    return children;

}
