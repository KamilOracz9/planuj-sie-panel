"use client";

import { cn, slugify } from "@/lib/utils";
import { useEffect, useState } from "react";

interface TabsProps {
    tabs: string[];
}

export const useTabs = () => {
    const [activeHash, setActiveHash] = useState<string>("");

    useEffect(() => {
        setActiveHash(window.location.hash);

        const handleHashChange = () => setActiveHash(window.location.hash);
        window.addEventListener("hashchange", handleHashChange);
        return () => window.removeEventListener("hashchange", handleHashChange);
    }, []);

    return { activeHash, setActiveHash, normalizedActiveHash: activeHash.replace(/^#/, "") };
}

// When there's no URL hash yet (e.g. a fresh "create" page), fall back to the
// first tab instead of hiding every tab's content.
export const isTabActive = (normalizedActiveHash: string, label: string, tabs: string[]) => {
    if (!normalizedActiveHash) {
        return label === tabs[0];
    }

    return normalizedActiveHash === slugify(label);
}

const Tabs = ({ tabs }: TabsProps) => {
    const { normalizedActiveHash } = useTabs();

    return (
        <div className="mb-4 inline-flex items-center gap-1 rounded-lg bg-muted p-1">
            {tabs.map((label) => {
                const hash = `#${slugify(label)}`;
                const isActive = isTabActive(normalizedActiveHash, label, tabs);
                return (
                    <a
                        key={label}
                        href={hash}
                        onClick={(e) => {
                            e.preventDefault();
                            window.location.hash = slugify(label);
                        }}
                        className={cn(
                            "rounded-md px-3 py-1.5 text-sm font-medium transition-colors",
                            isActive
                                ? "bg-background text-foreground shadow-sm"
                                : "text-muted-foreground hover:text-foreground"
                        )}
                    >
                        {label}
                    </a>
                );
            })}
        </div>
    );
}

export default Tabs