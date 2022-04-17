import { Action } from '@ngrx/store';

export const START_LOADER = '[Loader] Start Loader';
export const STOP_LOADER = '[Loader] Stop Loader';

export class StartLoader implements Action {
  readonly type = START_LOADER;

  constructor(
    public payload: {
      type: 'full';
      message?: string;
    }
  ) {}
}

export class StopLoader implements Action {
  readonly type = STOP_LOADER;
}

export type LoaderActions = StartLoader | StopLoader;
