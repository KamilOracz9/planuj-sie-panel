import Select from "@/features/shared/components/select";
import { useFieldArray, UseFormReturn, FieldValues, ArrayPath, Path } from "react-hook-form";
import { useAttribute } from "../hooks";
import FormField from "@/features/shared/components/form-field";
import { Button } from "@/features/shared/components/ui/button";
import { useTranslations } from "next-intl";
import { Attribute } from "../types";

interface ModelAttributesProps<T extends FieldValues> {
    form: UseFormReturn<T>;
    label: string;
    onSubmit?: (data: T) => void;
    errors?: Record<string, string> | null;
}

const ModelAttributes = <T extends FieldValues>({
    form,
    label,
    onSubmit,
    errors,
}: ModelAttributesProps<T>) => {
    const tShared = useTranslations("Shared");
    const { attributesSelect, attributeSelectItems } = useAttribute();

    const { fields, append, remove } = useFieldArray({
        control: form.control,
        name: "attributes" as ArrayPath<T>,
    });

    return (
        <div className="space-y-4">
            {fields.map((field, index) => {
                const currentAttributeId = form.watch(`attributes.${index}.attribute_id` as any);
                const selectedAttribute = attributesSelect?.find(
                    (a: Attribute) => String(a.id) === String(currentAttributeId)
                );

                return (
                    <div key={field.id} className="flex items-end gap-2">
                        <div className="flex-1">
                            <Select
                                label={label}
                                name={`attributes.${index}.attribute_id` as Path<T>}
                                items={attributeSelectItems}
                                formControl={form.control}
                                disabled={!onSubmit}
                                errors={errors}
                                defaultValue={selectedAttribute?.name}
                            />
                        </div>
                        <div className="flex-1">
                            <FormField
                                readonly={!onSubmit}
                                name={`attributes.${index}.data`}
                                errors={errors}
                                control={form.control}
                            />
                        </div>
                        {onSubmit && (
                            <Button
                                type="button"
                                variant="destructive"
                                onClick={() => remove(index)}
                            >
                                {tShared("actions.remove")}
                            </Button>
                        )}
                    </div>
                );
            })}

            {onSubmit && (
                <Button
                    type="button"
                    variant="outline"
                    onClick={() => append({ attribute_id: "", data: "" } as any)}
                >
                    {tShared("actions.add")}
                </Button>
            )}
        </div>
    );
};

export default ModelAttributes;