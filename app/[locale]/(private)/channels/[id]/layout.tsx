import { ChannelContext, fetchChannel } from "@/features/channels";

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
