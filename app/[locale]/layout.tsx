import type { Metadata } from "next";
import "../globals.css";
import { NextIntlClientProvider } from "next-intl";
import { TooltipProvider } from "@/features/shared/components/ui/tooltip";
import StoreProvider from "../store-provider";
import { ATTRIBUTE_SLICE_NAME } from "@/features/attributes";
import { fetchAttributesListForSelect } from "../actions/attribute";
import { getLocale } from "next-intl/server";
import { CATEGORY_SLICE_NAME } from "@/features/categories/store/slice";
import { fetchCategoriesListForSelect } from "../actions/category";
import { BRAND_SLICE_NAME } from "@/features/brands/store/slice";
import { fetchBrandsListForSelect } from "../actions/brand";
import { SERIES_SLICE_NAME } from "@/features/series/store/slice";
import { fetchSeriesListForSelect } from "../actions/series";
import { COLLECTION_SLICE_NAME } from "@/features/collections/store/slice";
import { fetchCollectionsListForSelect } from "../actions/collection";
import { CHANNEL_SLICE_NAME } from "@/features/channels/store/slice";
import { fetchChannelsListForSelect } from "../actions/channel";
import { CURRENCY_SLICE_NAME } from "@/features/currencies/store/slice";
import { fetchCurrenciesListForSelect } from "../actions/currency";

export const metadata: Metadata = {
  title: "Panel",
  description: "Panel administracyjny sklepu",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const locale = await getLocale();

  return (
    <html lang={locale}>
      <body>
        <NextIntlClientProvider>
          <StoreProvider preloadedState={{
            [ATTRIBUTE_SLICE_NAME]: {
              attributesSelect: await fetchAttributesListForSelect({ locale })
            },
            [CATEGORY_SLICE_NAME]: {
              categoriesSelect: await fetchCategoriesListForSelect({ locale })
            },
            [BRAND_SLICE_NAME]: {
              brandsSelect: await fetchBrandsListForSelect({ locale })
            },
            [SERIES_SLICE_NAME]: {
              seriesSelect: await fetchSeriesListForSelect({ locale })
            },
            [COLLECTION_SLICE_NAME]: {
              collectionsSelect: await fetchCollectionsListForSelect({ locale })
            },
            [CHANNEL_SLICE_NAME]: {
              channelsSelect: await fetchChannelsListForSelect({ locale })
            },
            [CURRENCY_SLICE_NAME]: {
              currenciesSelect: await fetchCurrenciesListForSelect({ locale })
            }
          }}>
            <TooltipProvider>
              {children}
            </TooltipProvider>
          </StoreProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
