import { ATTRIBUTE_SLICE_NAME, attributeReducer, AttributeState } from "@/features/attributes";
import { CATEGORY_SLICE_NAME, categoryReducer, CategoryState } from "@/features/categories/store/slice";
import { configureStore, Reducer } from "@reduxjs/toolkit";

export function makeStore(preloadedState?: {

}) {
  return configureStore({
    reducer: {
      [ATTRIBUTE_SLICE_NAME]: attributeReducer as Reducer<AttributeState>,
      [CATEGORY_SLICE_NAME]: categoryReducer as Reducer<CategoryState>,
    },
    preloadedState
  });
}

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];