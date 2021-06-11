import {Action, createReducer, MetaReducer, on} from '@ngrx/store';
import * as AppActions from './app.actions';
import {environment} from '../../environments/environment';

export const appFeatureKey = 'app';

export interface State {

}

export const initialState: State = {

};


export const reducer = createReducer(
  initialState,

  on(AppActions.loadApps, state => state),
  on(AppActions.loadAppsSuccess, (state, action) => state),
  on(AppActions.loadAppsFailure, (state, action) => state),

);

export const metaReducers: MetaReducer<State>[] = !environment.production ? [] : [];

