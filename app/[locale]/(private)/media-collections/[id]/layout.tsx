import { MediaCollectionContext, fetchMediaCollection } from "@/features/media-collections";

interface LayoutProps {
    children: React.ReactNode;
    params: Promise<{ id: string, locale: string }>;
}

const Layout = async ({ children, params }: LayoutProps) => {
    const { id, locale } = await params;

    const mediaCollectionPromise = fetchMediaCollection({ id, locale });

    return (
        <MediaCollectionContext value={{ mediaCollectionPromise }}>
            {children}
        </MediaCollectionContext>
    )
}

export default Layout
