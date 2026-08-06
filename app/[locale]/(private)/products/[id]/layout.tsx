import { fetchAttributeValuesByModel } from "@/app/actions/attribute";
import { fetchChannelVisibilitiesByModel } from "@/app/actions/channel-visibility";
import { ProductContext, fetchProduct } from "@/features/products";

interface LayoutProps {
    children: React.ReactNode;
    params: Promise<{ id: string, locale: string }>;
}

const Layout = async ({ children, params }: LayoutProps) => {
    const { id, locale } = await params;

    const productPromise = fetchProduct({ id, locale });
    const existingAttributesPromise = fetchAttributeValuesByModel({ locale, modelId: Number(id), modelType: 'product' });
    const existingChannelsPromise = fetchChannelVisibilitiesByModel({ locale, modelId: Number(id), modelType: 'product' });

    return (
        <ProductContext value={{ productPromise, existingAttributesPromise, existingChannelsPromise }}>
            {children}
        </ProductContext>
    )
}

export default Layout