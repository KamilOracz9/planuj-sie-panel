import { deleteBrand } from "@/app/actions/brand";
import { fetchBrandsList } from "@/features/brands";
import { Route } from "@/features/routing";
import IndexTable from "@/features/shared/components/index-table";
import Listing from "@/features/shared/components/listing";
import { Button } from "@/features/shared/components/ui/button";
import { slugify } from "@/lib/utils";
import { PlusCircle } from "lucide-react";
import { getLocale, getTranslations } from "next-intl/server";
import Link from "next/link";
import { cookies } from "next/headers";
import { ACTIVE_CHANNEL_COOKIE } from "@/features/channels";

const List = async () => {
    const locale = await getLocale();
    const tShared = await getTranslations('Shared');
    const channelId = Number((await cookies()).get(ACTIVE_CHANNEL_COOKIE)?.value) || null;

    const brandsPromise = fetchBrandsList({ locale, channelId });

    return (
        <Listing translationsPrefix="Brands" actions={
            <Button variant="ghost" asChild>
                <Link href={{ pathname: Route.PRIVATE.BRANDS.CREATE.PATHNAME, hash: slugify(tShared('tabs.basic')) }}>
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