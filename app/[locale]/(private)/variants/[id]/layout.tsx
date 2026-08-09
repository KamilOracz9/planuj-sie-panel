import { fetchAttributeValuesByModel } from "@/app/actions/attribute";
import { fetchProductsListForSelect } from "@/app/actions/product";
import { fetchPricesByModel } from "@/app/actions/price";
import { fetchVariant, VariantContext } from "@/features/variants";

interface LayoutProps {
    children: React.ReactNode;
    params: Promise<{ id: string, locale: string }>;
}

const Layout = async ({ children, params }: LayoutProps) => {
    const { id, locale } = await params;

    const variantPromise = fetchVariant({ id, locale });
    const productsSelectPromise = fetchProductsListForSelect({ locale });
    const existingAttributesPromise = fetchAttributeValuesByModel({ locale, modelId: Number(id), modelType: 'variant' });
    const existingPricesPromise = fetchPricesByModel({ locale, modelId: Number(id), modelType: 'variant' });

    return (
        <VariantContext value={{ variantPromise, productsSelectPromise, existingAttributesPromise, existingPricesPromise }}>
            {children}
        </VariantContext>
    )
}

export default Layout