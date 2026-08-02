"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { fetchModelMedia, uploadModelMedia, deleteModelMedia, attachModelMedia } from "@/app/actions/media";
import { GalleryModelMedia, IconModelMedia, LogoModelMedia, MediaModelType } from "../types";
import SingleImageField from "./single-image-field";
import GalleryField from "./gallery-field";

interface EntityMediaManagerProps {
    modelType: MediaModelType;
    id?: number;
    shape: "icon" | "logo" | "gallery";
    disabled?: boolean;
}

const buildFormData = (collection: string, files: File[]) => {
    const formData = new FormData();
    formData.append("collection", collection);
    files.forEach((file) => formData.append("files[]", file));
    return formData;
};

const EntityMediaManager = ({ modelType, id, shape, disabled }: EntityMediaManagerProps) => {
    const tShared = useTranslations("Shared");

    const [data, setData] = useState<IconModelMedia | LogoModelMedia | GalleryModelMedia | null>(null);
    const [loading, setLoading] = useState(true);
    const [busyCollection, setBusyCollection] = useState<string | null>(null);

    const load = () => {
        if (!id) {
            return;
        }

        setLoading(true);
        fetchModelMedia<IconModelMedia | LogoModelMedia | GalleryModelMedia>(modelType, id)
            .then(setData)
            .finally(() => setLoading(false));
    };

    useEffect(() => {
        load();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [modelType, id]);

    if (!id) {
        return <p className="text-sm text-muted-foreground">{tShared("media.save-hint")}</p>;
    }

    if (loading || !data) {
        return <p className="text-sm text-muted-foreground">{tShared("media.loading")}</p>;
    }

    const handleUploadSingle = (collection: string, file: File) => {
        setBusyCollection(collection);
        uploadModelMedia(modelType, id, buildFormData(collection, [file]))
            .then(load)
            .finally(() => setBusyCollection(null));
    };

    const handleUploadMultiple = (collection: string, files: File[]) => {
        setBusyCollection(collection);
        uploadModelMedia(modelType, id, buildFormData(collection, files))
            .then(load)
            .finally(() => setBusyCollection(null));
    };

    const handleDelete = (mediaId: number) => {
        deleteModelMedia(modelType, id, mediaId).then(load);
    };

    const handleAttach = (collection: string, mediaId: number) => {
        setBusyCollection(collection);
        attachModelMedia(modelType, id, collection, mediaId)
            .then(load)
            .finally(() => setBusyCollection(null));
    };

    if (shape === "icon") {
        const { icon } = data as IconModelMedia;

        return (
            <SingleImageField
                label={tShared("media.icon")}
                media={icon}
                disabled={disabled}
                uploading={busyCollection === "icon"}
                onUpload={(file) => handleUploadSingle("icon", file)}
                onDelete={() => icon && handleDelete(icon.id)}
                onSelectFromGallery={(mediaId) => handleAttach("icon", mediaId)}
            />
        );
    }

    if (shape === "logo") {
        const { logo } = data as LogoModelMedia;

        return (
            <SingleImageField
                label={tShared("media.logo")}
                media={logo}
                disabled={disabled}
                uploading={busyCollection === "logo"}
                onUpload={(file) => handleUploadSingle("logo", file)}
                onDelete={() => logo && handleDelete(logo.id)}
                onSelectFromGallery={(mediaId) => handleAttach("logo", mediaId)}
            />
        );
    }

    const { gallery, main_image, main_image_2 } = data as GalleryModelMedia;

    return (
        <div className="space-y-6">
            <div className="flex flex-wrap gap-6">
                <SingleImageField
                    label={tShared("media.main-image")}
                    media={main_image}
                    disabled={disabled}
                    uploading={busyCollection === "main_image"}
                    onUpload={(file) => handleUploadSingle("main_image", file)}
                    onDelete={() => main_image && handleDelete(main_image.id)}
                    onSelectFromGallery={(mediaId) => handleAttach("main_image", mediaId)}
                />
                <SingleImageField
                    label={tShared("media.main-image-2")}
                    media={main_image_2}
                    disabled={disabled}
                    uploading={busyCollection === "main_image_2"}
                    onUpload={(file) => handleUploadSingle("main_image_2", file)}
                    onDelete={() => main_image_2 && handleDelete(main_image_2.id)}
                    onSelectFromGallery={(mediaId) => handleAttach("main_image_2", mediaId)}
                />
            </div>

            <GalleryField
                label={tShared("media.gallery")}
                media={gallery}
                disabled={disabled}
                uploading={busyCollection === "gallery"}
                onUpload={(files) => handleUploadMultiple("gallery", files)}
                onDelete={handleDelete}
                onSelectFromGallery={(mediaId) => handleAttach("gallery", mediaId)}
            />
        </div>
    );
};

export default EntityMediaManager;
