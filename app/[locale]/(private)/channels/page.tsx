import { deleteChannel } from "@/app/actions/channel";
import { fetchChannelsList } from "@/features/channels/api";
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

    const channelsPromise = fetchChannelsList({ locale });

    return (
        <Listing translationsPrefix="Channels" actions={
            <Button variant="ghost" asChild>
                <Link href={{ pathname: Route.PRIVATE.CHANNELS.CREATE.PATHNAME, hash: slugify(tShared('tabs.basic')) }}>
                    <PlusCircle className="h-4 w-4" />
                </Link>
            </Button>
        }>
            <IndexTable
                dataPromise={channelsPromise}
                deleteAction={deleteChannel}
                routes={{
                    show: Route.PRIVATE.CHANNELS.SHOW.PATHNAME,
                    edit: Route.PRIVATE.CHANNELS.EDIT.PATHNAME,
                }}
                fields={['name', 'is_default']}
            />
        </Listing>
    )
}

export default List
