"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useLocale, useTranslations } from "next-intl";
import { Edit, PlusCircle, Trash } from "lucide-react";
import { attributeOptionSchema } from "../schemas";
import { AttributeOptionSelectItem } from "../types";
import {
    createAttributeOption,
    deleteAttributeOption,
    fetchAttributeOption,
    fetchAttributeOptionsListForSelect,
    updateAttributeOption,
} from "@/app/actions/attribute-option";
import { routing } from "@/lib/i18n/routing";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/features/shared/components/ui/table";
import { Button } from "@/features/shared/components/ui/button";
import TranslatedField from "@/features/shared/components/translated-field";
import { MediaSheetButton } from "@/features/media";
import { PriceEditor } from "@/features/prices";
import { fetchPricesByModel } from "@/app/actions/price";

interface AttributeOptionsProps {
    attributeId: number;
}

type AttributeOptionFormValues = z.infer<typeof attributeOptionSchema>;

const AttributeOptions = ({ attributeId }: AttributeOptionsProps) => {
    const locale = useLocale();
    const tShared = useTranslations("Shared");
    const tAttributes = useTranslations("Attributes");

    const [options, setOptions] = useState<AttributeOptionSelectItem[]>([]);
    const [editingId, setEditingId] = useState<number | "new" | null>(null);
    const [errors, setErrors] = useState<Record<string, string> | null>(null);

    const form = useForm<AttributeOptionFormValues>({
        resolver: zodResolver(attributeOptionSchema),
        defaultValues: { name: {}, prices: [] },
    });

    const loadOptions = () => {
        fetchAttributeOptionsListForSelect({ locale, attributeId }).then(setOptions);
    };

    useEffect(() => {
        loadOptions();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [attributeId, locale]);

    const startCreate = () => {
        form.reset({ name: {}, prices: [] });
        setErrors(null);
        setEditingId("new");
    };

    const startEdit = async (id: number) => {
        const [option, prices] = await Promise.all([
            fetchAttributeOption({ locale, id }),
            fetchPricesByModel({ locale, modelId: id, modelType: 'attribute-option' }),
        ]);
        const defaultNameValues = Object.fromEntries(
            routing.locales.map((l) => [l, option.translations?.[l as keyof typeof option.translations]?.name])
        );
        form.reset({ name: defaultNameValues, prices });
        setErrors(null);
        setEditingId(id);
    };

    const cancelEdit = () => {
        setEditingId(null);
        setErrors(null);
    };

    const onSubmit = (data: AttributeOptionFormValues) => {
        const payload = { ...data, attribute_id: attributeId };
        const action =
            editingId === "new"
                ? createAttributeOption(payload)
                : updateAttributeOption(payload, editingId as number);

        action.then((res) => {
            if (res.errors) {
                setErrors(res.errors);
            } else {
                setEditingId(null);
                loadOptions();
            }
        });
    };

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
                        <TableRow key={option.id}>
                            <TableCell>{option.name}</TableCell>
                            <TableCell className="text-center">
                                <MediaSheetButton modelType="attribute-options" id={option.id} title={option.name} />
                                <Button type="button" variant="ghost" onClick={() => handleDelete(option.id)}>
                                    <Trash className="h-4 w-4" />
                                </Button>
                                <Button type="button" variant="ghost" onClick={() => startEdit(option.id)}>
                                    <Edit className="h-4 w-4" />
                                </Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>

            {editingId === null && (
                <Button type="button" variant="outline" onClick={startCreate}>
                    <PlusCircle className="h-4 w-4" /> {tAttributes("options.add")}
                </Button>
            )}

            {editingId !== null && (
                <div className="space-y-4 rounded-md border p-4">
                    <TranslatedField onSubmit errors={errors} form={form} />
                    <div className="grid gap-2 w-max">
                        <p className="text-sm font-medium">{tShared("tabs.prices")}</p>
                        <PriceEditor form={form} onSubmit={onSubmit} errors={errors} />
                    </div>
                    <div className="flex gap-2">
                        <Button type="button" onClick={form.handleSubmit(onSubmit)}>
                            {tShared("actions.save")}
                        </Button>
                        <Button type="button" variant="ghost" onClick={cancelEdit}>
                            {tShared("actions.cancel")}
                        </Button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AttributeOptions;
