"use client";

import { Form } from "@/features/brands";
import { Card, CardContent, CardHeader, CardTitle } from "@/features/shared/components/ui/card";
import { useTranslations } from "next-intl";

const Show = () => {
  const tBrands = useTranslations('Brands');

  return (
    <Card className="flex-1">
      <CardHeader>
        <CardTitle>{tBrands('show.title')}</CardTitle>
      </CardHeader>
      <CardContent>
        <Form />
      </CardContent>
    </Card>
  )
}

export default Show