export enum Pathnames {
    SIGN_IN = "/auth/sign-in",
    SIGN_UP = "/auth/sign-up",

    DASHBOARD = "/",
    USERS = "/users",
}

export const Route = {
    PRIVATE: {
        DASHBOARD: {
            PATHNAME: Pathnames.DASHBOARD
        },
        USERS: {
            PATHNAME: Pathnames.USERS
        }
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