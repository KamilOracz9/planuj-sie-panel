import { MediaItem } from "../types";
import { formatFileSize } from "../utils";
import DocumentIcon from "./document-icon";

interface DocumentRowProps {
    document: MediaItem;
    action?: React.ReactNode;
}

const DocumentRow = ({ document, action }: DocumentRowProps) => {
    return (
        <div className="flex items-center gap-3 rounded-md border p-3">
            <DocumentIcon mimeType={document.mime_type} className="h-6 w-6 shrink-0 text-muted-foreground" />
            {/* <a
                href={document.url}
                target="_blank"
                rel="noreferrer"
                className="min-w-0 flex-1 truncate text-sm font-medium hover:underline"
            > */}
                {document.file_name}
            {/* </a> */}
            <span className="shrink-0 text-xs text-muted-foreground">{formatFileSize(document.size)}</span>
            {action}
        </div>
    );
};

export default DocumentRow;
