import { deleteSeries } from "@/app/actions/series";
import { fetchSeriesList } from "@/features/series";
import { Route } from "@/features/routing";
import IndexTable from "@/features/shared/components/index-table";
import Listing from "@/features/shared/components/listing";
import { Button } from "@/features/shared/components/ui/button";
import { slugify } from "@/lib/utils";
import { PlusCircle } from "lucide-react";
import { getLocale, getTranslations } from "next-intl/server";
import Link from "next/link";
import { cookies } from "next/headers";
import { ACTIVE_CHANNEL_COOKIE } from "@/features/channels";

const List = async () => {
    const locale = await getLocale();
    const tShared = await getTranslations('Shared');
    const channelId = Number((await cookies()).get(ACTIVE_CHANNEL_COOKIE)?.value) || null;

    const seriesPromise = fetchSeriesList({ locale, channelId });

    return (
        <Listing translationsPrefix="Series" actions={
            <Button variant="ghost" asChild>
                <Link href={{ pathname: Route.PRIVATE.SERIES.CREATE.PATHNAME, hash: slugify(tShared('tabs.basic')) }}>
                    <PlusCircle className="h-4 w-4" />
                </Link>
            </Button>
        }>
            <IndexTable
                dataPromise={seriesPromise}
                deleteAction={deleteSeries}
                routes={{
                    show: Route.PRIVATE.SERIES.SHOW.PATHNAME,
                    edit: Route.PRIVATE.SERIES.EDIT.PATHNAME,
                }}
                fields={['name']}
            />
        </Listing>
    )
}

export default List
