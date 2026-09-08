import { Attribute, AttributeOption, AttributeOptionWithTranslations, AttributeWithTranslations } from "./types";
import { apiFetch } from "@/lib/api-client";

export const fetchAttributesList = async ({ locale }: { locale: string }): Promise<Attribute[]> => await apiFetch(`/${locale}/attributes`, {}).then(res => res.json());

export const fetchAttribute = async ({ locale, id }: { locale: string, id: Attribute['id'] }): Promise<AttributeWithTranslations> => await apiFetch(`/${locale}/attributes/${id}`, {}).then(res => res.json());

export const fetchAttributeOptionsList = async ({ locale }: { locale: string }): Promise<AttributeOption[]> => await apiFetch(`/${locale}/attribute-options`, {}).then(res => res.json());

export const fetchAttributeOption = async ({ locale, id }: { locale: string, id: AttributeOption['id'] }): Promise<AttributeOptionWithTranslations> => await apiFetch(`/${locale}/attribute-options/${id}`, {}).then(res => res.json());
