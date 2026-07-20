"use client";

import { updateBrand } from "@/app/actions/brand";
import { Form, useBrand } from "@/features/brands";
import { brandSchema } from "@/features/brands/schemas";
import { Route } from "@/features/routing";
import { Card, CardContent, CardHeader, CardTitle } from "@/features/shared/components/ui/card";
import { useTranslations } from "next-intl";
import { redirect, useParams } from "next/navigation";
import { useState } from "react";
import * as z from "zod"

const Edit = () => {
  const params = useParams();

  const tBrands = useTranslations('Brands');

  const [errors, setErrors] = useState<Record<string, string> | null>(null);

  const { brandPromise, attributesSelectPromise, existingAttributesPromise } = useBrand();

  function onSubmit(data: z.infer<typeof brandSchema>) {
    const brandId = Number(params.id);

    if (isNaN(brandId)) {
      return;
    }

    updateBrand(data, brandId).then((res) => {
      if (res.errors) {
        setErrors(res.errors);
      } else {
        redirect(Route.PRIVATE.BRANDS.LIST.PATHNAME);
      }
    })
  }

  return (
    <Card className="flex-1">
      <CardHeader>
        <CardTitle>{tBrands('show.title')}</CardTitle>
      </CardHeader>
      <CardContent>
        <Form
          brandPromise={brandPromise}
          onSubmit={onSubmit}
          errors={errors}
          attributesSelectPromise={attributesSelectPromise}
          existingAttributesPromise={existingAttributesPromise}
        />
      </CardContent>
    </Card>
  )
}

export default Edit