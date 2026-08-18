import { fetchAttributeOptionsList } from "@/features/attributes/api";
import { deleteAttributeOption } from "@/app/actions/attribute-option";
import { Route } from "@/features/routing";
import IndexTable from "@/features/shared/components/index-table";
import Listing from "@/features/shared/components/listing";
import { Button } from "@/features/shared/components/ui/button";
import { Link } from "@/lib/i18n/navigation";
import { PlusCircle } from "lucide-react";
import { getLocale } from "next-intl/server";

const List = async () => {
    const locale = await getLocale();

    const optionsPromise = fetchAttributeOptionsList({ locale });

    return (
        <Listing translationsPrefix="AttributeOptions" actions={
            <Button variant="ghost" asChild>
                <Link href={{ pathname: Route.PRIVATE.ATTRIBUTE_OPTIONS.CREATE.PATHNAME }}>
                    <PlusCircle className="h-4 w-4" />
                </Link>
            </Button>
        }>
            <IndexTable
                dataPromise={optionsPromise}
                deleteAction={deleteAttributeOption}
                routes={{
                    show: Route.PRIVATE.ATTRIBUTE_OPTIONS.SHOW.PATHNAME,
                    edit: Route.PRIVATE.ATTRIBUTE_OPTIONS.EDIT.PATHNAME,
                }}
                fields={['name']}
            />
        </Listing>
    )
}

export default List
