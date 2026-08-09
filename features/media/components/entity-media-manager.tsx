"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import {
    fetchModelMedia,
    uploadModelMedia,
    deleteModelMedia,
    attachModelMedia,
    fetchMediaCollectionAssignments,
} from "@/app/actions/media";
import { MediaCollectionAssignmentsByChannel, MediaModelType, ModelMediaByCollection } from "../types";
import { useAppSelector } from "@/lib/redux/hooks";
import SingleImageField from "./single-image-field";
import GalleryField from "./gallery-field";
import DocumentsField from "./documents-field";
import { Button } from "@/features/shared/components/ui/button";

interface EntityMediaManagerProps {
    modelType: MediaModelType;
    id?: number;
    disabled?: boolean;
}

const buildFormData = (collection: string, channelId: number, files: File[]) => {
    const formData = new FormData();
    formData.append("collection", collection);
    formData.append("channel_id", String(channelId));
    files.forEach((file) => formData.append("files[]", file));
    return formData;
};

// Which collections are offered is no longer decided per model instance
// (no more attach/detach step here) - it's configured centrally, per
// (channel, model type), on MediaCollection's own edit page ("Przypisania"
// tab). This component just: picks one channel at a time (a single selector
// for the whole tab, not per-collection tabs), shows whichever collections
// are assigned to this model type in that channel, and lets the admin
// upload into them - still scoped to an explicit channel (no fallback).
const EntityMediaManager = ({ modelType, id, disabled }: EntityMediaManagerProps) => {
    const tShared = useTranslations("Shared");
    const { channelsSelect } = useAppSelector(state => state.channel);

    const [assignmentsByChannel, setAssignmentsByChannel] = useState<MediaCollectionAssignmentsByChannel | null>(null);
    const [mediaByCollection, setMediaByCollection] = useState<ModelMediaByCollection | null>(null);
    const [loading, setLoading] = useState(true);
    const [busyCode, setBusyCode] = useState<string | null>(null);
    const [activeChannel, setActiveChannel] = useState<number | null>(null);

    const load = () => {
        if (!id) {
            return;
        }

        setLoading(true);
        Promise.all([
            fetchMediaCollectionAssignments(modelType),
            fetchModelMedia(modelType, id),
        ])
            .then(([assignmentsRes, mediaRes]) => {
                setAssignmentsByChannel(assignmentsRes);
                setMediaByCollection(mediaRes);
                setActiveChannel((current) => current ?? channelsSelect[0]?.id ?? null);
            })
            .finally(() => setLoading(false));
    };

    useEffect(() => {
        load();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [modelType, id]);

    if (!id) {
        return <p className="text-sm text-muted-foreground">{tShared("media.save-hint")}</p>;
    }

    if (loading || !assignmentsByChannel || !mediaByCollection || activeChannel === null) {
        return <p className="text-sm text-muted-foreground">{tShared("media.loading")}</p>;
    }

    const collectionsForActiveChannel = assignmentsByChannel[String(activeChannel)] ?? [];

    const handleUpload = (code: string, files: File[]) => {
        setBusyCode(code);
        uploadModelMedia(modelType, id, buildFormData(code, activeChannel, files))
            .then(load)
            .finally(() => setBusyCode(null));
    };

    const handleDelete = (mediaId: number) => {
        deleteModelMedia(modelType, id, mediaId).then(load);
    };

    const handleAttachFile = (code: string, mediaId: number) => {
        setBusyCode(code);
        attachModelMedia(modelType, id, code, mediaId, activeChannel)
            .then(load)
            .finally(() => setBusyCode(null));
    };

    return (
        <div className="space-y-6">
            {channelsSelect.length > 1 && (
                <div className="flex flex-wrap gap-1">
                    {channelsSelect.map((channel) => (
                        <Button
                            key={channel.id}
                            type="button"
                            size="sm"
                            variant={activeChannel === channel.id ? "default" : "outline"}
                            onClick={() => setActiveChannel(channel.id)}
                        >
                            {channel.name}
                        </Button>
                    ))}
                </div>
            )}

            {!collectionsForActiveChannel.length && (
                <p className="text-sm text-muted-foreground">{tShared("messages.no-items-found")}</p>
            )}

            {collectionsForActiveChannel.map((collection) => {
                const media = (mediaByCollection[collection.code] ?? []).filter((item) => item.channel_id === activeChannel);

                return (
                    <div key={collection.id} className="space-y-3 rounded-md border p-4">
                        {collection.kind === "document" ? (
                            <DocumentsField
                                label={collection.name}
                                documents={media}
                                disabled={disabled}
                                uploading={busyCode === collection.code}
                                onUpload={(files) => handleUpload(collection.code, files)}
                                onDelete={handleDelete}
                                onSelectFromLibrary={(mediaId) => handleAttachFile(collection.code, mediaId)}
                            />
                        ) : collection.type === "single" ? (
                            <SingleImageField
                                label={collection.name}
                                media={media[0] ?? null}
                                disabled={disabled}
                                uploading={busyCode === collection.code}
                                onUpload={(file) => handleUpload(collection.code, [file])}
                                onDelete={() => media[0] && handleDelete(media[0].id)}
                                onSelectFromGallery={(mediaId) => handleAttachFile(collection.code, mediaId)}
                            />
                        ) : (
                            <GalleryField
                                label={collection.name}
                                media={media}
                                disabled={disabled}
                                uploading={busyCode === collection.code}
                                onUpload={(files) => handleUpload(collection.code, files)}
                                onDelete={handleDelete}
                                onSelectFromGallery={(mediaId) => handleAttachFile(collection.code, mediaId)}
                            />
                        )}
                    </div>
                );
            })}
        </div>
    );
};

export default EntityMediaManager;
