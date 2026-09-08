import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "./ui/accordion"
import { routing } from "@/lib/i18n/routing";
import { useTranslations } from "next-intl";
import FormField from "@/features/shared/components/form-field";

const TranslatedField = ({ onSubmit, errors, form }: { onSubmit?: boolean; errors?: Record<string, string> | null; form: any }) => {
    return (
        <Accordion type="multiple" defaultValue={["pl-PL"]}>
            {routing.locales.map(locale => (
                <AccordionItem key={locale} value={locale}>
                    <AccordionTrigger>{useTranslations('Shared')('fields.name')} ({locale})</AccordionTrigger>
                    <AccordionContent>
                        <FormField readonly={!onSubmit} name={`name.${locale}`} errors={errors} control={form.control} />
                    </AccordionContent>
                </AccordionItem>
            ))}
        </Accordion>
    )
}

export default TranslatedField