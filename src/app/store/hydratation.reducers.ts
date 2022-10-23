// hydration.reducer.ts
import { ActionReducer, INIT } from "@ngrx/store";
import { AuthState } from './auth/auth.reducer';

export const hydrationMetaReducer = (
    reducer: ActionReducer<AuthState>
): ActionReducer<AuthState> => {
    return (state, action) => {
        if (action.type === INIT) {
            const storageValue = localStorage.getItem("__storage__");
            if (storageValue) {
                try {
                    return JSON.parse(storageValue);
                } catch {
                    localStorage.removeItem("__storage__");
                }
            }
        }
        const nextState = reducer(state, action);
        localStorage.setItem("__storage__", JSON.stringify(nextState));
        return nextState;
    };
};