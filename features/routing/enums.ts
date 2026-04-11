export enum Pathnames {
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

    CATEGORIES_LIST = "/categories",
    CATEGORIES_CREATE = "/categories/create",
    CATEGORIES_SHOW = "/categories/[id]/show",
    CATEGORIES_EDIT = "/categories/[id]/edit",
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
        CATEGORIES: {
            LIST: { PATHNAME: Pathnames.CATEGORIES_LIST },
            CREATE: { PATHNAME: Pathnames.CATEGORIES_CREATE },
            EDIT: { PATHNAME: Pathnames.CATEGORIES_EDIT },
            SHOW: { PATHNAME: Pathnames.CATEGORIES_SHOW }
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