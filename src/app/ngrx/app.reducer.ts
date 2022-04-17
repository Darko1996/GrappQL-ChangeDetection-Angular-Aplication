import * as fromLoader from './reducers/loader.reducer';
import { ActionReducerMap, createFeatureSelector } from '@ngrx/store';

export interface State {
  loader: fromLoader.State;
}

export const reducers: ActionReducerMap<State> = {
  // @ts-ignore
  loader: fromLoader.loaderReducer,
};

export const getLoaderState = createFeatureSelector<fromLoader.State>('loader');
