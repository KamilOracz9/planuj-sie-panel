"use client"

import { createBrand } from "@/app/actions/brand";
import { BrandWithTranslations, Form } from "@/features/brands";
import { Route } from "@/features/routing";
import { Card, CardContent, CardHeader, CardTitle } from "@/features/shared/components/ui/card"
import { transformData } from "@/features/shared/utils";
import { useTranslations } from "next-intl";
import { redirect } from "next/navigation";
import { FormEvent, useState } from "react";

const Create = () => {
  const tBrands = useTranslations('Brands');

  const [errors, setErrors] = useState<Record<string, string> | null>(null);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget as HTMLFormElement);

    const data = Object.fromEntries(formData.entries()) as Record<string, string>;

    createBrand(transformData(data)).then((res) => {
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
          <Form handleSubmit={handleSubmit} errors={errors} />
      </CardContent>
    </Card>
  )
}

export default Create