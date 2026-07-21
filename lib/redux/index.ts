import { ATTRIBUTE_SLICE_NAME, attributeReducer, AttributeState } from "@/features/attributes";
import { configureStore, Reducer } from "@reduxjs/toolkit";

export function makeStore(preloadedState?: {

}) {
  return configureStore({
    reducer: {
      [ATTRIBUTE_SLICE_NAME]: attributeReducer as Reducer<AttributeState>,
    },
    preloadedState
  });
}

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];