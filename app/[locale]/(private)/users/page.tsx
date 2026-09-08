import { Route } from "@/features/routing";
import Listing from "@/features/shared/components/listing";
import { Button } from "@/features/shared/components/ui/button";
import { IndexTable } from "@/features/users"
import { fetchUsersList } from "@/features/users/api"
import { Link } from "@/lib/i18n/navigation";
import { PlusCircle } from "lucide-react";
import { getLocale } from "next-intl/server";

const List = async () => {
    const locale = await getLocale();

    const usersPromise = fetchUsersList({ locale });

    return (
        <Listing translationsPrefix="Users" actions={
            <Button variant="ghost" asChild>
                <Link href={{ pathname: Route.PRIVATE.USERS.CREATE.PATHNAME }}>
                    <PlusCircle className="h-4 w-4" />
                </Link>
            </Button>
        }>
            <IndexTable usersPromise={usersPromise} />
        </Listing>
    )
}

export default List