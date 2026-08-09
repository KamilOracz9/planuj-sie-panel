import { ATTRIBUTE_SLICE_NAME, attributeReducer, AttributeState } from "@/features/attributes";
import { CATEGORY_SLICE_NAME, categoryReducer, CategoryState } from "@/features/categories/store/slice";
import { BRAND_SLICE_NAME, brandReducer, BrandState } from "@/features/brands/store/slice";
import { SERIES_SLICE_NAME, seriesReducer, SeriesState } from "@/features/series/store/slice";
import { COLLECTION_SLICE_NAME, collectionReducer, CollectionState } from "@/features/collections/store/slice";
import { CHANNEL_SLICE_NAME, channelReducer, ChannelState } from "@/features/channels/store/slice";
import { CURRENCY_SLICE_NAME, currencyReducer, CurrencyState } from "@/features/currencies/store/slice";
import { MEDIA_COLLECTION_SLICE_NAME, mediaCollectionReducer, MediaCollectionState } from "@/features/media-collections/store/slice";
import { configureStore, Reducer } from "@reduxjs/toolkit";

export function makeStore(preloadedState?: {

}) {
  return configureStore({
    reducer: {
      [ATTRIBUTE_SLICE_NAME]: attributeReducer as Reducer<AttributeState>,
      [CATEGORY_SLICE_NAME]: categoryReducer as Reducer<CategoryState>,
      [BRAND_SLICE_NAME]: brandReducer as Reducer<BrandState>,
      [SERIES_SLICE_NAME]: seriesReducer as Reducer<SeriesState>,
      [COLLECTION_SLICE_NAME]: collectionReducer as Reducer<CollectionState>,
      [CHANNEL_SLICE_NAME]: channelReducer as Reducer<ChannelState>,
      [CURRENCY_SLICE_NAME]: currencyReducer as Reducer<CurrencyState>,
      [MEDIA_COLLECTION_SLICE_NAME]: mediaCollectionReducer as Reducer<MediaCollectionState>,
    },
    preloadedState
  });
}

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];