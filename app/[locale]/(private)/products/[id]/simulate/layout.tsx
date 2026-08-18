import { fetchVisibilityReport } from "@/app/actions/channel-visibility";
import { fetchVariantsByProduct } from "@/features/variants/api";
import { fetchProductPriceBreakdown } from "@/features/products/api";
import { ProductSimulationContext } from "@/features/products";
import { getActiveChannelId } from "@/features/channels/get-active-channel-id";

interface LayoutProps {
    children: React.ReactNode;
    params: Promise<{ id: string, locale: string }>;
}

const Layout = async ({ children, params }: LayoutProps) => {
    const { id, locale } = await params;
    const activeChannelId = await getActiveChannelId(locale);

    const existingVariantsPromise = fetchVariantsByProduct({ locale, productId: Number(id), channelId: activeChannelId });
    const visibilityReportPromise = activeChannelId
        ? fetchVisibilityReport({ locale, modelType: 'product', modelId: Number(id), channelId: activeChannelId })
        : undefined;
    const priceBreakdownPromise = fetchProductPriceBreakdown({ locale, id: Number(id), channelId: activeChannelId });

    return (
        <ProductSimulationContext value={{ existingVariantsPromise, visibilityReportPromise, priceBreakdownPromise, activeChannelId }}>
            {children}
        </ProductSimulationContext>
    )
}

export default Layout
