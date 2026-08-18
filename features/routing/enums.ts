export enum Pathnames {
    PRODUCTS_LIST = "/products",
    PRODUCTS_CREATE = "/products/create",
    PRODUCTS_SHOW = "/products/[id]/show",
    PRODUCTS_EDIT = "/products/[id]/edit",
    PRODUCTS_SIMULATE = "/products/[id]/simulate",

    VARIANTS_LIST = "/variants",
    VARIANTS_CREATE = "/variants/create",
    VARIANTS_SHOW = "/variants/[id]/show",
    VARIANTS_EDIT = "/variants/[id]/edit",

    SIGN_IN = "/auth/sign-in",
    SIGN_UP = "/auth/sign-up",

    DASHBOARD = "/",

    USERS_LIST = "/users",
    USERS_CREATE = "/users/create",
    USERS_SHOW = "/users/[id]/show",
    USERS_EDIT = "/users/[id]/edit",

    BRANDS_LIST = "/brands",
    BRANDS_CREATE = "/brands/create",
    BRANDS_SHOW = "/brands/[id]/show",
    BRANDS_EDIT = "/brands/[id]/edit",

    SERIES_LIST = "/series",
    SERIES_CREATE = "/series/create",
    SERIES_SHOW = "/series/[id]/show",
    SERIES_EDIT = "/series/[id]/edit",

    COLLECTIONS_LIST = "/collections",
    COLLECTIONS_CREATE = "/collections/create",
    COLLECTIONS_SHOW = "/collections/[id]/show",
    COLLECTIONS_EDIT = "/collections/[id]/edit",

    CHANNELS_LIST = "/channels",
    CHANNELS_CREATE = "/channels/create",
    CHANNELS_SHOW = "/channels/[id]/show",
    CHANNELS_EDIT = "/channels/[id]/edit",

    CURRENCIES_LIST = "/currencies",
    CURRENCIES_CREATE = "/currencies/create",
    CURRENCIES_SHOW = "/currencies/[id]/show",
    CURRENCIES_EDIT = "/currencies/[id]/edit",

    MEDIA_COLLECTIONS_LIST = "/media-collections",
    MEDIA_COLLECTIONS_CREATE = "/media-collections/create",
    MEDIA_COLLECTIONS_SHOW = "/media-collections/[id]/show",
    MEDIA_COLLECTIONS_EDIT = "/media-collections/[id]/edit",

    CATEGORIES_LIST = "/categories",
    CATEGORIES_CREATE = "/categories/create",
    CATEGORIES_SHOW = "/categories/[id]/show",
    CATEGORIES_EDIT = "/categories/[id]/edit",

    ATTRIBUTES_LIST = "/attributes",
    ATTRIBUTES_CREATE = "/attributes/create",
    ATTRIBUTES_SHOW = "/attributes/[id]/show",
    ATTRIBUTES_EDIT = "/attributes/[id]/edit",

    ATTRIBUTE_OPTIONS_LIST = "/attribute-options",
    ATTRIBUTE_OPTIONS_CREATE = "/attribute-options/create",
    ATTRIBUTE_OPTIONS_SHOW = "/attribute-options/[id]/show",
    ATTRIBUTE_OPTIONS_EDIT = "/attribute-options/[id]/edit",

    MEDIA_LIST = "/media",

    DOCUMENTS_LIST = "/documents",
}

export const Route = {
    PRIVATE: {
        DASHBOARD: {
            PATHNAME: Pathnames.DASHBOARD
        },
        USERS: {
            LIST: { PATHNAME: Pathnames.USERS_LIST },
            CREATE: { PATHNAME: Pathnames.USERS_CREATE },
            EDIT: { PATHNAME: Pathnames.USERS_EDIT },
            SHOW: { PATHNAME: Pathnames.USERS_SHOW }
        },
        BRANDS: {
            LIST: { PATHNAME: Pathnames.BRANDS_LIST },
            CREATE: { PATHNAME: Pathnames.BRANDS_CREATE },
            EDIT: { PATHNAME: Pathnames.BRANDS_EDIT },
            SHOW: { PATHNAME: Pathnames.BRANDS_SHOW }
        },
        SERIES: {
            LIST: { PATHNAME: Pathnames.SERIES_LIST },
            CREATE: { PATHNAME: Pathnames.SERIES_CREATE },
            EDIT: { PATHNAME: Pathnames.SERIES_EDIT },
            SHOW: { PATHNAME: Pathnames.SERIES_SHOW }
        },
        COLLECTIONS: {
            LIST: { PATHNAME: Pathnames.COLLECTIONS_LIST },
            CREATE: { PATHNAME: Pathnames.COLLECTIONS_CREATE },
            EDIT: { PATHNAME: Pathnames.COLLECTIONS_EDIT },
            SHOW: { PATHNAME: Pathnames.COLLECTIONS_SHOW }
        },
        CHANNELS: {
            LIST: { PATHNAME: Pathnames.CHANNELS_LIST },
            CREATE: { PATHNAME: Pathnames.CHANNELS_CREATE },
            EDIT: { PATHNAME: Pathnames.CHANNELS_EDIT },
            SHOW: { PATHNAME: Pathnames.CHANNELS_SHOW }
        },
        CURRENCIES: {
            LIST: { PATHNAME: Pathnames.CURRENCIES_LIST },
            CREATE: { PATHNAME: Pathnames.CURRENCIES_CREATE },
            EDIT: { PATHNAME: Pathnames.CURRENCIES_EDIT },
            SHOW: { PATHNAME: Pathnames.CURRENCIES_SHOW }
        },
        MEDIA_COLLECTIONS: {
            LIST: { PATHNAME: Pathnames.MEDIA_COLLECTIONS_LIST },
            CREATE: { PATHNAME: Pathnames.MEDIA_COLLECTIONS_CREATE },
            EDIT: { PATHNAME: Pathnames.MEDIA_COLLECTIONS_EDIT },
            SHOW: { PATHNAME: Pathnames.MEDIA_COLLECTIONS_SHOW }
        },
        PRODUCTS: {
            LIST: { PATHNAME: Pathnames.PRODUCTS_LIST },
            CREATE: { PATHNAME: Pathnames.PRODUCTS_CREATE },
            EDIT: { PATHNAME: Pathnames.PRODUCTS_EDIT },
            SHOW: { PATHNAME: Pathnames.PRODUCTS_SHOW },
            SIMULATE: { PATHNAME: Pathnames.PRODUCTS_SIMULATE }
        },
        CATEGORIES: {
            LIST: { PATHNAME: Pathnames.CATEGORIES_LIST },
            CREATE: { PATHNAME: Pathnames.CATEGORIES_CREATE },
            EDIT: { PATHNAME: Pathnames.CATEGORIES_EDIT },
            SHOW: { PATHNAME: Pathnames.CATEGORIES_SHOW }
        },
        VARIANTS: {
            LIST: { PATHNAME: Pathnames.VARIANTS_LIST },
            CREATE: { PATHNAME: Pathnames.VARIANTS_CREATE },
            EDIT: { PATHNAME: Pathnames.VARIANTS_EDIT },
            SHOW: { PATHNAME: Pathnames.VARIANTS_SHOW }
        },
        ATTRIBUTES: {
            LIST: { PATHNAME: Pathnames.ATTRIBUTES_LIST },
            CREATE: { PATHNAME: Pathnames.ATTRIBUTES_CREATE },
            EDIT: { PATHNAME: Pathnames.ATTRIBUTES_EDIT },
            SHOW: { PATHNAME: Pathnames.ATTRIBUTES_SHOW }
        },
        ATTRIBUTE_OPTIONS: {
            LIST: { PATHNAME: Pathnames.ATTRIBUTE_OPTIONS_LIST },
            CREATE: { PATHNAME: Pathnames.ATTRIBUTE_OPTIONS_CREATE },
            EDIT: { PATHNAME: Pathnames.ATTRIBUTE_OPTIONS_EDIT },
            SHOW: { PATHNAME: Pathnames.ATTRIBUTE_OPTIONS_SHOW }
        },
        MEDIA: {
            LIST: { PATHNAME: Pathnames.MEDIA_LIST },
        },
        DOCUMENTS: {
            LIST: { PATHNAME: Pathnames.DOCUMENTS_LIST },
        },
    },
    PUBLIC: {
        SIGN_IN: {
            PATHNAME: Pathnames.SIGN_IN
        },
        SIGN_UP: {
            PATHNAME: Pathnames.SIGN_UP
        },
    }
} as const;