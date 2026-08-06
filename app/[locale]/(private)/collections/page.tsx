import { deleteCollection } from "@/app/actions/collection";
import { fetchCollectionsList } from "@/features/collections";
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

    const collectionsPromise = fetchCollectionsList({ locale });

    return (
        <Listing translationsPrefix="Collections" actions={
            <Button variant="ghost" asChild>
                <Link href={{ pathname: Route.PRIVATE.COLLECTIONS.CREATE.PATHNAME, hash: slugify(tShared('tabs.basic')) }}>
                    <PlusCircle className="h-4 w-4" />
                </Link>
            </Button>
        }>
            <IndexTable
                dataPromise={collectionsPromise}
                deleteAction={deleteCollection}
                routes={{
                    show: Route.PRIVATE.COLLECTIONS.SHOW.PATHNAME,
                    edit: Route.PRIVATE.COLLECTIONS.EDIT.PATHNAME,
                }}
                fields={['name']}
            />
        </Listing>
    )
}

export default List
