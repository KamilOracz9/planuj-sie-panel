import { fetchPricesByModel } from "@/app/actions/price";
import { AttributeOptionContext, fetchAttributeOption } from "@/features/attributes";

interface LayoutProps {
    children: React.ReactNode;
    params: Promise<{ id: string, locale: string }>;
}

const Layout = async ({ children, params }: LayoutProps) => {
    const { id, locale } = await params;

    const optionPromise = fetchAttributeOption({ locale, id: Number(id) });
    const existingPricesPromise = fetchPricesByModel({ locale, modelId: Number(id), modelType: 'attribute-option' });

    return (
        <AttributeOptionContext value={{ optionPromise, existingPricesPromise }}>
            {children}
        </AttributeOptionContext>
    )
}

export default Layout
