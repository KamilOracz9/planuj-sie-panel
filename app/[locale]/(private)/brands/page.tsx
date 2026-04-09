import { fetchBrandsList, IndexTable } from "@/features/brands";
import { Route } from "@/features/routing";
import { Button } from "@/features/shared/components/ui/button";
import { Card, CardAction, CardContent, CardHeader, CardTitle } from "@/features/shared/components/ui/card"
import { Link } from "@/lib/i18n/navigation";
import { PlusCircle } from "lucide-react";
import { getLocale, getTranslations } from "next-intl/server";

const List = async () => {
    const tBrands = await getTranslations('Brands');
    const locale = await getLocale();

    const brandsPromise = fetchBrandsList({ locale });

    return (
        <Card className="flex-1">
            <CardHeader>
                <CardTitle>{tBrands('list.title')}</CardTitle>
                <CardAction>
                    <Button variant="ghost" asChild>
                        <Link href={{ pathname: Route.PRIVATE.BRANDS.CREATE.PATHNAME }}>
                            <PlusCircle className="h-4 w-4" />
                        </Link>
                    </Button>
                </CardAction>
            </CardHeader>
            <CardContent>
                <IndexTable brandsPromise={brandsPromise} />
            </CardContent>
        </Card>
    )
}

export default List