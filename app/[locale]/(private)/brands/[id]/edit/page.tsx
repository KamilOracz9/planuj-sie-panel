"use client";

import { updateBrand } from "@/app/actions/brand";
import { Brand, BrandWithTranslations, Form, useBrand } from "@/features/brands";
import { Route } from "@/features/routing";
import { Card, CardContent, CardHeader, CardTitle } from "@/features/shared/components/ui/card";
import { transformData } from "@/features/shared/utils";
import { useTranslations } from "next-intl";
import { redirect, useParams } from "next/navigation";
import { FormEvent, useState } from "react";

const Edit = () => {
  const params = useParams();

  const tBrands = useTranslations('Brands');

  const [errors, setErrors] = useState<Record<string, string> | null>(null);

  const brandPromise = useBrand();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget as HTMLFormElement);
    const brandId = Number(params.id);

    if (isNaN(brandId)) {
      return;
    }

    const data = Object.fromEntries(formData.entries()) as Record<string, string>;

    setErrors(null);

    updateBrand(transformData(data), brandId).then((res) => {
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
        <Form brandPromise={brandPromise} handleSubmit={handleSubmit} errors={errors} />
      </CardContent>
    </Card>
  )
}

export default Edit