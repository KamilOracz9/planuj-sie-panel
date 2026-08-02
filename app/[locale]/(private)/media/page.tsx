import { fetchGalleryMedia, fetchMediaFolders } from "@/app/actions/media";
import { GalleryGrid } from "@/features/media";
import { Card, CardContent, CardHeader, CardTitle } from "@/features/shared/components/ui/card";
import { getTranslations } from "next-intl/server";

interface MediaGalleryPageProps {
    searchParams: Promise<{ folder?: string }>;
}

const MediaGalleryPage = async ({ searchParams }: MediaGalleryPageProps) => {
    const tMediaGallery = await getTranslations("MediaGallery");
    const { folder } = await searchParams;
    const activeFolderId = folder ? Number(folder) : null;

    const [media, folders] = await Promise.all([fetchGalleryMedia(activeFolderId), fetchMediaFolders("images")]);

    return (
        <Card className="flex-1">
            <CardHeader>
                <CardTitle>{tMediaGallery("title")}</CardTitle>
            </CardHeader>
            <CardContent>
                <GalleryGrid
                    key={activeFolderId ?? "root"}
                    initialMedia={media}
                    folders={folders}
                    activeFolderId={activeFolderId}
                />
            </CardContent>
        </Card>
    );
};

export default MediaGalleryPage;
