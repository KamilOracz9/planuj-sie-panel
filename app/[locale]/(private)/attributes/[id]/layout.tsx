import { AttributeContext } from "@/features/attributes";
import { fetchAttribute } from "@/features/attributes/api";

interface LayoutProps {
    children: React.ReactNode;
    params: Promise<{ id: string, locale: string }>;
}

const Layout = async ({ children, params }: LayoutProps) => {
    const { id, locale } = await params;

    const attributePromise = fetchAttribute({ id, locale });

    return (
        <AttributeContext value={attributePromise}>
            {children}
        </AttributeContext>
    )
}

export default Layout