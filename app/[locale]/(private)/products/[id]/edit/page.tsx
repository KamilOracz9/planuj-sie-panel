"use client";

import { updateProduct } from "@/app/actions/product";
import { Form, useProduct } from "@/features/products";
import { productSchema } from "@/features/products/schemas";
import { Route } from "@/features/routing";
import { Card, CardContent, CardHeader, CardTitle } from "@/features/shared/components/ui/card";
import { useTranslations } from "next-intl";
import { redirect, useParams } from "next/navigation";
import {  useState } from "react";
import * as z from "zod"

const Edit = () => {
  const params = useParams();

  const tProducts = useTranslations('Products');

  const [errors, setErrors] = useState<Record<string, string> | null>(null);

  const productPromise = useProduct();

  function onSubmit(data: z.infer<typeof productSchema>) {
    const productId = Number(params.id);

    if (isNaN(productId)) {
      return;
    }

    updateProduct(data, productId).then((res) => {
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
        <CardTitle>{tProducts('edit.title')}</CardTitle>
      </CardHeader>
      <CardContent>
        <Form productPromise={productPromise} onSubmit={onSubmit} errors={errors} />
      </CardContent>
    </Card>
  )
}

export default Edit