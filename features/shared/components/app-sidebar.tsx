import { Sidebar, SidebarContent, SidebarHeader, SidebarMenuItem } from "./ui/sidebar";
import Link from "next/link";
import { Pathnames } from "@/features/routing";
import { User2 } from "lucide-react";
import { headers } from "next/headers";
import { routing } from "@/lib/i18n/routing";
import { getLocale } from "next-intl/server";

export async function AppSidebar() {
  const headerList = await headers();
  const locale = await getLocale();
  const pathname = headerList.get("x-current-path");

  return (
    <Sidebar>
      <SidebarHeader>
        <Link href={Pathnames.DASHBOARD}>
          <h1 className="text-lg font-bold">Planuj sie</h1>
        </Link>
      </SidebarHeader>
      <SidebarContent>
        <SidebarMenuItem>
          <Link href={Pathnames.USERS} className="flex transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted p-2">
            <User2 className="mr-2" /> users
          </Link>
        </SidebarMenuItem>
      </SidebarContent>
    </Sidebar>
  )
}