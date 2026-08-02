"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { fetchModelMedia, uploadModelMedia, deleteModelMedia, attachModelMedia } from "@/app/actions/media";
import { DocumentsModelMedia, MediaModelType } from "../types";
import DocumentsField from "./documents-field";

interface DocumentsManagerProps {
    modelType: MediaModelType;
    id?: number;
    disabled?: boolean;
}

const buildFormData = (files: File[]) => {
    const formData = new FormData();
    formData.append("collection", "documents");
    files.forEach((file) => formData.append("files[]", file));
    return formData;
};

const DocumentsManager = ({ modelType, id, disabled }: DocumentsManagerProps) => {
    const tShared = useTranslations("Shared");

    const [data, setData] = useState<DocumentsModelMedia | null>(null);
    const [loading, setLoading] = useState(true);
    const [uploading, setUploading] = useState(false);

    const load = () => {
        if (!id) {
            return;
        }

        setLoading(true);
        fetchModelMedia<DocumentsModelMedia>(modelType, id)
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

    const handleUpload = (files: File[]) => {
        setUploading(true);
        uploadModelMedia(modelType, id, buildFormData(files))
            .then(load)
            .finally(() => setUploading(false));
    };

    const handleDelete = (mediaId: number) => {
        deleteModelMedia(modelType, id, mediaId).then(load);
    };

    const handleAttach = (mediaId: number) => {
        setUploading(true);
        attachModelMedia(modelType, id, "documents", mediaId)
            .then(load)
            .finally(() => setUploading(false));
    };

    return (
        <DocumentsField
            label={tShared("documents.field-label")}
            documents={data.documents}
            disabled={disabled}
            uploading={uploading}
            onUpload={handleUpload}
            onDelete={handleDelete}
            onSelectFromLibrary={handleAttach}
        />
    );
};

export default DocumentsManager;
