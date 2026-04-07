import { Route } from '@/features/routing';
import { defineRouting } from 'next-intl/routing';

export const routing = defineRouting({
    // A list of all locales that are supported
    locales: ['en-US', 'pl-PL'],

    // Used when no locale matches
    defaultLocale: 'pl-PL',
    localePrefix: 'as-needed',
    pathnames: {
        '/': '/',
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
      }
});