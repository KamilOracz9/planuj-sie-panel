import { Route } from '@/features/routing';
import { defineRouting } from 'next-intl/routing';

export const routing = defineRouting({
  // A list of all locales that are supported
  locales: ['pl-PL', 'en-US'],

  // Used when no locale matches
  defaultLocale: 'pl-PL',
  localePrefix: 'as-needed',
  pathnames: {
    '/': '/',

    // Users
    [Route.PRIVATE.USERS.LIST.PATHNAME]: {
      'pl-PL': '/uzytkownicy',
      'en-US': '/users',
    },
    [Route.PRIVATE.USERS.CREATE.PATHNAME]: {
      'pl-PL': '/uzytkownicy/nowy',
      'en-US': '/users/new',
    },
    [Route.PRIVATE.USERS.SHOW.PATHNAME]: {
      'pl-PL': '/uzytkownicy/[id]/podglad',
      'en-US': '/users/[id]/show',
    },
    [Route.PRIVATE.USERS.EDIT.PATHNAME]: {
      'pl-PL': '/uzytkownicy/[id]/edycja',
      'en-US': '/users/[id]/edit',
    },

    // Brands
    [Route.PRIVATE.BRANDS.LIST.PATHNAME]: {
      'pl-PL': '/marki',
      'en-US': '/brands',
    },
    [Route.PRIVATE.BRANDS.CREATE.PATHNAME]: {
      'pl-PL': '/marki/nowa',
      'en-US': '/brands/new',
    },
    [Route.PRIVATE.BRANDS.SHOW.PATHNAME]: {
      'pl-PL': '/marki/[id]/podglad',
      'en-US': '/brands/[id]/show',
    },
    [Route.PRIVATE.BRANDS.EDIT.PATHNAME]: {
      'pl-PL': '/marki/[id]/edycja',
      'en-US': '/brands/[id]/edit',
    },

    // Series
    [Route.PRIVATE.SERIES.LIST.PATHNAME]: {
      'pl-PL': '/serie-produktow',
      'en-US': '/series',
    },
    [Route.PRIVATE.SERIES.CREATE.PATHNAME]: {
      'pl-PL': '/serie-produktow/nowa',
      'en-US': '/series/new',
    },
    [Route.PRIVATE.SERIES.SHOW.PATHNAME]: {
      'pl-PL': '/serie-produktow/[id]/podglad',
      'en-US': '/series/[id]/show',
    },
    [Route.PRIVATE.SERIES.EDIT.PATHNAME]: {
      'pl-PL': '/serie-produktow/[id]/edycja',
      'en-US': '/series/[id]/edit',
    },

    // Collections
    [Route.PRIVATE.COLLECTIONS.LIST.PATHNAME]: {
      'pl-PL': '/kolekcje',
      'en-US': '/collections',
    },
    [Route.PRIVATE.COLLECTIONS.CREATE.PATHNAME]: {
      'pl-PL': '/kolekcje/nowa',
      'en-US': '/collections/new',
    },
    [Route.PRIVATE.COLLECTIONS.SHOW.PATHNAME]: {
      'pl-PL': '/kolekcje/[id]/podglad',
      'en-US': '/collections/[id]/show',
    },
    [Route.PRIVATE.COLLECTIONS.EDIT.PATHNAME]: {
      'pl-PL': '/kolekcje/[id]/edycja',
      'en-US': '/collections/[id]/edit',
    },

    // Channels
    [Route.PRIVATE.CHANNELS.LIST.PATHNAME]: {
      'pl-PL': '/kanaly',
      'en-US': '/channels',
    },
    [Route.PRIVATE.CHANNELS.CREATE.PATHNAME]: {
      'pl-PL': '/kanaly/nowy',
      'en-US': '/channels/new',
    },
    [Route.PRIVATE.CHANNELS.SHOW.PATHNAME]: {
      'pl-PL': '/kanaly/[id]/podglad',
      'en-US': '/channels/[id]/show',
    },
    [Route.PRIVATE.CHANNELS.EDIT.PATHNAME]: {
      'pl-PL': '/kanaly/[id]/edycja',
      'en-US': '/channels/[id]/edit',
    },

    // Currencies
    [Route.PRIVATE.CURRENCIES.LIST.PATHNAME]: {
      'pl-PL': '/waluty',
      'en-US': '/currencies',
    },
    [Route.PRIVATE.CURRENCIES.CREATE.PATHNAME]: {
      'pl-PL': '/waluty/nowa',
      'en-US': '/currencies/new',
    },
    [Route.PRIVATE.CURRENCIES.SHOW.PATHNAME]: {
      'pl-PL': '/waluty/[id]/podglad',
      'en-US': '/currencies/[id]/show',
    },
    [Route.PRIVATE.CURRENCIES.EDIT.PATHNAME]: {
      'pl-PL': '/waluty/[id]/edycja',
      'en-US': '/currencies/[id]/edit',
    },

    // Media collections
    [Route.PRIVATE.MEDIA_COLLECTIONS.LIST.PATHNAME]: {
      'pl-PL': '/kolekcje-mediow',
      'en-US': '/media-collections',
    },
    [Route.PRIVATE.MEDIA_COLLECTIONS.CREATE.PATHNAME]: {
      'pl-PL': '/kolekcje-mediow/nowa',
      'en-US': '/media-collections/new',
    },
    [Route.PRIVATE.MEDIA_COLLECTIONS.SHOW.PATHNAME]: {
      'pl-PL': '/kolekcje-mediow/[id]/podglad',
      'en-US': '/media-collections/[id]/show',
    },
    [Route.PRIVATE.MEDIA_COLLECTIONS.EDIT.PATHNAME]: {
      'pl-PL': '/kolekcje-mediow/[id]/edycja',
      'en-US': '/media-collections/[id]/edit',
    },

    // Categories
    [Route.PRIVATE.CATEGORIES.LIST.PATHNAME]: {
      'pl-PL': '/kategorie',
      'en-US': '/categories',
    },
    [Route.PRIVATE.CATEGORIES.CREATE.PATHNAME]: {
      'pl-PL': '/kategorie/nowa',
      'en-US': '/categories/new',
    },
    [Route.PRIVATE.CATEGORIES.SHOW.PATHNAME]: {
      'pl-PL': '/kategorie/[id]/podglad',
      'en-US': '/categories/[id]/show',
    },
    [Route.PRIVATE.CATEGORIES.EDIT.PATHNAME]: {
      'pl-PL': '/kategorie/[id]/edycja',
      'en-US': '/categories/[id]/edit',
    },

    // Products
    [Route.PRIVATE.PRODUCTS.LIST.PATHNAME]: {
      'pl-PL': '/produkty',
      'en-US': '/products',
    },
    [Route.PRIVATE.PRODUCTS.CREATE.PATHNAME]: {
      'pl-PL': '/produkty/nowy',
      'en-US': '/products/new',
    },
    [Route.PRIVATE.PRODUCTS.SHOW.PATHNAME]: {
      'pl-PL': '/produkty/[id]/podglad',
      'en-US': '/products/[id]/show',
    },
    [Route.PRIVATE.PRODUCTS.EDIT.PATHNAME]: {
      'pl-PL': '/produkty/[id]/edycja',
      'en-US': '/products/[id]/edit',
    },
    [Route.PRIVATE.PRODUCTS.SIMULATE.PATHNAME]: {
      'pl-PL': '/produkty/[id]/symulacja',
      'en-US': '/products/[id]/simulate',
    },

    // Variants
    [Route.PRIVATE.VARIANTS.LIST.PATHNAME]: {
      'pl-PL': '/warianty',
      'en-US': '/variants',
    },
    [Route.PRIVATE.VARIANTS.CREATE.PATHNAME]: {
      'pl-PL': '/warianty/nowy',
      'en-US': '/variants/new',
    },
    [Route.PRIVATE.VARIANTS.SHOW.PATHNAME]: {
      'pl-PL': '/warianty/[id]/podglad',
      'en-US': '/variants/[id]/show',
    },
    [Route.PRIVATE.VARIANTS.EDIT.PATHNAME]: {
      'pl-PL': '/warianty/[id]/edycja',
      'en-US': '/variants/[id]/edit',
    },

    // Attributes
    [Route.PRIVATE.ATTRIBUTES.LIST.PATHNAME]: {
      'pl-PL': '/atrybuty',
      'en-US': '/attributes',
    },
    [Route.PRIVATE.ATTRIBUTES.CREATE.PATHNAME]: {
      'pl-PL': '/atrybuty/nowy',
      'en-US': '/attributes/new',
    },
    [Route.PRIVATE.ATTRIBUTES.SHOW.PATHNAME]: {
      'pl-PL': '/atrybuty/[id]/podglad',
      'en-US': '/attributes/[id]/show',
    },
    [Route.PRIVATE.ATTRIBUTES.EDIT.PATHNAME]: {
      'pl-PL': '/atrybuty/[id]/edycja',
      'en-US': '/attributes/[id]/edit',
    },

    // Attribute options
    [Route.PRIVATE.ATTRIBUTE_OPTIONS.LIST.PATHNAME]: {
      'pl-PL': '/opcje-atrybutow',
      'en-US': '/attribute-options',
    },
    [Route.PRIVATE.ATTRIBUTE_OPTIONS.CREATE.PATHNAME]: {
      'pl-PL': '/opcje-atrybutow/nowa',
      'en-US': '/attribute-options/new',
    },
    [Route.PRIVATE.ATTRIBUTE_OPTIONS.SHOW.PATHNAME]: {
      'pl-PL': '/opcje-atrybutow/[id]/podglad',
      'en-US': '/attribute-options/[id]/show',
    },
    [Route.PRIVATE.ATTRIBUTE_OPTIONS.EDIT.PATHNAME]: {
      'pl-PL': '/opcje-atrybutow/[id]/edycja',
      'en-US': '/attribute-options/[id]/edit',
    },

    // Media gallery
    [Route.PRIVATE.MEDIA.LIST.PATHNAME]: {
      'pl-PL': '/galeria',
      'en-US': '/media',
    },

    // Document library
    [Route.PRIVATE.DOCUMENTS.LIST.PATHNAME]: {
      'pl-PL': '/dokumenty',
      'en-US': '/documents',
    },
  }
});