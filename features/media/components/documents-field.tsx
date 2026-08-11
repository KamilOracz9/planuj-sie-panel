"use client";

import { useRef, useState } from "react";
import { useTranslations } from "next-intl";
import { Loader2, Plus, Trash } from "lucide-react";
import { Button } from "@/features/shared/components/ui/button";
import { FieldLabel } from "@/features/shared/components/ui/field";
import { cn } from "@/lib/utils";
import { MediaItem } from "../types";
import DocumentRow from "./document-row";
import DocumentPicker from "./document-picker";

interface DocumentsFieldProps {
    label: string;
    documents: MediaItem[];
    disabled?: boolean;
    uploading?: boolean;
    onUpload: (files: File[]) => void;
    onDelete: (id: number) => void;
    onSelectFromLibrary: (mediaId: MediaItem["id"]) => void;
}

const DocumentsField = ({ label, documents, disabled, uploading, onUpload, onDelete, onSelectFromLibrary }: DocumentsFieldProps) => {
    const tShared = useTranslations("Shared");
    const inputRef = useRef<HTMLInputElement>(null);
    const [isDragOver, setIsDragOver] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = Array.from(e.target.files ?? []);
        if (files.length) {
            onUpload(files);
        }
        e.target.value = "";
    };

    const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        setIsDragOver(false);

        const files = Array.from(e.dataTransfer.files);
        if (files.length) {
            onUpload(files);
        }
    };

    return (
        <div className="grid gap-2 w-max">
            <FieldLabel>{label}</FieldLabel>

            <div
                data-testid="documents-dropzone"
                onDragOver={(e) => {
                    if (disabled) return;
                    e.preventDefault();
                    setIsDragOver(true);
                }}
                onDragLeave={() => setIsDragOver(false)}
                onDrop={disabled ? undefined : handleDrop}
                className={cn(
                    "grid gap-2 rounded-md p-2 -m-2 transition-colors",
                    isDragOver && "bg-primary/5 outline-2 outline-dashed outline-primary"
                )}
            >
                {documents.map((document) => (
                    <DocumentRow
                        key={document.id}
                        document={document}
                        action={
                            !disabled && (
                                <Button type="button" variant="ghost" size="icon-xs" onClick={() => onDelete(document.id)}>
                                    <Trash className="h-4 w-4" />
                                </Button>
                            )
                        }
                    />
                ))}

                {!documents.length && (
                    <p className="text-sm text-muted-foreground">{tShared("messages.no-items-found")}</p>
                )}
            </div>

            {!disabled && (
                <div className="flex flex-wrap gap-2">
                    <Button type="button" variant="outline" size="sm" disabled={uploading} onClick={() => inputRef.current?.click()}>
                        {uploading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Plus className="h-4 w-4" />}
                        {tShared("documents.upload")}
                    </Button>
                    <DocumentPicker onSelect={onSelectFromLibrary} />
                    <input
                        ref={inputRef}
                        data-testid="documents-file-input"
                        type="file"
                        accept=".pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx,.txt,.csv"
                        multiple
                        className="hidden"
                        onChange={handleChange}
                    />
                </div>
            )}
        </div>
    );
};

export default DocumentsField;
