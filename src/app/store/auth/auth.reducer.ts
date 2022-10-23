import { createReducer, on, Action } from '@ngrx/store';
import { Profile } from '@shared/models/profile';
import * as authActions from './auth.actions';

export const authFeatureName = 'auth';

export interface AuthState {
  isLoggedIn: boolean;
  token: string | null;
  profile: Profile | null;
}

export const initialAuthState: AuthState = {
  isLoggedIn: false,
  token: null,
  profile: null

};

const authReducerInternal = createReducer(
  initialAuthState,

  on(authActions.loginComplete, (state, { isLoggedIn, token, profile }) => {
    return {
      ...state,
      isLoggedIn,
      token,
      profile
    };
  }),
  on(authActions.logout, (state, {}) => {
    return {
      ...state,
      isLoggedIn: false,
      token: null,
      profile: null
    };
  })
);

export function authReducer(state: AuthState | undefined, action: Action) {
  return authReducerInternal(state, action);
}