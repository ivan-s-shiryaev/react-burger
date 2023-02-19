import React from 'react';
import {
    useSelector,
    useDispatch,
} from 'react-redux';
import {
    Navigate,
} from 'react-router-dom';

import {
    getCookie,
} from '../utils';
import {
    readAuthUser,
} from '../services/actions/auth';

export const ProtectedRoute = ({ element }) => {

    const dispatch = useDispatch();

    const token = getCookie('access');

    const [loaded, setLoaded] = React.useState(false);
    const {
        data: user
    } = useSelector((state) => state.auth.user);

    React.useEffect(
        () => {

            (
                async () => {

                    await dispatch(readAuthUser({ token }))

                    setLoaded(true);

                }
            )();

        }
        , [
            dispatch,
            token,
        ]
    );

    return loaded 
        ? user?.email
            ? element
            : <Navigate
                to="/login"
                replace
            />
        : null
    ;

};
