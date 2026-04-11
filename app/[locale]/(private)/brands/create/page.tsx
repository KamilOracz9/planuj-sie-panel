"use client"

import { createBrand } from "@/app/actions/brand";
import { BrandWithTranslations, Form } from "@/features/brands";
import { brandSchema } from "@/features/brands/schemas";
import { Route } from "@/features/routing";
import { Card, CardContent, CardHeader, CardTitle } from "@/features/shared/components/ui/card"
import { transformData } from "@/features/shared/utils";
import { useTranslations } from "next-intl";
import { redirect } from "next/navigation";
import { FormEvent, useState } from "react";
import * as z from "zod"

const Create = () => {
  const tBrands = useTranslations('Brands');

  const [errors, setErrors] = useState<Record<string, string> | null>(null);

  function onSubmit(data: z.infer<typeof brandSchema>) {
    createBrand(data).then((res) => {
      if(res.errors) {
        setErrors(res.errors);
      } else {
        redirect(Route.PRIVATE.BRANDS.LIST.PATHNAME);
      }
    })
  }

  return (
    <Card className="flex-1">
      <CardHeader>
        <CardTitle>{tBrands('create.title')}</CardTitle>
      </CardHeader>
      <CardContent>
        <Form onSubmit={onSubmit} errors={errors} />
      </CardContent>
    </Card>
  )
}

export default Create