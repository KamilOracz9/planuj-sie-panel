import { Product, ProductWithTranslations } from "./types";

export const fetchProductsList = async ({ locale }: { locale: string }): Promise<Product[]> => await fetch(`${process.env.API_URL}/${locale}/products`, {
    headers: {
        'X-API-KEY': process.env.API_KEY || '',
    }
}).then(res => res.json());

export const fetchProduct = async ({ locale, id }: { locale: string, id: Product['id'] }): Promise<ProductWithTranslations> => await fetch(`${process.env.API_URL}/${locale}/products/${id}`, {
    headers: {
        'X-API-KEY': process.env.API_KEY || '',
    }
}).then(res => res.json());
