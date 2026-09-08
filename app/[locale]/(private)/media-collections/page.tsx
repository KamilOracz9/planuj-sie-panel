import { deleteMediaCollection } from "@/app/actions/media-collection";
import { fetchMediaCollectionsList } from "@/features/media-collections/api";
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

    const mediaCollectionsPromise = fetchMediaCollectionsList({ locale });

    return (
        <Listing translationsPrefix="MediaCollections" actions={
            <Button variant="ghost" asChild>
                <Link href={{ pathname: Route.PRIVATE.MEDIA_COLLECTIONS.CREATE.PATHNAME, hash: slugify(tShared('tabs.basic')) }}>
                    <PlusCircle className="h-4 w-4" />
                </Link>
            </Button>
        }>
            <IndexTable
                dataPromise={mediaCollectionsPromise}
                deleteAction={deleteMediaCollection}
                routes={{
                    show: Route.PRIVATE.MEDIA_COLLECTIONS.SHOW.PATHNAME,
                    edit: Route.PRIVATE.MEDIA_COLLECTIONS.EDIT.PATHNAME,
                }}
                fields={['code', 'name', 'kind', 'type']}
                modelTranslationsPrefix="MediaCollections"
            />
        </Listing>
    )
}

export default List
