export enum Pathnames {
    SIGN_IN = "/auth/sign-in",
    SIGN_UP = "/auth/sign-up",

    DASHBOARD = "/",
    
    USERS_LIST = "/users",
    USERS_CREATE = "/users/create",
    USERS_SHOW = "/users/[id]/show",
    USERS_EDIT = "/users/[id]/edit",
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