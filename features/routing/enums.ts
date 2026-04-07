export enum Pathnames {
    SIGN_IN = "/auth/sign-in",
    SIGN_UP = "/auth/sign-up",

    DASHBOARD = "/",
    
    USERS = "/users",
    USERS_SHOW = `/users/[id]/show`,
    USERS_EDIT = "/users/[id]/edit",
}

export const Route = {
    PRIVATE: {
        DASHBOARD: {
            PATHNAME: Pathnames.DASHBOARD
        },
        USERS: {
            LIST: { PATHNAME: Pathnames.USERS },
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