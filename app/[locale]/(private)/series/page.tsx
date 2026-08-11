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
import { getActiveChannelId } from "@/features/channels/get-active-channel-id";

const List = async () => {
    const locale = await getLocale();
    const tShared = await getTranslations('Shared');
    const channelId = await getActiveChannelId(locale);

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
