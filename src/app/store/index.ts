
import { authReducer, AuthEffects } from './auth';
import { MetaReducer } from "@ngrx/store";
import { hydrationMetaReducer } from "./hydratation.reducers";


export const metaReducers: MetaReducer[] = [hydrationMetaReducer];

//import { DataEffects, dataReducer } from './data';

export * from './auth';
//export * from './data';

export const appReducer = {
  auth: authReducer,
  //data: dataReducer,
};

//export const appEffects = [AuthEffects, DataEffects];
export const appEffects = [AuthEffects];