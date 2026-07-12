import { fetchProductsListForSelect } from "@/app/actions/product";
import { fetchVariant, VariantContext } from "@/features/variants";

interface LayoutProps {
    children: React.ReactNode;
    params: { id: number, locale: string };
}

const Layout = async ({ children, params }: LayoutProps) => {
    const { id, locale } = await params;

    const variantPromise = fetchVariant({ id, locale });
    const productsSelectPromise = fetchProductsListForSelect({ locale });

    return (
        <VariantContext value={{ variantPromise, productsSelectPromise }}>
            {children}
        </VariantContext>
    )
}

export default Layout