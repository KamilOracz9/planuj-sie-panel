"use client";

import { useMemo } from "react";
import { useTranslations } from "next-intl";
import { MediaFolder } from "../types";

interface FolderSelectProps {
    folders: MediaFolder[];
    value: number | null;
    onChange: (folderId: number | null) => void;
    className?: string;
}

interface FlatOption {
    id: number;
    name: string;
    depth: number;
}

const flattenTree = (folders: MediaFolder[], parentId: number | null = null, depth = 0): FlatOption[] => {
    return folders
        .filter((folder) => folder.parent_id === parentId)
        .flatMap((folder) => [
            { id: folder.id, name: folder.name, depth },
            ...flattenTree(folders, folder.id, depth + 1),
        ]);
};

const FolderSelect = ({ folders, value, onChange, className }: FolderSelectProps) => {
    const tShared = useTranslations("Shared");
    const options = useMemo(() => flattenTree(folders), [folders]);

    return (
        <select
            value={value ?? ""}
            onClick={(e) => e.stopPropagation()}
            onChange={(e) => onChange(e.target.value ? Number(e.target.value) : null)}
            className={className ?? "h-7 rounded-md border border-input bg-background px-1.5 text-xs"}
        >
            <option value="">{tShared("folders.root")}</option>
            {options.map((option) => (
                <option key={option.id} value={option.id}>
                    {"—".repeat(option.depth)} {option.name}
                </option>
            ))}
        </select>
    );
};

export default FolderSelect;
