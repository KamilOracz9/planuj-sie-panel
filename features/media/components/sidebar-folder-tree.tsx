"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { useSearchParams } from "next/navigation";
import { Folder, FolderOpen, Plus, Trash } from "lucide-react";
import { Link, useRouter } from "@/lib/i18n/navigation";
import { Route } from "@/features/routing";
import {
    SidebarMenuSub,
    SidebarMenuSubButton,
    SidebarMenuSubItem,
} from "@/features/shared/components/ui/sidebar";
import { Input } from "@/features/shared/components/ui/input";
import { cn } from "@/lib/utils";
import {
    fetchMediaFolders,
    createMediaFolder,
    deleteMediaFolder,
    updateMediaFolder,
    moveGalleryMedia,
    moveDocumentLibrary,
} from "@/app/actions/media";
import { DND_FOLDER_TYPE, DND_MEDIA_TYPE, MediaFolder, MediaFolderType } from "../types";
import { getDescendantFolderIds } from "../utils";

interface SidebarFolderTreeProps {
    type: MediaFolderType;
    pathname: typeof Route.PRIVATE.MEDIA.LIST.PATHNAME | typeof Route.PRIVATE.DOCUMENTS.LIST.PATHNAME;
}

const SidebarFolderTree = ({ type, pathname }: SidebarFolderTreeProps) => {
    const tShared = useTranslations("Shared");
    const router = useRouter();
    const searchParams = useSearchParams();
    const activeFolderId = searchParams.get("folder") ? Number(searchParams.get("folder")) : null;

    const [folders, setFolders] = useState<MediaFolder[] | null>(null);
    const [creatingParentId, setCreatingParentId] = useState<number | null>();
    const [newName, setNewName] = useState("");
    const [draggingFolderId, setDraggingFolderId] = useState<number | null>(null);
    const [dropTarget, setDropTarget] = useState<number | "root" | null>(null);

    useEffect(() => {
        fetchMediaFolders(type).then(setFolders);
    }, [type]);

    const moveMedia = type === "images" ? moveGalleryMedia : moveDocumentLibrary;

    const startCreate = (parentId: number | null) => {
        setCreatingParentId(parentId);
        setNewName("");
    };

    const cancelCreate = () => {
        setCreatingParentId(undefined);
        setNewName("");
    };

    const handleCreate = () => {
        const name = newName.trim();
        if (!name) {
            cancelCreate();
            return;
        }

        createMediaFolder(type, name, creatingParentId ?? null).then((folder) => {
            setFolders((prev) => [...(prev ?? []), folder]);
            cancelCreate();
            router.refresh();
        });
    };

    const handleDeleteFolder = (e: React.MouseEvent, folderId: number) => {
        e.preventDefault();
        e.stopPropagation();

        deleteMediaFolder(type, folderId).then(() => {
            setFolders((prev) => {
                if (!prev) return prev;
                const deleted = prev.find((f) => f.id === folderId);
                const parentId = deleted?.parent_id ?? null;
                return prev
                    .filter((f) => f.id !== folderId)
                    .map((f) => (f.parent_id === folderId ? { ...f, parent_id: parentId } : f));
            });

            if (activeFolderId === folderId) {
                router.push(pathname);
            }
            router.refresh();
        });
    };

    const canDropOn = (targetId: number | null): boolean => {
        if (draggingFolderId === null) {
            return true;
        }
        if (targetId === null) {
            return true;
        }
        if (targetId === draggingFolderId) {
            return false;
        }
        if (!folders) {
            return false;
        }
        return !getDescendantFolderIds(folders, draggingFolderId).has(targetId);
    };

    const handleDrop = (e: React.DragEvent, targetId: number | null) => {
        e.preventDefault();
        e.stopPropagation();
        setDropTarget(null);

        const folderId = e.dataTransfer.getData(DND_FOLDER_TYPE);
        const mediaId = e.dataTransfer.getData(DND_MEDIA_TYPE);

        if (folderId) {
            const draggedId = Number(folderId);
            if (!canDropOn(targetId) || draggedId === targetId) {
                return;
            }
            updateMediaFolder(type, draggedId, targetId).then((folder) => {
                if (!folder?.id) return;
                setFolders((prev) => prev?.map((f) => (f.id === draggedId ? { ...f, parent_id: folder.parent_id } : f)) ?? prev);
                router.refresh();
            });
        } else if (mediaId) {
            moveMedia(Number(mediaId), targetId).then(() => {
                window.dispatchEvent(new CustomEvent("media-folder-moved", { detail: { mediaId: Number(mediaId) } }));
                router.refresh();
            });
        }
    };

    if (!folders) {
        return null;
    }

    const renderCreateInput = () => (
        <SidebarMenuSubItem>
            <Input
                autoFocus
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
                onKeyDown={(e) => {
                    if (e.key === "Enter") handleCreate();
                    if (e.key === "Escape") cancelCreate();
                }}
                placeholder={tShared("folders.name-placeholder")}
                className="h-7 text-xs"
            />
        </SidebarMenuSubItem>
    );

    const renderNodes = (parentId: number | null): React.ReactNode =>
        folders
            .filter((folder) => folder.parent_id === parentId)
            .map((folder) => {
                const hasChildren = creatingParentId === folder.id || folders.some((f) => f.parent_id === folder.id);

                return (
                <SidebarMenuSubItem key={folder.id}>
                    <SidebarMenuSubButton
                        asChild
                        isActive={activeFolderId === folder.id}
                        className={cn(dropTarget === folder.id && "bg-sidebar-accent ring-1 ring-sidebar-ring")}
                    >
                        <Link
                            href={{ pathname, query: { folder: String(folder.id) } }}
                            className="group/folder"
                            draggable
                            onDragStart={(e) => {
                                e.dataTransfer.setData(DND_FOLDER_TYPE, String(folder.id));
                                e.dataTransfer.effectAllowed = "move";
                                setDraggingFolderId(folder.id);
                            }}
                            onDragEnd={() => {
                                setDraggingFolderId(null);
                                setDropTarget(null);
                            }}
                            onDragOver={(e) => {
                                e.preventDefault();
                                if (canDropOn(folder.id)) {
                                    e.dataTransfer.dropEffect = "move";
                                    setDropTarget(folder.id);
                                } else {
                                    e.dataTransfer.dropEffect = "none";
                                }
                            }}
                            onDragLeave={() => setDropTarget((prev) => (prev === folder.id ? null : prev))}
                            onDrop={(e) => handleDrop(e, folder.id)}
                        >
                            <Folder className="h-3.5 w-3.5" />
                            <span className="min-w-0 flex-1 truncate">{folder.name}</span>
                            <span
                                data-testid={`sidebar-folder-add-${folder.id}`}
                                onClick={(e) => {
                                    e.preventDefault();
                                    e.stopPropagation();
                                    startCreate(folder.id);
                                }}
                                className="shrink-0 text-muted-foreground opacity-0 hover:text-foreground group-hover/folder:opacity-100"
                            >
                                <Plus className="h-3 w-3" />
                            </span>
                            <span
                                data-testid={`sidebar-folder-delete-${folder.id}`}
                                onClick={(e) => handleDeleteFolder(e, folder.id)}
                                className="shrink-0 text-muted-foreground opacity-0 hover:text-destructive group-hover/folder:opacity-100"
                            >
                                <Trash className="h-3 w-3" />
                            </span>
                        </Link>
                    </SidebarMenuSubButton>
                    {hasChildren && (
                        <SidebarMenuSub className="ml-2 gap-1 border-l-2 border-sidebar-border py-1">
                            {creatingParentId === folder.id && renderCreateInput()}
                            {renderNodes(folder.id)}
                        </SidebarMenuSub>
                    )}
                </SidebarMenuSubItem>
                );
            });

    return (
        <SidebarMenuSub>
            <SidebarMenuSubItem>
                <SidebarMenuSubButton
                    asChild
                    isActive={activeFolderId === null}
                    className={cn(dropTarget === "root" && "bg-sidebar-accent ring-1 ring-sidebar-ring")}
                >
                    <Link
                        href={pathname}
                        className="group/folder"
                        onDragOver={(e) => {
                            e.preventDefault();
                            if (canDropOn(null)) {
                                e.dataTransfer.dropEffect = "move";
                                setDropTarget("root");
                            }
                        }}
                        onDragLeave={() => setDropTarget((prev) => (prev === "root" ? null : prev))}
                        onDrop={(e) => handleDrop(e, null)}
                    >
                        <FolderOpen className="h-3.5 w-3.5" />
                        <span className="min-w-0 flex-1 truncate">{tShared("folders.all")}</span>
                        <span
                            data-testid="sidebar-folder-add-root"
                            onClick={(e) => {
                                e.preventDefault();
                                e.stopPropagation();
                                startCreate(null);
                            }}
                            className="shrink-0 text-muted-foreground opacity-0 hover:text-foreground group-hover/folder:opacity-100"
                        >
                            <Plus className="h-3 w-3" />
                        </span>
                    </Link>
                </SidebarMenuSubButton>
            </SidebarMenuSubItem>

            {creatingParentId === null && renderCreateInput()}

            {renderNodes(null)}
        </SidebarMenuSub>
    );
};

export default SidebarFolderTree;
