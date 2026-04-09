import { Brand, BrandWithTranslations } from "./types";

export const fetchBrandsList = async ({ locale }: { locale: string }): Promise<Brand[]> => await fetch(`${process.env.API_URL}/${locale}/brands`, {
    headers: {
        'X-API-KEY': process.env.API_KEY || '',
    }
}).then(res => res.json());

export const fetchBrand = async ({ locale, id }: { locale: string, id: Brand['id'] }): Promise<BrandWithTranslations> => await fetch(`${process.env.API_URL}/${locale}/brands/${id}`, {
    headers: {
        'X-API-KEY': process.env.API_KEY || '',
    }
}).then(res => res.json());
