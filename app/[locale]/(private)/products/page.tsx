import { fetchProductsList } from "@/features/products/api";
import { deleteProduct } from "@/app/actions/product";
import { Route } from "@/features/routing";
import IndexTable from "@/features/shared/components/index-table";
import Listing from "@/features/shared/components/listing";
import { Button } from "@/features/shared/components/ui/button";
import { Link } from "@/lib/i18n/navigation";
import { PlusCircle } from "lucide-react";
import { getLocale } from "next-intl/server";

const List = async () => {
    const locale = await getLocale();

    const productsPromise = fetchProductsList({ locale });

    return (
        <Listing translationsPrefix="Products" actions={
            <Button variant="ghost" asChild>
                <Link href={{ pathname: Route.PRIVATE.PRODUCTS.CREATE.PATHNAME }}>
                    <PlusCircle className="h-4 w-4" />
                </Link>
            </Button>
        }>
            <IndexTable
                dataPromise={productsPromise}
                deleteAction={deleteProduct}
                routes={{
                    show: Route.PRIVATE.PRODUCTS.SHOW.PATHNAME,
                    edit: Route.PRIVATE.PRODUCTS.EDIT.PATHNAME,
                }}
                fields={['name']}
            />  
        </Listing>
    )
}

export default List