"use client";

import { updateCategory } from "@/app/actions/category";
import { Form } from "@/features/categories";
import { useCategory } from "@/features/categories/context";
import { categorySchema } from "@/features/categories/schemas";
import { Route } from "@/features/routing";
import { Card, CardContent, CardHeader, CardTitle } from "@/features/shared/components/ui/card";
import { useTranslations } from "next-intl";
import { redirect, useParams } from "next/navigation";
import {  useState } from "react";
import * as z from "zod"

const Edit = () => {
  const params = useParams();

  const tCategories = useTranslations('Categories');

  const [errors, setErrors] = useState<Record<string, string> | null>(null);

  const categoryPromise = useCategory();

  function onSubmit(data: z.infer<typeof categorySchema>) {
    const categoryId = Number(params.id);

    if (isNaN(categoryId)) {
      return;
    }

    updateCategory(data, categoryId).then((res) => {
      if (res.errors) {
        setErrors(res.errors);
      } else {
        redirect(Route.PRIVATE.CATEGORIES.LIST.PATHNAME);
      }
    })
  }

  return (
    <Card className="flex-1">
      <CardHeader>
        <CardTitle>{tCategories('edit.title')}</CardTitle>
      </CardHeader>
      <CardContent>
        <Form categoryPromise={categoryPromise} onSubmit={onSubmit} errors={errors} />
      </CardContent>
    </Card>
  )
}

export default Edit