import { deleteAttribute } from "@/app/actions/attribute";
import { fetchAttributesList } from "@/features/attributes/api";
import { Route } from "@/features/routing";
import IndexTable from "@/features/shared/components/index-table";
import Listing from "@/features/shared/components/listing";
import { Button } from "@/features/shared/components/ui/button";
import { Link } from "@/lib/i18n/navigation";
import { PlusCircle } from "lucide-react";
import { getLocale } from "next-intl/server";

const List = async () => {
    const locale = await getLocale();

    const attributesPromise = fetchAttributesList({ locale });

    return (
        <Listing translationsPrefix="Attributes" actions={
            <Button variant="ghost" asChild>
                <Link href={{ pathname: Route.PRIVATE.ATTRIBUTES.CREATE.PATHNAME }}>
                    <PlusCircle className="h-4 w-4" />
                </Link>
            </Button>
        }>
            <IndexTable
                dataPromise={attributesPromise}
                deleteAction={deleteAttribute}
                routes={{
                    show: Route.PRIVATE.ATTRIBUTES.SHOW.PATHNAME,
                    edit: Route.PRIVATE.ATTRIBUTES.EDIT.PATHNAME,
                }}
                fields={['name']}
            />  
        </Listing>
    )
}

export default List