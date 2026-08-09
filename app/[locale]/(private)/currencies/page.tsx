import { deleteCurrency } from "@/app/actions/currency";
import { fetchCurrenciesList } from "@/features/currencies";
import { Route } from "@/features/routing";
import IndexTable from "@/features/shared/components/index-table";
import Listing from "@/features/shared/components/listing";
import { Button } from "@/features/shared/components/ui/button";
import { slugify } from "@/lib/utils";
import { PlusCircle } from "lucide-react";
import { getLocale, getTranslations } from "next-intl/server";
import Link from "next/link";

const List = async () => {
    const locale = await getLocale();
    const tShared = await getTranslations('Shared');

    const currenciesPromise = fetchCurrenciesList({ locale });

    return (
        <Listing translationsPrefix="Currencies" actions={
            <Button variant="ghost" asChild>
                <Link href={{ pathname: Route.PRIVATE.CURRENCIES.CREATE.PATHNAME, hash: slugify(tShared('tabs.basic')) }}>
                    <PlusCircle className="h-4 w-4" />
                </Link>
            </Button>
        }>
            <IndexTable
                dataPromise={currenciesPromise}
                deleteAction={deleteCurrency}
                routes={{
                    show: Route.PRIVATE.CURRENCIES.SHOW.PATHNAME,
                    edit: Route.PRIVATE.CURRENCIES.EDIT.PATHNAME,
                }}
                fields={['code', 'name', 'symbol']}
                modelTranslationsPrefix="Currencies"
            />
        </Listing>
    )
}

export default List
