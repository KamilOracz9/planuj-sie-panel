"use client";

import { useRef, useState } from "react";
import { useTranslations } from "next-intl";
import { ImagePlus, Loader2, Trash } from "lucide-react";
import { Button } from "@/features/shared/components/ui/button";
import { FieldLabel } from "@/features/shared/components/ui/field";
import { cn } from "@/lib/utils";
import { MediaItem } from "../types";
import MediaThumb from "./media-thumb";
import GalleryPicker from "./gallery-picker";

interface SingleImageFieldProps {
    label: string;
    media: MediaItem | null;
    disabled?: boolean;
    uploading?: boolean;
    onUpload: (file: File) => void;
    onDelete: () => void;
    onSelectFromGallery: (mediaId: MediaItem["id"]) => void;
}

const SingleImageField = ({ label, media, disabled, uploading, onUpload, onDelete, onSelectFromGallery }: SingleImageFieldProps) => {
    const tShared = useTranslations("Shared");
    const inputRef = useRef<HTMLInputElement>(null);
    const [isDragOver, setIsDragOver] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            onUpload(file);
        }
        e.target.value = "";
    };

    const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        setIsDragOver(false);

        const file = Array.from(e.dataTransfer.files).find((f) => f.type.startsWith("image/"));
        if (file) {
            onUpload(file);
        }
    };

    return (
        <div className="grid gap-2 w-max">
            <FieldLabel>{label}</FieldLabel>

            <div
                data-testid="single-image-dropzone"
                onDragOver={(e) => {
                    if (disabled) return;
                    e.preventDefault();
                    setIsDragOver(true);
                }}
                onDragLeave={() => setIsDragOver(false)}
                onDrop={disabled ? undefined : handleDrop}
                className={cn(
                    "relative flex size-55 items-center justify-center overflow-hidden rounded-md border border-dashed bg-muted/30 transition-colors",
                    isDragOver && "border-primary bg-primary/5"
                )}
            >
                {uploading ? (
                    <Loader2 className="h-5 w-5 animate-spin text-muted-foreground" />
                ) : media ? (
                    <MediaThumb media={media} />
                ) : (
                    <ImagePlus className="h-6 w-6 text-muted-foreground" />
                )}
            </div>

            {!disabled && (
                <div className="flex flex-wrap gap-2">
                    <Button className="flex-1" type="button" variant="outline" size="sm" disabled={uploading} onClick={() => inputRef.current?.click()}>
                        {media ? tShared("media.replace") : tShared("media.upload")}
                    </Button>
                    <GalleryPicker onSelect={onSelectFromGallery} />
                    {media && (
                        <Button type="button"  variant="ghost" size="sm" disabled={uploading} onClick={onDelete}>
                            <Trash className="h-4 w-4" />
                        </Button>
                    )}
                    <input ref={inputRef} type="file" accept="image/jpeg,image/png,image/webp" className="hidden" onChange={handleChange} />
                </div>
            )}
        </div>
    );
};

export default SingleImageField;
