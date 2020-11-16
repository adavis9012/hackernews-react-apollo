import React, {useReducer} from 'react';
import {AUTH_TOKEN} from "../constants";

interface State {
    login?: boolean
    email?: string
    password?: string
    name?: string
}

interface Action extends State{
    type: 'SET_LOGIN' | 'SET_EMAIL' | 'SET_PASSWORD' | 'SET_NAME'
}

const loginReducer = (state: State, action: Action) => {
   switch (action.type) {
       case "SET_LOGIN":
           return {
               ...state,
               login: action.login
           }
       case "SET_EMAIL":
           return {
               ...state,
               email: action.email
           }
       case "SET_PASSWORD":
           return {
               ...state,
               password: action.password
           }
       case "SET_NAME":
           return {
               ...state,
               name: action.name
           }
       default:
           return state;
   }
}

const Login = (() => {
    let [state, dispatch] = useReducer(loginReducer, {
        login: true,
        email: '',
        password: '',
        name: ''
    });

    async function handleConfirm() {

    }

    function saveUserData(token: string) {
        localStorage.setItem(AUTH_TOKEN, token);
    }

    return <div>
        <h4 className="mv3">{state.login ? 'Login' : 'Sign Up'}</h4>
        <div className="flex flex-column">
            {!state.login && (
                <input
                    value={state.name}
                    onChange={e => dispatch({type: 'SET_NAME', name: e.target.value})}
                    type="text"
                    placeholder="Your Name"
                />
            )}
            <input
                value={state.email}
                onChange={e => dispatch({type: 'SET_EMAIL', email: e.target.value})}
                type="text"
                placeholder="Your email address"
            />
            <input
                value={state.password}
                onChange={e => dispatch({type: 'SET_PASSWORD', password: e.target.value})}
                type="text"
                placeholder="Choose a safe password"
            />
        </div>
        <div className="flex mt3">
            <div className="pointer mr2 button" onClick={handleConfirm}>
                {state.login ? 'login' : 'create account'}
            </div>
            <div
                className="pointer button"
                onClick={() => dispatch({type: 'SET_LOGIN', login: !state.login})}
            >
                {state.login
                    ? 'need to create an account?'
                    : 'already have an account?'
                }
            </div>
        </div>
    </div>;
});

export default Login;
