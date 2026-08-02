"use client";

import { useEffect, useRef, useState } from "react";
import { useTranslations } from "next-intl";
import { Loader2, Plus, Trash } from "lucide-react";
import { Button } from "@/features/shared/components/ui/button";
import { deleteGalleryMedia, moveGalleryMedia, uploadGalleryMedia } from "@/app/actions/media";
import { cn } from "@/lib/utils";
import { DND_MEDIA_TYPE, MediaFolder, MediaItem } from "../types";
import MediaThumb from "./media-thumb";
import FolderSelect from "./folder-select";

interface GalleryGridProps {
    initialMedia: MediaItem[];
    folders: MediaFolder[];
    activeFolderId: number | null;
}

const GalleryGrid = ({ initialMedia, folders, activeFolderId }: GalleryGridProps) => {
    const tShared = useTranslations("Shared");
    const [media, setMedia] = useState(initialMedia);
    const [uploading, setUploading] = useState(false);
    const [isDragOver, setIsDragOver] = useState(false);
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        const onMoved = (e: Event) => {
            const { mediaId } = (e as CustomEvent<{ mediaId: number }>).detail;
            setMedia((prev) => prev.filter((item) => item.id !== mediaId));
        };
        window.addEventListener("media-folder-moved", onMoved);
        return () => window.removeEventListener("media-folder-moved", onMoved);
    }, []);

    const uploadFiles = (files: File[]) => {
        if (!files.length) {
            return;
        }

        setUploading(true);

        const formData = new FormData();
        files.forEach((file) => formData.append("files[]", file));
        if (activeFolderId) {
            formData.append("folder_id", String(activeFolderId));
        }

        uploadGalleryMedia(formData)
            .then((created) => setMedia((prev) => [...created, ...prev]))
            .finally(() => setUploading(false));
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        uploadFiles(Array.from(e.target.files ?? []));
        e.target.value = "";
    };

    const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        setIsDragOver(false);
        uploadFiles(Array.from(e.dataTransfer.files).filter((f) => f.type.startsWith("image/")));
    };

    const handleDelete = (id: number) => {
        deleteGalleryMedia(id).then(() => setMedia((prev) => prev.filter((item) => item.id !== id)));
    };

    const handleMove = (id: number, folderId: number | null) => {
        moveGalleryMedia(id, folderId).then(() => setMedia((prev) => prev.filter((item) => item.id !== id)));
    };

    return (
        <div
            data-testid="gallery-dropzone"
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
                    {tShared("media.upload")}
                </Button>
                <span className="text-sm text-muted-foreground">{tShared("media.drop-hint")}</span>
                <input
                    ref={inputRef}
                    type="file"
                    accept="image/jpeg,image/png,image/webp"
                    multiple
                    className="hidden"
                    onChange={handleChange}
                />
            </div>

            {!media.length ? (
                <p className="text-sm text-muted-foreground">{tShared("messages.no-items-found")}</p>
            ) : (
                <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
                    {media.map((item) => (
                        <div
                            key={item.id}
                            className="relative aspect-square cursor-grab active:cursor-grabbing"
                            draggable
                            onDragStart={(e) => {
                                e.dataTransfer.setData(DND_MEDIA_TYPE, String(item.id));
                                e.dataTransfer.effectAllowed = "move";
                            }}
                        >
                            <MediaThumb media={item} />
                            <Button
                                type="button"
                                variant="destructive"
                                size="icon-xs"
                                className="absolute top-1 right-1 rounded-full"
                                onClick={() => handleDelete(item.id)}
                            >
                                <Trash className="h-3 w-3" />
                            </Button>
                            <FolderSelect
                                folders={folders}
                                value={item.folder_id}
                                onChange={(folderId) => handleMove(item.id, folderId)}
                                className="absolute bottom-1 left-1 right-1 h-6 w-[calc(100%-0.5rem)] truncate rounded border border-input bg-background/90 px-1 text-[11px]"
                            />
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default GalleryGrid;
