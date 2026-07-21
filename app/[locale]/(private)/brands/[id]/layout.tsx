import { fetchAttributeValuesByModel } from "@/app/actions/attribute";
import { BrandContext, fetchBrand } from "@/features/brands";

interface LayoutProps {
    children: React.ReactNode;
    params: Promise<{ id: string, locale: string }>;
}

const Layout = async ({ children, params }: LayoutProps) => {
    const { id, locale } = await params;

    const brandPromise = fetchBrand({ id, locale });
    const existingAttributesPromise = fetchAttributeValuesByModel({ locale, modelId: Number(id), modelType: 'brand' });

    return (
        <BrandContext value={{ brandPromise, existingAttributesPromise }}>
            {children}
        </BrandContext>
    )
}

export default Layout