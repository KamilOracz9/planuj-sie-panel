import { fetchDocumentLibrary } from "@/app/actions/media";
import { DocumentLibrary } from "@/features/media";
import { Card, CardContent, CardHeader, CardTitle } from "@/features/shared/components/ui/card";
import { getTranslations } from "next-intl/server";

const DocumentsPage = async () => {
    const tDocuments = await getTranslations("DocumentsLibrary");
    const documents = await fetchDocumentLibrary();

    return (
        <Card className="flex-1">
            <CardHeader>
                <CardTitle>{tDocuments("title")}</CardTitle>
            </CardHeader>
            <CardContent>
                <DocumentLibrary initialDocuments={documents} />
            </CardContent>
        </Card>
    );
};

export default DocumentsPage;
