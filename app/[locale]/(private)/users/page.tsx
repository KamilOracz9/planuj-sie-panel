import { Route } from "@/features/routing";
import { Button } from "@/features/shared/components/ui/button";
import { Card, CardAction, CardContent, CardHeader, CardTitle } from "@/features/shared/components/ui/card"
import { fetchUsersList, IndexTable } from "@/features/users"
import { Link } from "@/lib/i18n/navigation";
import { PlusCircle } from "lucide-react";
import { getLocale, getTranslations } from "next-intl/server";

const List = async () => {
    const tUsers = await getTranslations('Users');
    const locale = await getLocale();

    const usersPromise = fetchUsersList({ locale });

    return (
        <Card className="flex-1">
            <CardHeader>
                <CardTitle>{tUsers('list.title')}</CardTitle>
                <CardAction>
                    <Button variant="ghost" asChild>
                        <Link href={{ pathname: Route.PRIVATE.USERS.CREATE.PATHNAME }}>
                            <PlusCircle className="h-4 w-4" />
                        </Link>
                    </Button>
                </CardAction>
            </CardHeader>
            <CardContent>
                <IndexTable usersPromise={usersPromise} />
            </CardContent>
        </Card>
    )
}

export default List