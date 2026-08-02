import { cn } from "@/lib/utils";
import { MediaItem } from "../types";

interface MediaThumbProps {
    media: MediaItem;
    className?: string;
}

const MediaThumb = ({ media, className }: MediaThumbProps) => {
    const src = media.conversions.thumb ?? media.conversions.mobile ?? media.url;

    return (
        // eslint-disable-next-line @next/next/no-img-element
        <img
            src={src}
            alt={media.name}
            className={cn("h-full w-full rounded-md border object-cover", className)}
        />
    );
};

export default MediaThumb;
