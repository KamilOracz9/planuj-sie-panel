"use client"

import { createCategory, fetchCategoriesListForSelect } from "@/app/actions/category";
import { CategorySelectItem, Form } from "@/features/categories";
import { categorySchema } from "@/features/categories/schemas";
import { Route } from "@/features/routing";
import { Card, CardContent, CardHeader, CardTitle } from "@/features/shared/components/ui/card"
import { useLocale, useTranslations } from "next-intl";
import { redirect } from "next/navigation";
import { useEffect, useState } from "react";
import * as z from "zod"

const Create = () => {
  const locale = useLocale();
  const tCategories = useTranslations('Categories');

  const [errors, setErrors] = useState<Record<string, string> | null>(null);
  const [categoriesSelectPromise, setCategoriesSelectPromise] = useState<Promise<CategorySelectItem[]> | undefined>(undefined);

  function onSubmit(data: z.infer<typeof categorySchema>) {
    createCategory(data).then((res) => {
      if (res.errors) {
        setErrors(res.errors);
      } else {
        redirect(Route.PRIVATE.CATEGORIES.LIST.PATHNAME);
      }
    })
  }

  useEffect(() => {
    setCategoriesSelectPromise(fetchCategoriesListForSelect({ locale }));
  }, [locale]);

  return (
    <Card className="flex-1">
      <CardHeader>
        <CardTitle>{tCategories('create.title')}</CardTitle>
      </CardHeader>
      <CardContent>
        <Form onSubmit={onSubmit} errors={errors} categoriesSelectPromise={categoriesSelectPromise} />
      </CardContent>
    </Card>
  )
}

export default Create