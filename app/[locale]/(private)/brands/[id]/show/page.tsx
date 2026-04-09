"use client";

import { Form, useBrand } from "@/features/brands";
import { Card, CardContent, CardHeader, CardTitle } from "@/features/shared/components/ui/card";
import { useTranslations } from "next-intl";

const Show = () => {
  const tBrands = useTranslations('Brands');

  const brandPromise = useBrand();

  return (
    <Card className="flex-1">
      <CardHeader>
        <CardTitle>{tBrands('show.title')}</CardTitle>
      </CardHeader>
      <CardContent>
        <Form brandPromise={brandPromise} />
      </CardContent>
    </Card>
  )
}

export default Show