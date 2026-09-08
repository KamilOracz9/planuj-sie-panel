import { ChannelContext } from "@/features/channels";
import { fetchChannel } from "@/features/channels/api";

interface LayoutProps {
    children: React.ReactNode;
    params: Promise<{ id: string, locale: string }>;
}

const Layout = async ({ children, params }: LayoutProps) => {
    const { id, locale } = await params;

    const channelPromise = fetchChannel({ id, locale });

    return (
        <ChannelContext value={{ channelPromise }}>
            {children}
        </ChannelContext>
    )
}

export default Layout
