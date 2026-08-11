"use client";

import { updateVariant } from "@/app/actions/variants";
import { Form, useVariant } from "@/features/variants";
import { variantSchema } from "@/features/variants/schemas";
import { Route } from "@/features/routing";
import { Card, CardContent, CardHeader, CardTitle } from "@/features/shared/components/ui/card";
import { useTranslations } from "next-intl";
import { redirect, useParams } from "next/navigation";
import { useState } from "react";
import * as z from "zod"

const Edit = () => {
  const params = useParams();

  const tVariants = useTranslations('Variants');

  const [errors, setErrors] = useState<Record<string, string> | null>(null);

  const { variantPromise, productsSelectPromise, existingAttributesPromise, existingChannelsPromise, existingPricesPromise } = useVariant();

  function onSubmit(data: z.infer<typeof variantSchema>) {
    const variantId = Number(params.id);

    if (isNaN(variantId)) {
      return;
    }

    updateVariant(data, variantId).then((res) => {
      if (res.errors) {
        setErrors(res.errors);
      } else {
        redirect(Route.PRIVATE.VARIANTS.LIST.PATHNAME);
      }
    })
  }

  return (
    <Card className="flex-1">
      <CardHeader>
        <CardTitle>{tVariants('edit.title')}</CardTitle>
      </CardHeader>
      <CardContent>
        <Form variantPromise={variantPromise} productsSelectPromise={productsSelectPromise} existingAttributesPromise={existingAttributesPromise} existingChannelsPromise={existingChannelsPromise} existingPricesPromise={existingPricesPromise} onSubmit={onSubmit} errors={errors} />
      </CardContent>
    </Card>
  )
}

export default Edit