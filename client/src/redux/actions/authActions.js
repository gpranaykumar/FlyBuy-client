import axios from 'axios';
import { clearCart, getCart } from './cartActions';
import { returnErrors } from './errorActions';
import { USER_LOADING, USER_LOADED, AUTH_ERROR, LOGIN_SUCCESS, LOGIN_FAIL, LOGOUT_SUCCESS, REGISTER_SUCCESS, REGISTER_FAIL} from './types';

export const loadUser = () => (dispatch, getState) => {
    // User loading
    dispatch({ type: USER_LOADING });

    axios.get('/api/user', tokenConfig(getState))
        .then(res => {
            dispatch(getCart(res.data._id));
            dispatch({
                type: USER_LOADED,
                payload: res.data
            })
        })
        .catch(err => {
            try{
                dispatch(returnErrors(err.response, err.response.status)); // err.response.data
                dispatch({
                    type: AUTH_ERROR
                });
            }catch(e){
                console.log(e);
            }
        });
}

export const register = ({name, email, password}) => dispatch => {
    // headers
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }

    //request body
    const body = JSON.stringify({name, email, password});

    axios.post('/api/register',body,config)
        .then(res => dispatch({
            type: REGISTER_SUCCESS,
            payload: res.data
        }))
        .catch(err => {
            dispatch(returnErrors(err.response.data, err.response.status, 'REGISTER_FAIL'));
            dispatch({
                type: REGISTER_FAIL
            });
        });
}

export const login = ({email, password}) => (dispatch) => {
    // headers
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }

    //request body
    const body = JSON.stringify({email, password});
    axios.post('/api/login',body,config)
        .then(res => {
            console.log("authActions /api/login - " + JSON.stringify(res));
            dispatch({
            type: LOGIN_SUCCESS,
            payload: res.data
            });
            console.log("done");
            Promise.resolve()
        })
        .catch(err => {
            console.log("authActions login err - "+ JSON.stringify(err));
            try{
                dispatch(returnErrors(err.response.data, err.response.status, 'LOGIN_FAIL'));
            }catch(e){
                console.log(e);
            }
            dispatch({
                type: LOGIN_FAIL
            });
        });
}
// logout user
export const logout = () => dispatch => {
    dispatch({
        type: LOGOUT_SUCCESS
    });
    dispatch(clearCart());
    
}


// Setup config/headers and token
export const tokenConfig = getState => {
    //Get token from local storage
    const token = getState().auth.token;

    // Headers
    const config = {
        headers:{
            "Content-type": "application/json",
        }
    }

    if(token){
        config.headers['x-auth-token'] = token;
    }

    return config;
}
