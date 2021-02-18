import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
  MetaReducer
} from '@ngrx/store';
import { environment } from '../../environments/environment';


export interface State {
  /* userState: {
    name: string
  }; */
}

export const reducers: ActionReducerMap<State> = {
  // userState
};


export const metaReducers: MetaReducer<State>[] = !environment.production ? [] : [];
