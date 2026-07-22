import { fetchAttributeValuesByModel } from "@/app/actions/attribute";
import { CategoryContext, fetchCategoriesListForSelect, fetchCategory } from "@/features/categories";

interface LayoutProps {
    children: React.ReactNode;
    params: Promise<{ id: string, locale: string }>;
}

const Layout = async ({ children, params }: LayoutProps) => {
    const { id, locale } = await params;

    const categoryPromise = fetchCategory({ id, locale });
    const existingAttributesPromise = fetchAttributeValuesByModel({ locale, modelId: Number(id), modelType: 'category' });

    return (
        <CategoryContext value={{ categoryPromise, existingAttributesPromise }}>
            {children}
        </CategoryContext>
    )
}

export default Layout