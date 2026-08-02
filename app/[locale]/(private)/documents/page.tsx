import { fetchDocumentLibrary, fetchMediaFolders } from "@/app/actions/media";
import { DocumentLibrary } from "@/features/media";
import { Card, CardContent, CardHeader, CardTitle } from "@/features/shared/components/ui/card";
import { getTranslations } from "next-intl/server";

interface DocumentsPageProps {
    searchParams: Promise<{ folder?: string }>;
}

const DocumentsPage = async ({ searchParams }: DocumentsPageProps) => {
    const tDocuments = await getTranslations("DocumentsLibrary");
    const { folder } = await searchParams;
    const activeFolderId = folder ? Number(folder) : null;

    const [documents, folders] = await Promise.all([
        fetchDocumentLibrary(activeFolderId),
        fetchMediaFolders("documents"),
    ]);

    return (
        <Card className="flex-1">
            <CardHeader>
                <CardTitle>{tDocuments("title")}</CardTitle>
            </CardHeader>
            <CardContent>
                <DocumentLibrary
                    key={activeFolderId ?? "root"}
                    initialDocuments={documents}
                    folders={folders}
                    activeFolderId={activeFolderId}
                />
            </CardContent>
        </Card>
    );
};

export default DocumentsPage;
