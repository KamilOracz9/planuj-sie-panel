import { UserContext } from "@/features/users";
import { fetchUser } from "@/features/users/api";

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