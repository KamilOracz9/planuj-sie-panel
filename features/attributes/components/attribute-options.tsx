"use client";

import { useEffect, useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { PlusCircle, Trash } from "lucide-react";
import { AttributeOptionSelectItem } from "../types";
import { deleteAttributeOption, fetchAttributeOptionsListForSelect } from "@/app/actions/attribute-option";
import { Route } from "@/features/routing";
import { Link, useRouter } from "@/lib/i18n/navigation";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/features/shared/components/ui/table";
import { Button } from "@/features/shared/components/ui/button";

interface AttributeOptionsProps {
    attributeId: number;
}

// Read-only: editing an option (name/prices/media) happens on its own
// dedicated page (Route.PRIVATE.ATTRIBUTE_OPTIONS), not inline here - this
// tab is just a quick "what options does this attribute have" overview with
// links out, plus create (pre-filled with this attribute) and delete.
const AttributeOptions = ({ attributeId }: AttributeOptionsProps) => {
    const locale = useLocale();
    const tShared = useTranslations("Shared");
    const tAttributes = useTranslations("Attributes");
    const router = useRouter();

    const [options, setOptions] = useState<AttributeOptionSelectItem[]>([]);

    const loadOptions = () => {
        fetchAttributeOptionsListForSelect({ locale, attributeId }).then(setOptions);
    };

    useEffect(() => {
        loadOptions();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [attributeId, locale]);

    const handleDelete = (id: number) => {
        deleteAttributeOption(id).then(() => {
            setOptions((prev) => prev.filter((option) => option.id !== id));
        });
    };

    return (
        <div className="space-y-4">
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>{tShared("fields.name")}</TableHead>
                        <TableHead className="text-center w-20">{tShared("fields.actions")}</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {options.map((option) => (
                        <TableRow
                            key={option.id}
                            className="cursor-pointer"
                            onClick={() => router.push({ pathname: Route.PRIVATE.ATTRIBUTE_OPTIONS.EDIT.PATHNAME, params: { id: option.id } })}
                        >
                            <TableCell>{option.name}</TableCell>
                            <TableCell className="text-center" onClick={(e) => e.stopPropagation()}>
                                <Button type="button" variant="ghost" size="icon-sm" onClick={() => handleDelete(option.id)}>
                                    <Trash className="h-4 w-4" />
                                </Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>

            <Button variant="outline" asChild>
                <Link href={{ pathname: Route.PRIVATE.ATTRIBUTE_OPTIONS.CREATE.PATHNAME, query: { attribute_id: attributeId } }}>
                    <PlusCircle className="h-4 w-4" /> {tAttributes("options.add")}
                </Link>
            </Button>
        </div>
    );
};

export default AttributeOptions;
