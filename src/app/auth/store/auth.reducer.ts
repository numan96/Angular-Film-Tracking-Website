import { Action, createReducer, on } from '@ngrx/store';
import { User } from '../user.model';
import * as authActions from './auth.actions';

export interface State {
  user: User;
  authError: string;
  loading: boolean;
}

export const initialState: State = {
  user: null,
  authError: null,
  loading: false,
};

const _authReducer = createReducer(
  initialState,
  on(authActions.AuthSuccess, (state, action) => ({
    ...state,
    authError: null,
    user: new User(
      action.email,
      action.userId,
      action.token,
      action.expirationDate
    ),
    loading: false,
  })),
  on(authActions.AuthFail, (state, action) => ({
    ...state,
    authError: action.errorMessage,
    user: null,
    loading: false,
  })),
  on(authActions.SignupStart, authActions.LoginStart, (state) => ({
    ...state,
    authError: null,
    loading: true,
  })),
  on(authActions.Logout, (state, action) => ({
    ...state,
    user: null,
  })),
  on(authActions.ClearError, (state, action) => ({
    ...state,
    authError: null,
  }))
);

export function authReducer(state: State, action: Action) {
  return _authReducer(state, action);
}
