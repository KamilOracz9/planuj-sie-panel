import { Attribute, AttributeOption, AttributeOptionWithTranslations, AttributeWithTranslations } from "./types";

export const fetchAttributesList = async ({ locale }: { locale: string }): Promise<Attribute[]> => await fetch(`${process.env.API_URL}/${locale}/attributes`, {
    headers: {
        'X-API-KEY': process.env.API_KEY || '',
    }
}).then(res => res.json());

export const fetchAttribute = async ({ locale, id }: { locale: string, id: Attribute['id'] }): Promise<AttributeWithTranslations> => await fetch(`${process.env.API_URL}/${locale}/attributes/${id}`, {
    headers: {
        'X-API-KEY': process.env.API_KEY || '',
    }
}).then(res => res.json());

export const fetchAttributeOptionsList = async ({ locale }: { locale: string }): Promise<AttributeOption[]> => await fetch(`${process.env.API_URL}/${locale}/attribute-options`, {
    headers: {
        'X-API-KEY': process.env.API_KEY || '',
    }
}).then(res => res.json());

export const fetchAttributeOption = async ({ locale, id }: { locale: string, id: AttributeOption['id'] }): Promise<AttributeOptionWithTranslations> => await fetch(`${process.env.API_URL}/${locale}/attribute-options/${id}`, {
    headers: {
        'X-API-KEY': process.env.API_KEY || '',
    }
}).then(res => res.json());
