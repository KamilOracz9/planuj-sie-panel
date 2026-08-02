"use client";

import { useState } from "react";
import { ImageIcon } from "lucide-react";
import { Button } from "@/features/shared/components/ui/button";
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
} from "@/features/shared/components/ui/sheet";
import { MediaModelType } from "../types";
import EntityMediaManager from "./entity-media-manager";

interface MediaSheetButtonProps {
    modelType: MediaModelType;
    id: number;
    shape: "icon" | "logo" | "gallery";
    title: string;
    disabled?: boolean;
}

const MediaSheetButton = ({ modelType, id, shape, title, disabled }: MediaSheetButtonProps) => {
    const [open, setOpen] = useState(false);

    return (
        <Sheet open={open} onOpenChange={setOpen}>
            <SheetContent>
                <SheetHeader>
                    <SheetTitle>{title}</SheetTitle>
                </SheetHeader>
                <div className="px-4 pb-4">
                    {open && <EntityMediaManager modelType={modelType} id={id} shape={shape} disabled={disabled} />}
                </div>
            </SheetContent>
            <Button type="button" variant="ghost" size="icon-sm" onClick={() => setOpen(true)}>
                <ImageIcon className="h-4 w-4" />
            </Button>
        </Sheet>
    );
};

export default MediaSheetButton;
