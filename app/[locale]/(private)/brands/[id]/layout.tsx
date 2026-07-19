import { BrandContext, fetchBrand } from "@/features/brands";

interface LayoutProps {
    children: React.ReactNode;
    params: Promise<{ id: string, locale: string }>;
}

const Layout = async ({ children, params }: LayoutProps) => {
    const { id, locale } = await params;

    const brandPromise = fetchBrand({ id, locale });

    return (
        <BrandContext value={brandPromise}>
            {children}
        </BrandContext>
    )
}

export default Layout