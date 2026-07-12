import { Sidebar, SidebarContent, SidebarHeader, SidebarMenuItem } from "./ui/sidebar";
import { Link } from "@/lib/i18n/navigation";
import { Route } from "@/features/routing";
import { Tag, User2 } from "lucide-react";
import { getTranslations } from "next-intl/server";

export async function AppSidebar() {
  const tUsers = await getTranslations('Users.list');
  const tBrands = await getTranslations('Brands.list');
  const tCategories = await getTranslations('Categories.list');
  const tProducts = await getTranslations('Products.list');
  const tVariants = await getTranslations('Variants.list');
  const tAttributes = await getTranslations('Attributes.list');

  return (
    <Sidebar>
      <SidebarHeader>
        <Link href={Route.PRIVATE.DASHBOARD.PATHNAME} className="flex items-center gap-2">
          <h1 className="text-lg font-bold">Planuj sie</h1>
        </Link>
      </SidebarHeader>
      <SidebarContent>
        <SidebarMenuItem>
          <Link href={Route.PRIVATE.USERS.LIST.PATHNAME} className="flex transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted p-2">
            <User2 className="mr-2" /> {tUsers('title')}
          </Link>
          <Link href={Route.PRIVATE.BRANDS.LIST.PATHNAME} className="flex transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted p-2">
            <Tag className="mr-2" /> {tBrands('title')}
          </Link>
          <Link href={Route.PRIVATE.CATEGORIES.LIST.PATHNAME} className="flex transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted p-2">
            <Tag className="mr-2" /> {tCategories('title')}
          </Link>
          <Link href={Route.PRIVATE.PRODUCTS.LIST.PATHNAME} className="flex transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted p-2">
            <Tag className="mr-2" /> {tProducts('title')}
          </Link>
          <Link href={Route.PRIVATE.VARIANTS.LIST.PATHNAME} className="flex transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted p-2">
            <Tag className="mr-2" /> {tVariants('title')}
          </Link>
          <Link href={Route.PRIVATE.ATTRIBUTES.LIST.PATHNAME} className="flex transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted p-2">
            <Tag className="mr-2" /> {tAttributes('title')}
          </Link>
        </SidebarMenuItem>
      </SidebarContent>
    </Sidebar>
  )
}