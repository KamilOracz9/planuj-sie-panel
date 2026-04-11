import { getTranslations } from "next-intl/server";
import { Card, CardAction, CardContent, CardHeader, CardTitle } from "./ui/card";

interface ListingProps {
    translationsPrefix: string;
    children?: React.ReactNode;
    actions?: React.ReactNode;
}

const Listing = async ({ translationsPrefix, children, actions }: ListingProps) => {
    const tModel = await getTranslations(translationsPrefix);

    return (
        <Card className="flex-1">
            <CardHeader>
                <CardTitle>{tModel('list.title')}</CardTitle>
                <CardAction>
                    {actions}
                </CardAction>
            </CardHeader>
            <CardContent>
                {children}
            </CardContent>
        </Card>
    )
}

export default Listing