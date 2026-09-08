import { fetchAttributeValuesByModel } from "@/app/actions/attribute";
import { fetchChannelVisibilitiesByModel } from "@/app/actions/channel-visibility";
import { fetchPricesByModel } from "@/app/actions/price";
import { ProductContext } from "@/features/products";
import { fetchProduct } from "@/features/products/api";

interface LayoutProps {
    children: React.ReactNode;
    params: Promise<{ id: string, locale: string }>;
}

const Layout = async ({ children, params }: LayoutProps) => {
    const { id, locale } = await params;

    const productPromise = fetchProduct({ id, locale });
    const existingAttributesPromise = fetchAttributeValuesByModel({ locale, modelId: Number(id), modelType: 'product' });
    const existingChannelsPromise = fetchChannelVisibilitiesByModel({ locale, modelId: Number(id), modelType: 'product' });
    const existingPricesPromise = fetchPricesByModel({ locale, modelId: Number(id), modelType: 'product' });

    return (
        <ProductContext value={{ productPromise, existingAttributesPromise, existingChannelsPromise, existingPricesPromise }}>
            {children}
        </ProductContext>
    )
}

export default Layout