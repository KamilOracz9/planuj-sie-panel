import { fetchVariantsList } from "@/features/variants/api";
import { deleteVariant } from "@/app/actions/variants";
import { Route } from "@/features/routing";
import IndexTable from "@/features/shared/components/index-table";
import Listing from "@/features/shared/components/listing";
import { Button } from "@/features/shared/components/ui/button";
import { Link } from "@/lib/i18n/navigation";
import { PlusCircle } from "lucide-react";
import { getLocale } from "next-intl/server";

const List = async () => {
    const locale = await getLocale();

    const variantsPromise = fetchVariantsList({ locale });

    return (
        <Listing translationsPrefix="Variants" actions={
            <Button variant="ghost" asChild>
                <Link href={{ pathname: Route.PRIVATE.VARIANTS.CREATE.PATHNAME }}>
                    <PlusCircle className="h-4 w-4" />
                </Link>
            </Button>
        }>
            <IndexTable
                dataPromise={variantsPromise}
                deleteAction={deleteVariant}
                routes={{
                    show: Route.PRIVATE.VARIANTS.SHOW.PATHNAME,
                    edit: Route.PRIVATE.VARIANTS.EDIT.PATHNAME,
                }}
                fields={['name']}
            />  
        </Listing>
    )
}

export default List