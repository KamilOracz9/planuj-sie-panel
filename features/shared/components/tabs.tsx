"use client";

import { slugify } from "@/lib/utils";
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

const Tabs = ({ tabs }: TabsProps) => {
    const { activeHash } = useTabs();

    return (
        <div className="flex gap-4 mb-4">
            {tabs.map((label) => {
                const hash = `#${slugify(label)}`;
                const isActive = activeHash === hash;
                return (
                    <a
                        key={label}
                        href={hash}
                        onClick={(e) => {
                            e.preventDefault();
                            window.location.hash = slugify(label);
                        }}
                        className={isActive ? "font-semibold underline" : ""}
                    >
                        {label}
                    </a>
                );
            })}
        </div>
    );
}

export default Tabs