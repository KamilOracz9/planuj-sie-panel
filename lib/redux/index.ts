import { configureStore, Reducer } from "@reduxjs/toolkit";

export function makeStore(preloadedState?: {

}) {
  return configureStore({
    reducer: {
    },
    preloadedState
  });
}

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];