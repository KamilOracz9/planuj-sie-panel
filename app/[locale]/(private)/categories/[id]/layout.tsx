import { fetchAttributeValuesByModel } from "@/app/actions/attribute";
import { fetchChannelVisibilitiesByModel } from "@/app/actions/channel-visibility";
import { CategoryContext } from "@/features/categories";
import { fetchCategory } from "@/features/categories/api";

interface LayoutProps {
    children: React.ReactNode;
    params: Promise<{ id: string, locale: string }>;
}

const Layout = async ({ children, params }: LayoutProps) => {
    const { id, locale } = await params;

    const categoryPromise = fetchCategory({ id, locale });
    const existingAttributesPromise = fetchAttributeValuesByModel({ locale, modelId: Number(id), modelType: 'category' });
    const existingChannelsPromise = fetchChannelVisibilitiesByModel({ locale, modelId: Number(id), modelType: 'category' });

    return (
        <CategoryContext value={{ categoryPromise, existingAttributesPromise, existingChannelsPromise }}>
            {children}
        </CategoryContext>
    )
}

export default Layout