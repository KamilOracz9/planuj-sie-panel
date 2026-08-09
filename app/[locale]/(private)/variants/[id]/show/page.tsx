"use client";

import { Form, useVariant } from "@/features/variants";
import { Card, CardContent, CardHeader, CardTitle } from "@/features/shared/components/ui/card";
import { useTranslations } from "next-intl";

const Show = () => {
  const tVariants = useTranslations('Variants');

  const { variantPromise, productsSelectPromise, existingAttributesPromise, existingPricesPromise } = useVariant();

  return (
    <Card className="flex-1">
      <CardHeader>
        <CardTitle>{tVariants('show.title')}</CardTitle>
      </CardHeader>
      <CardContent>
        <Form variantPromise={variantPromise} productsSelectPromise={productsSelectPromise} existingAttributesPromise={existingAttributesPromise} existingPricesPromise={existingPricesPromise} />
      </CardContent>
    </Card>
  )
}

export default Show