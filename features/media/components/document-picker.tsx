"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { Library } from "lucide-react";
import { Button } from "@/features/shared/components/ui/button";
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
} from "@/features/shared/components/ui/sheet";
import { fetchDocumentLibrary } from "@/app/actions/media";
import { MediaItem } from "../types";
import DocumentRow from "./document-row";

interface DocumentPickerProps {
    onSelect: (mediaId: MediaItem["id"]) => void;
}

const DocumentPicker = ({ onSelect }: DocumentPickerProps) => {
    const tShared = useTranslations("Shared");
    const [open, setOpen] = useState(false);
    const [documents, setDocuments] = useState<MediaItem[] | null>(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (!open || documents !== null) {
            return;
        }

        setLoading(true);
        fetchDocumentLibrary()
            .then(setDocuments)
            .finally(() => setLoading(false));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [open]);

    const handleSelect = (mediaId: MediaItem["id"]) => {
        onSelect(mediaId);
        setOpen(false);
    };

    return (
        <Sheet open={open} onOpenChange={setOpen}>
            <SheetContent>
                <SheetHeader>
                    <SheetTitle>{tShared("documents.select-from-library")}</SheetTitle>
                </SheetHeader>
                <div className="grid gap-2 overflow-y-auto px-4 pb-4">
                    {loading ? (
                        <p className="text-sm text-muted-foreground">{tShared("media.loading")}</p>
                    ) : !documents?.length ? (
                        <p className="text-sm text-muted-foreground">{tShared("messages.no-items-found")}</p>
                    ) : (
                        documents.map((item) => (
                            <button
                                key={item.id}
                                type="button"
                                onClick={() => handleSelect(item.id)}
                                className="w-full cursor-pointer text-left transition-opacity hover:opacity-80"
                            >
                                <DocumentRow document={item} />
                            </button>
                        ))
                    )}
                </div>
            </SheetContent>
            <Button type="button" variant="outline" size="sm" onClick={() => setOpen(true)}>
                <Library className="h-4 w-4" />
                {tShared("documents.from-library")}
            </Button>
        </Sheet>
    );
};

export default DocumentPicker;
