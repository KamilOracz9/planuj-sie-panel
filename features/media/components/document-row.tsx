import { cn } from "@/lib/utils";
import { MediaItem } from "../types";
import { formatFileSize } from "../utils";
import DocumentIcon from "./document-icon";

interface DocumentRowProps {
    document: MediaItem;
    action?: React.ReactNode;
    draggable?: boolean;
    onDragStart?: (e: React.DragEvent<HTMLDivElement>) => void;
}

const DocumentRow = ({ document, action, draggable, onDragStart }: DocumentRowProps) => {
    return (
        <div
            className={cn("flex items-center gap-3 rounded-md border p-3", draggable && "cursor-grab active:cursor-grabbing")}
            draggable={draggable}
            onDragStart={onDragStart}
        >
            <DocumentIcon mimeType={document.mime_type} className="h-6 w-6 shrink-0 text-muted-foreground" />
            <span className="min-w-0 flex-1 truncate text-sm font-medium">{document.file_name}</span>
            <span className="shrink-0 text-xs text-muted-foreground">{formatFileSize(document.size)}</span>
            {action}
        </div>
    );
};

export default DocumentRow;
