import { CategoryContext, fetchCategoriesListForSelect, fetchCategory } from "@/features/categories";

interface LayoutProps {
    children: React.ReactNode;
    params: { id: number, locale: string };
}

const Layout = async ({ children, params }: LayoutProps) => {
    const { id, locale } = await params;

    const categoryPromise = fetchCategory({ id, locale });
    const categoriesSelectPromise = fetchCategoriesListForSelect({ locale });

    return (
        <CategoryContext value={{ categoryPromise, categoriesSelectPromise }}>
            {children}
        </CategoryContext>
    )
}

export default Layout