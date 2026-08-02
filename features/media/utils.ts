import { MediaFolder } from "./types";

/**
 * All descendant ids of `folderId` (not including itself), used to block
 * dropping a folder onto itself or one of its own subfolders.
 */
export const getDescendantFolderIds = (folders: MediaFolder[], folderId: number): Set<number> => {
    const ids = new Set<number>();
    const queue = [folderId];

    while (queue.length) {
        const current = queue.shift();
        folders
            .filter((folder) => folder.parent_id === current)
            .forEach((folder) => {
                ids.add(folder.id);
                queue.push(folder.id);
            });
    }

    return ids;
};

export const formatFileSize = (bytes: number): string => {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
};

export type DocumentKind = "pdf" | "word" | "spreadsheet" | "presentation" | "other";

export const getDocumentKind = (mimeType: string): DocumentKind => {
    if (mimeType === "application/pdf") return "pdf";
    if (mimeType.includes("word")) return "word";
    if (mimeType.includes("sheet") || mimeType.includes("excel") || mimeType === "text/csv") return "spreadsheet";
    if (mimeType.includes("presentation") || mimeType.includes("powerpoint")) return "presentation";
    return "other";
};
