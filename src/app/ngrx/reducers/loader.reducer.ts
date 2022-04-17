import { LoaderActions, START_LOADER, STOP_LOADER } from '../actions/loader.actions';
import { LoaderType } from '../../models/LoaderType';

export interface State {
  loader: boolean;
}

const initialState: State = {
  loader: false,
};

export function loaderReducer(state = initialState, action: LoaderActions): any {
  switch (action.type) {
    case START_LOADER:
      const loaderType = new LoaderType(action.payload.type, action?.payload?.message);
      return {
        ...state,
        loader: loaderType,
      };
    case STOP_LOADER:
      return {
        ...state,
        loader: null,
      };
    default: {
      return state;
    }
  }
}
