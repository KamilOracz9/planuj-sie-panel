import { CurrencyContext, fetchCurrency } from "@/features/currencies";

interface LayoutProps {
    children: React.ReactNode;
    params: Promise<{ id: string, locale: string }>;
}

const Layout = async ({ children, params }: LayoutProps) => {
    const { id, locale } = await params;

    const currencyPromise = fetchCurrency({ id, locale });

    return (
        <CurrencyContext value={{ currencyPromise }}>
            {children}
        </CurrencyContext>
    )
}

export default Layout
