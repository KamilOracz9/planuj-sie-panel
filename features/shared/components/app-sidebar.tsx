"use client";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "./ui/sidebar";
import { Link, usePathname } from "@/lib/i18n/navigation";
import { Route } from "@/features/routing";
import { FolderTree, Layers, Package, SlidersHorizontal, Store, Tag, Users } from "lucide-react";
import { useTranslations } from "next-intl";

const catalogItems = [
  { pathname: Route.PRIVATE.PRODUCTS.LIST.PATHNAME, translationKey: "Products.list.title", icon: Package },
  { pathname: Route.PRIVATE.VARIANTS.LIST.PATHNAME, translationKey: "Variants.list.title", icon: Layers },
  { pathname: Route.PRIVATE.CATEGORIES.LIST.PATHNAME, translationKey: "Categories.list.title", icon: FolderTree },
  { pathname: Route.PRIVATE.BRANDS.LIST.PATHNAME, translationKey: "Brands.list.title", icon: Tag },
  { pathname: Route.PRIVATE.ATTRIBUTES.LIST.PATHNAME, translationKey: "Attributes.list.title", icon: SlidersHorizontal },
] as const;

const systemItems = [
  { pathname: Route.PRIVATE.USERS.LIST.PATHNAME, translationKey: "Users.list.title", icon: Users },
] as const;

export function AppSidebar() {
  const t = useTranslations();
  const pathname = usePathname();

  const isActive = (pathname_: string) => pathname === pathname_ || pathname.startsWith(`${pathname_}/`);

  return (
    <Sidebar>
      <SidebarHeader>
        <Link href={Route.PRIVATE.DASHBOARD.PATHNAME} className="flex items-center gap-2 px-2 py-1.5">
          <Store className="size-5 shrink-0" />
          <h1 className="text-base font-semibold tracking-tight">Panel</h1>
        </Link>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>{t("Shared.nav.catalog")}</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {catalogItems.map(({ pathname: itemPathname, translationKey, icon: Icon }) => (
                <SidebarMenuItem key={itemPathname}>
                  <SidebarMenuButton asChild isActive={isActive(itemPathname)}>
                    <Link href={itemPathname}>
                      <Icon />
                      <span>{t(translationKey)}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel>{t("Shared.nav.system")}</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {systemItems.map(({ pathname: itemPathname, translationKey, icon: Icon }) => (
                <SidebarMenuItem key={itemPathname}>
                  <SidebarMenuButton asChild isActive={isActive(itemPathname)}>
                    <Link href={itemPathname}>
                      <Icon />
                      <span>{t(translationKey)}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}
