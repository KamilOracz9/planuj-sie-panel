"use client"

import { createVariant } from "@/app/actions/variants";
import { Form } from "@/features/variants";
import { variantSchema } from "@/features/variants/schemas";
import { Route } from "@/features/routing";
import { Card, CardContent, CardHeader, CardTitle } from "@/features/shared/components/ui/card"
import { useLocale, useTranslations } from "next-intl";
import { redirect } from "next/navigation";
import { useEffect, useState } from "react";
import * as z from "zod"
import { ProductSelectItem } from "@/features/products/types";
import { fetchProductsListForSelect } from "@/app/actions/product";

const Create = () => {
  const locale = useLocale();
  const tVariants = useTranslations('Variants');

  const [errors, setErrors] = useState<Record<string, string> | null>(null);
  const [productsSelectPromise, setProductsSelectPromise] = useState<Promise<ProductSelectItem[]> | undefined>(undefined);

  function onSubmit(data: z.infer<typeof variantSchema>) {
    createVariant(data).then((res) => {
      if (res.errors) {
        setErrors(res.errors);
      } else {
        redirect(Route.PRIVATE.VARIANTS.LIST.PATHNAME);
      }
    })
  }

  useEffect(() => {
    setProductsSelectPromise(fetchProductsListForSelect({ locale }));
  }, [locale]);

  return (
    <Card className="flex-1">
      <CardHeader>
        <CardTitle>{tVariants('create.title')}</CardTitle>
      </CardHeader>
      <CardContent>
        <Form onSubmit={onSubmit} errors={errors} productsSelectPromise={productsSelectPromise} />
      </CardContent>
    </Card>
  )
}

export default Create