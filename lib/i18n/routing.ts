import { defineRouting } from 'next-intl/routing';

export const routing = defineRouting({
    // A list of all locales that are supported
    locales: ['en', 'pl'],

    // Used when no locale matches
    defaultLocale: 'en',
    localePrefix: 'as-needed',
    pathnames: {
        '/': '/',
        '/auth/sign-in': {
          'pl': '/logowanie',
          'en': '/sign-in',
        },
        '/auth/sign-up': {
          'pl': '/rejestracja',
          'en': '/sign-up',
        },
        '/pricing': {
          'pl': '/cennik',
          'en': '/pricing',
        },
        '/profile': {
          'pl': '/profil',
          'en': '/profile',
        },
      }
});