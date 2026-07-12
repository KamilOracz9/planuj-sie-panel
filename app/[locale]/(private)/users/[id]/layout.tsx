import { fetchUser, UserContext } from "@/features/users";

interface LayoutProps {
    children: React.ReactNode;
    params: Promise<{ id: string, locale: string }>;
}

const Layout = async ({ children, params }: LayoutProps) => {
    const { id, locale } = await params;

    const userPromise = fetchUser({ id, locale });

    return (
        <UserContext value={userPromise}>
            {children}
        </UserContext>
    )
}

export default Layout