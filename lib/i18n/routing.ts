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
  }
});