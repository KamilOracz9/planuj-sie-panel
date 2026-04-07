import { Card, CardAction, CardContent, CardHeader, CardTitle } from "@/features/shared/components/ui/card"
import { fetchUsersList, IndexTable } from "@/features/users"
import { getLocale, getTranslations } from "next-intl/server";

const List = async () => {
    const tUsers = await getTranslations('Users');
    const locale = await getLocale();

    const usersPromise = fetchUsersList({locale});

    return (
        <Card className="flex-1">
            <CardHeader>
                <CardTitle>{tUsers('title')}</CardTitle>
                <CardAction>Add User</CardAction>
            </CardHeader>
            <CardContent>
                <IndexTable usersPromise={usersPromise} />
            </CardContent>
        </Card>
    )
}

export default List