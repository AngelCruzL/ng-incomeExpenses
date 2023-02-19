import {ActionReducerMap} from '@ngrx/store';
import * as ui from './shared/state/ui.reducer';

export type AppState = {
  ui: ui.State;
}

export const appReducers: ActionReducerMap<AppState> = {
  ui: ui.uiReducer,
}
