"use client";

import { Form } from "@/features/categories";
import { useCategory } from "@/features/categories/context";
import { Card, CardContent, CardHeader, CardTitle } from "@/features/shared/components/ui/card";
import { useTranslations } from "next-intl";

const Show = () => {
  const tCategories = useTranslations('Categories');

  const { categoryPromise, categoriesSelectPromise } = useCategory();

  return (
    <Card className="flex-1">
      <CardHeader>
        <CardTitle>{tCategories('show.title')}</CardTitle>
      </CardHeader>
      <CardContent>
        <Form categoryPromise={categoryPromise} categoriesSelectPromise={categoriesSelectPromise} />
      </CardContent>
    </Card>
  )
}

export default Show