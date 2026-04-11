import { deleteCategory } from "@/app/actions/category";
import { fetchCategoriesList } from "@/features/categories/api";
import { Route } from "@/features/routing";
import IndexTable from "@/features/shared/components/index-table";
import Listing from "@/features/shared/components/listing";
import { Button } from "@/features/shared/components/ui/button";
import { Link } from "@/lib/i18n/navigation";
import { PlusCircle } from "lucide-react";
import { getLocale } from "next-intl/server";

const List = async () => {
    const locale = await getLocale();

    const categoriesPromise = fetchCategoriesList({ locale });

    return (
        <Listing translationsPrefix="Categories" actions={
            <Button variant="ghost" asChild>
                <Link href={{ pathname: Route.PRIVATE.CATEGORIES.CREATE.PATHNAME }}>
                    <PlusCircle className="h-4 w-4" />
                </Link>
            </Button>
        }>
            <IndexTable
                dataPromise={categoriesPromise}
                deleteAction={deleteCategory}
                routes={{
                    show: Route.PRIVATE.CATEGORIES.SHOW.PATHNAME,
                    edit: Route.PRIVATE.CATEGORIES.EDIT.PATHNAME,
                }}
                modelTranslationsPrefix="Categories"
                fields={['name', 'parent_name']}
            />  
        </Listing>
    )
}

export default List