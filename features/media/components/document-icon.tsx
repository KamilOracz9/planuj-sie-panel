import { File, FileSpreadsheet, FileText, Presentation } from "lucide-react";
import { getDocumentKind } from "../utils";

interface DocumentIconProps {
    mimeType: string;
    className?: string;
}

const DocumentIcon = ({ mimeType, className }: DocumentIconProps) => {
    const kind = getDocumentKind(mimeType);

    if (kind === "pdf" || kind === "word") return <FileText className={className} />;
    if (kind === "spreadsheet") return <FileSpreadsheet className={className} />;
    if (kind === "presentation") return <Presentation className={className} />;
    return <File className={className} />;
};

export default DocumentIcon;
