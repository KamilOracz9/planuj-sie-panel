import { fetchAttributeValuesByModel } from "@/app/actions/attribute";
import { fetchChannelVisibilitiesByModel } from "@/app/actions/channel-visibility";
import { CollectionContext } from "@/features/collections";
import { fetchCollection } from "@/features/collections/api";

interface LayoutProps {
    children: React.ReactNode;
    params: Promise<{ id: string, locale: string }>;
}

const Layout = async ({ children, params }: LayoutProps) => {
    const { id, locale } = await params;

    const collectionPromise = fetchCollection({ id, locale });
    const existingAttributesPromise = fetchAttributeValuesByModel({ locale, modelId: Number(id), modelType: 'collection' });
    const existingChannelsPromise = fetchChannelVisibilitiesByModel({ locale, modelId: Number(id), modelType: 'collection' });

    return (
        <CollectionContext value={{ collectionPromise, existingAttributesPromise, existingChannelsPromise }}>
            {children}
        </CollectionContext>
    )
}

export default Layout
