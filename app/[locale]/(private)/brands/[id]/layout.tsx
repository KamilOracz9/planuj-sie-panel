import { fetchAttributeValuesByModel } from "@/app/actions/attribute";
import { fetchChannelVisibilitiesByModel } from "@/app/actions/channel-visibility";
import { BrandContext } from "@/features/brands";
import { fetchBrand } from "@/features/brands/api";

interface LayoutProps {
    children: React.ReactNode;
    params: Promise<{ id: string, locale: string }>;
}

const Layout = async ({ children, params }: LayoutProps) => {
    const { id, locale } = await params;

    const brandPromise = fetchBrand({ id, locale });
    const existingAttributesPromise = fetchAttributeValuesByModel({ locale, modelId: Number(id), modelType: 'brand' });
    const existingChannelsPromise = fetchChannelVisibilitiesByModel({ locale, modelId: Number(id), modelType: 'brand' });

    return (
        <BrandContext value={{ brandPromise, existingAttributesPromise, existingChannelsPromise }}>
            {children}
        </BrandContext>
    )
}

export default Layout