import { fetchGalleryMedia } from "@/app/actions/media";
import { GalleryGrid } from "@/features/media";
import { Card, CardContent, CardHeader, CardTitle } from "@/features/shared/components/ui/card";
import { getTranslations } from "next-intl/server";

const MediaGalleryPage = async () => {
    const tMediaGallery = await getTranslations("MediaGallery");
    const media = await fetchGalleryMedia();

    return (
        <Card className="flex-1">
            <CardHeader>
                <CardTitle>{tMediaGallery("title")}</CardTitle>
            </CardHeader>
            <CardContent>
                <GalleryGrid initialMedia={media} />
            </CardContent>
        </Card>
    );
};

export default MediaGalleryPage;
