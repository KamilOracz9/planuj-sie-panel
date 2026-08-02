"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { Images } from "lucide-react";
import { Button } from "@/features/shared/components/ui/button";
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
} from "@/features/shared/components/ui/sheet";
import { fetchGalleryMedia } from "@/app/actions/media";
import { MediaItem } from "../types";
import MediaThumb from "./media-thumb";

interface GalleryPickerProps {
    onSelect: (mediaId: MediaItem["id"]) => void;
}

const GalleryPicker = ({ onSelect }: GalleryPickerProps) => {
    const tShared = useTranslations("Shared");
    const [open, setOpen] = useState(false);
    const [media, setMedia] = useState<MediaItem[] | null>(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (!open || media !== null) {
            return;
        }

        setLoading(true);
        fetchGalleryMedia()
            .then(setMedia)
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
                    <SheetTitle>{tShared("media.select-from-gallery")}</SheetTitle>
                </SheetHeader>
                <div className="grid grid-cols-3 gap-3 overflow-y-auto px-4 pb-4">
                    {loading ? (
                        <p className="col-span-3 text-sm text-muted-foreground">{tShared("media.loading")}</p>
                    ) : !media?.length ? (
                        <p className="col-span-3 text-sm text-muted-foreground">{tShared("messages.no-items-found")}</p>
                    ) : (
                        media.map((item) => (
                            <button
                                key={item.id}
                                type="button"
                                onClick={() => handleSelect(item.id)}
                                className="h-24 w-full cursor-pointer transition-opacity hover:opacity-80"
                            >
                                <MediaThumb media={item} />
                            </button>
                        ))
                    )}
                </div>
            </SheetContent>
            <Button type="button" variant="outline" size="sm" onClick={() => setOpen(true)}>
                <Images className="h-4 w-4" />
                {tShared("media.from-gallery")}
            </Button>
        </Sheet>
    );
};

export default GalleryPicker;
