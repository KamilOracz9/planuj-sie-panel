import { ProductContext, fetchProduct } from "@/features/products";

interface LayoutProps {
    children: React.ReactNode;
    params: Promise<{ id: string, locale: string }>;
}

const Layout = async ({ children, params }: LayoutProps) => {
    const { id, locale } = await params;

    const productPromise = fetchProduct({ id, locale });

    return (
        <ProductContext value={productPromise}>
            {children}
        </ProductContext>
    )
}

export default Layout