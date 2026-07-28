import { fetchAttributeValuesByModel } from "@/app/actions/attribute";
import { ProductContext, fetchProduct } from "@/features/products";

interface LayoutProps {
    children: React.ReactNode;
    params: Promise<{ id: string, locale: string }>;
}

const Layout = async ({ children, params }: LayoutProps) => {
    const { id, locale } = await params;

    const productPromise = fetchProduct({ id, locale });
    const existingAttributesPromise = fetchAttributeValuesByModel({ locale, modelId: Number(id), modelType: 'product' });

    return (
        <ProductContext value={{ productPromise, existingAttributesPromise }}>
            {children}
        </ProductContext>
    )
}

export default Layout