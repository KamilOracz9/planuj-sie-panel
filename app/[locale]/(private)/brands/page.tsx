import { deleteBrand } from "@/app/actions/brand";
import { fetchBrandsList } from "@/features/brands";
import { Route } from "@/features/routing";
import IndexTable from "@/features/shared/components/index-table";
import Listing from "@/features/shared/components/listing";
import { Button } from "@/features/shared/components/ui/button";
import { Link } from "@/lib/i18n/navigation";
import { PlusCircle } from "lucide-react";
import { getLocale } from "next-intl/server";

const List = async () => {
    const locale = await getLocale();

    const brandsPromise = fetchBrandsList({ locale });

    return (
        <Listing translationsPrefix="Brands" actions={
            <Button variant="ghost" asChild>
                <Link href={{ pathname: Route.PRIVATE.BRANDS.CREATE.PATHNAME }}>
                    <PlusCircle className="h-4 w-4" />
                </Link>
            </Button>
        }>
            <IndexTable
                dataPromise={brandsPromise}
                deleteAction={deleteBrand}
                routes={{
                    show: Route.PRIVATE.BRANDS.SHOW.PATHNAME,
                    edit: Route.PRIVATE.BRANDS.EDIT.PATHNAME,
                }}
                fields={['name']}
            />  
        </Listing>
    )
}

export default List