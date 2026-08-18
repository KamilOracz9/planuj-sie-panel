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
  SidebarRail,
} from "./ui/sidebar";
import { Link, usePathname } from "@/lib/i18n/navigation";
import { Route } from "@/features/routing";
import { Bookmark, Boxes, Coins, FileText, FolderTree, FolderCog, Images, Layers, ListTree, Package, Radio, SlidersHorizontal, Store, Tag, Users } from "lucide-react";
import { useTranslations } from "next-intl";
import { SidebarFolderTree } from "@/features/media";
import { ChannelSwitcher } from "@/features/channels";

const catalogItems = [
  { pathname: Route.PRIVATE.BRANDS.LIST.PATHNAME, translationKey: "Brands.list.title", icon: Tag, folderType: undefined },
  { pathname: Route.PRIVATE.SERIES.LIST.PATHNAME, translationKey: "Series.list.title", icon: Boxes, folderType: undefined },
  { pathname: Route.PRIVATE.CATEGORIES.LIST.PATHNAME, translationKey: "Categories.list.title", icon: FolderTree, folderType: undefined },
  { pathname: Route.PRIVATE.COLLECTIONS.LIST.PATHNAME, translationKey: "Collections.list.title", icon: Bookmark, folderType: undefined },
  { pathname: Route.PRIVATE.PRODUCTS.LIST.PATHNAME, translationKey: "Products.list.title", icon: Package, folderType: undefined },
  { pathname: Route.PRIVATE.VARIANTS.LIST.PATHNAME, translationKey: "Variants.list.title", icon: Layers, folderType: undefined },
  { pathname: Route.PRIVATE.ATTRIBUTES.LIST.PATHNAME, translationKey: "Attributes.list.title", icon: SlidersHorizontal, folderType: undefined },
  { pathname: Route.PRIVATE.ATTRIBUTE_OPTIONS.LIST.PATHNAME, translationKey: "AttributeOptions.list.title", icon: ListTree, folderType: undefined },
  { pathname: Route.PRIVATE.MEDIA.LIST.PATHNAME, translationKey: "Shared.nav.media", icon: Images, folderType: "images" as const },
  { pathname: Route.PRIVATE.DOCUMENTS.LIST.PATHNAME, translationKey: "Shared.nav.documents", icon: FileText, folderType: "documents" as const },
] as const;

const systemItems = [
  { pathname: Route.PRIVATE.USERS.LIST.PATHNAME, translationKey: "Users.list.title", icon: Users },
  { pathname: Route.PRIVATE.CHANNELS.LIST.PATHNAME, translationKey: "Channels.list.title", icon: Radio },
  { pathname: Route.PRIVATE.CURRENCIES.LIST.PATHNAME, translationKey: "Currencies.list.title", icon: Coins },
  { pathname: Route.PRIVATE.MEDIA_COLLECTIONS.LIST.PATHNAME, translationKey: "MediaCollections.list.title", icon: FolderCog },
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
        <div className="px-2 pb-1.5">
          <ChannelSwitcher />
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>{t("Shared.nav.catalog")}</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {catalogItems.map(({ pathname: itemPathname, translationKey, icon: Icon, folderType }) => (
                <SidebarMenuItem key={itemPathname}>
                  <SidebarMenuButton asChild isActive={isActive(itemPathname)}>
                    <Link href={itemPathname}>
                      <Icon />
                      <span>{t(translationKey)}</span>
                    </Link>
                  </SidebarMenuButton>
                  {folderType && isActive(itemPathname) && (
                    <SidebarFolderTree type={folderType} pathname={itemPathname} />
                  )}
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
      <SidebarRail />
    </Sidebar>
  )
}
