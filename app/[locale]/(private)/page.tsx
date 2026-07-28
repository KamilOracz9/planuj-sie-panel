import { getTranslations } from "next-intl/server";
import { Link } from "@/lib/i18n/navigation";
import { Route } from "@/features/routing";
import { Card, CardHeader, CardTitle } from "@/features/shared/components/ui/card";
import { FolderTree, Layers, Package, SlidersHorizontal, Tag, Users } from "lucide-react";

const quickLinks = [
  { pathname: Route.PRIVATE.PRODUCTS.LIST.PATHNAME, translationKey: "Products.list.title", icon: Package },
  { pathname: Route.PRIVATE.VARIANTS.LIST.PATHNAME, translationKey: "Variants.list.title", icon: Layers },
  { pathname: Route.PRIVATE.CATEGORIES.LIST.PATHNAME, translationKey: "Categories.list.title", icon: FolderTree },
  { pathname: Route.PRIVATE.BRANDS.LIST.PATHNAME, translationKey: "Brands.list.title", icon: Tag },
  { pathname: Route.PRIVATE.ATTRIBUTES.LIST.PATHNAME, translationKey: "Attributes.list.title", icon: SlidersHorizontal },
  { pathname: Route.PRIVATE.USERS.LIST.PATHNAME, translationKey: "Users.list.title", icon: Users },
] as const;

export default async function Dashboard() {
  const t = await getTranslations();

  return (
    <div className="flex flex-1 flex-col gap-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">{t("Dashboard.title")}</h1>
        <p className="text-sm text-muted-foreground">{t("Dashboard.subtitle")}</p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {quickLinks.map(({ pathname, translationKey, icon: Icon }) => (
          <Link key={pathname} href={pathname}>
            <Card className="transition-colors hover:bg-muted/50">
              <CardHeader className="flex-row items-center gap-3 space-y-0">
                <Icon className="size-5 shrink-0 text-muted-foreground" />
                <CardTitle className="text-base font-medium">{t(translationKey)}</CardTitle>
              </CardHeader>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
