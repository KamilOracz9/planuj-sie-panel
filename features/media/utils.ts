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
