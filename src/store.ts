import { createStore, Reducer, DeepPartial, StoreEnhancer, Store } from 'redux';

import { State } from './state.model';

export const configureStore = (
  reducers: Reducer,
  initialState: DeepPartial<State>,
  middleware: StoreEnhancer,
): Store => {
  return createStore(reducers, initialState, middleware);
};
