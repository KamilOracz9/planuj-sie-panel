"use client";

import { useRef, useState } from "react";
import { useTranslations } from "next-intl";
import { Loader2, Plus, Trash } from "lucide-react";
import { Button } from "@/features/shared/components/ui/button";
import { deleteDocumentLibrary, uploadDocumentLibrary } from "@/app/actions/media";
import { cn } from "@/lib/utils";
import { MediaItem } from "../types";
import DocumentRow from "./document-row";

interface DocumentLibraryProps {
    initialDocuments: MediaItem[];
}

const DocumentLibrary = ({ initialDocuments }: DocumentLibraryProps) => {
    const tShared = useTranslations("Shared");
    const [documents, setDocuments] = useState(initialDocuments);
    const [uploading, setUploading] = useState(false);
    const [isDragOver, setIsDragOver] = useState(false);
    const inputRef = useRef<HTMLInputElement>(null);

    const uploadFiles = (files: File[]) => {
        if (!files.length) {
            return;
        }

        setUploading(true);

        const formData = new FormData();
        files.forEach((file) => formData.append("files[]", file));

        uploadDocumentLibrary(formData)
            .then((created) => setDocuments((prev) => [...created, ...prev]))
            .finally(() => setUploading(false));
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        uploadFiles(Array.from(e.target.files ?? []));
        e.target.value = "";
    };

    const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        setIsDragOver(false);
        uploadFiles(Array.from(e.dataTransfer.files));
    };

    const handleDelete = (id: number) => {
        deleteDocumentLibrary(id).then(() => setDocuments((prev) => prev.filter((item) => item.id !== id)));
    };

    return (
        <div
            data-testid="document-library-dropzone"
            onDragOver={(e) => {
                e.preventDefault();
                setIsDragOver(true);
            }}
            onDragLeave={() => setIsDragOver(false)}
            onDrop={handleDrop}
            className={cn(
                "space-y-4 rounded-md p-2 -m-2 transition-colors",
                isDragOver && "bg-primary/5 outline-2 outline-dashed outline-primary"
            )}
        >
            <div className="flex items-center gap-3">
                <Button type="button" onClick={() => inputRef.current?.click()} disabled={uploading}>
                    {uploading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Plus className="h-4 w-4" />}
                    {tShared("documents.upload")}
                </Button>
                <span className="text-sm text-muted-foreground">{tShared("media.drop-hint")}</span>
                <input
                    ref={inputRef}
                    type="file"
                    accept=".pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx,.txt,.csv"
                    multiple
                    className="hidden"
                    onChange={handleChange}
                />
            </div>

            {!documents.length ? (
                <p className="text-sm text-muted-foreground">{tShared("messages.no-items-found")}</p>
            ) : (
                <div className="space-y-2">
                    {documents.map((document) => (
                        <DocumentRow
                            key={document.id}
                            document={document}
                            action={
                                <Button type="button" variant="ghost" size="icon-xs" onClick={() => handleDelete(document.id)}>
                                    <Trash className="h-4 w-4" />
                                </Button>
                            }
                        />
                    ))}
                </div>
            )}
        </div>
    );
};

export default DocumentLibrary;
