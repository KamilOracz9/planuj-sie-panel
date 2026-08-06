import { fetchAttributeValuesByModel } from "@/app/actions/attribute";
import { fetchChannelVisibilitiesByModel } from "@/app/actions/channel-visibility";
import { SeriesContext, fetchSeries } from "@/features/series";

interface LayoutProps {
    children: React.ReactNode;
    params: Promise<{ id: string, locale: string }>;
}

const Layout = async ({ children, params }: LayoutProps) => {
    const { id, locale } = await params;

    const seriesPromise = fetchSeries({ id, locale });
    const existingAttributesPromise = fetchAttributeValuesByModel({ locale, modelId: Number(id), modelType: 'series' });
    const existingChannelsPromise = fetchChannelVisibilitiesByModel({ locale, modelId: Number(id), modelType: 'series' });

    return (
        <SeriesContext value={{ seriesPromise, existingAttributesPromise, existingChannelsPromise }}>
            {children}
        </SeriesContext>
    )
}

export default Layout
