"use client"

import { createBrand } from "@/app/actions/brand";
import { fetchAttributesListForSelect } from "@/app/actions/attribute";
import { Form } from "@/features/brands";
import { brandSchema } from "@/features/brands/schemas";
import { Route } from "@/features/routing";
import { Card, CardContent, CardHeader, CardTitle } from "@/features/shared/components/ui/card"
import { useLocale, useTranslations } from "next-intl";
import { redirect } from "next/navigation";
import { useEffect, useState } from "react";
import * as z from "zod"
import { Attribute } from "@/features/attributes";

const Create = () => {
  const locale = useLocale();
  const tBrands = useTranslations('Brands');

  const [errors, setErrors] = useState<Record<string, string> | null>(null);
  const [attributesSelectPromise, setAttributesSelectPromise] = useState<Promise<Attribute[]> | undefined>(undefined);

  function onSubmit(data: z.infer<typeof brandSchema>) {
    createBrand(data).then((res) => {
      if (res.errors) {
        setErrors(res.errors);
      } else {
        redirect(Route.PRIVATE.BRANDS.LIST.PATHNAME);
      }
    })
  }

  useEffect(() => {
    setAttributesSelectPromise(fetchAttributesListForSelect({ locale }));
  }, [locale]);

  return (
    <Card className="flex-1">
      <CardHeader>
        <CardTitle>{tBrands('create.title')}</CardTitle>
      </CardHeader>
      <CardContent>
        <Form onSubmit={onSubmit} errors={errors} attributesSelectPromise={attributesSelectPromise} />
      </CardContent>
    </Card>
  )
}

export default Create