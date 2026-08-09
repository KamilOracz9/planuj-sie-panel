"use client";

import { useRef, useState } from "react";
import { useTranslations } from "next-intl";
import { Loader2, Plus, X } from "lucide-react";
import { Button } from "@/features/shared/components/ui/button";
import { FieldLabel } from "@/features/shared/components/ui/field";
import { cn } from "@/lib/utils";
import { MediaItem } from "../types";
import MediaThumb from "./media-thumb";
import GalleryPicker from "./gallery-picker";

interface GalleryFieldProps {
    label: string;
    media: MediaItem[];
    disabled?: boolean;
    uploading?: boolean;
    onUpload: (files: File[]) => void;
    onDelete: (id: number) => void;
    onSelectFromGallery: (mediaId: MediaItem["id"]) => void;
}

const GalleryField = ({ label, media, disabled, uploading, onUpload, onDelete, onSelectFromGallery }: GalleryFieldProps) => {
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

        const files = Array.from(e.dataTransfer.files).filter((f) => f.type.startsWith("image/"));
        if (files.length) {
            onUpload(files);
        }
    };

    return (
        <div className="grid gap-2">
            <FieldLabel>{label}</FieldLabel>

            <div
                data-testid="gallery-field-dropzone"
                onDragOver={(e) => {
                    if (disabled) return;
                    e.preventDefault();
                    setIsDragOver(true);
                }}
                onDragLeave={() => setIsDragOver(false)}
                onDrop={disabled ? undefined : handleDrop}
                className={cn(
                    "flex flex-wrap gap-3 rounded-md transition-colors mb-2",
                    isDragOver && "bg-primary/5 outline-2 outline-dashed outline-primary"
                )}
            >
                {media.map((item) => (
                    <div key={item.id} className="relative h-28 w-28">
                        <MediaThumb media={item} />
                        {!disabled && (
                            <Button
                                type="button"
                                variant="destructive"
                                size="icon-xs"
                                className="absolute -top-2 -right-2 rounded-full"
                                onClick={() => onDelete(item.id)}
                            >
                                <X className="h-3 w-3" />
                            </Button>
                        )}
                    </div>
                ))}

                {!disabled && (
                    <button
                        type="button"
                        disabled={uploading}
                        onClick={() => inputRef.current?.click()}
                        className="flex size-55 items-center justify-center rounded-md border border-dashed bg-muted/30 text-muted-foreground hover:bg-muted/50"
                    >
                        {uploading ? <Loader2 className="h-5 w-5 animate-spin" /> : <Plus className="h-6 w-6" />}
                    </button>
                )}
            </div>

            {!media.length && disabled && (
                <p className="text-sm text-muted-foreground">{tShared("messages.no-items-found")}</p>
            )}

            {!disabled && <GalleryPicker onSelect={onSelectFromGallery} />}

            <input ref={inputRef} type="file" accept="image/jpeg,image/png,image/webp" multiple className="hidden" onChange={handleChange} />
        </div>
    );
};

export default GalleryField;
