"use client"

import { createProduct } from "@/app/actions/product";
import { Form } from "@/features/products";
import { productSchema } from "@/features/products/schemas";
import { Route } from "@/features/routing";
import { Card, CardContent, CardHeader, CardTitle } from "@/features/shared/components/ui/card"
import { useTranslations } from "next-intl";
import { redirect } from "next/navigation";
import { useState } from "react";
import * as z from "zod"

const Create = () => {
  const tProducts = useTranslations('Products');

  const [errors, setErrors] = useState<Record<string, string> | null>(null);

  function onSubmit(data: z.infer<typeof productSchema>) {
    createProduct(data).then((res) => {
      if (res.errors) {
        setErrors(res.errors);
      } else {
        redirect(Route.PRIVATE.PRODUCTS.LIST.PATHNAME);
      }
    })
  }

  return (
    <Card className="flex-1">
      <CardHeader>
        <CardTitle>{tProducts('create.title')}</CardTitle>
      </CardHeader>
      <CardContent>
        <Form onSubmit={onSubmit} errors={errors} />
      </CardContent>
    </Card>
  )
}

export default Create