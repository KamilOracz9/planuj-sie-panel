"use client";

import { Form, useProduct } from "@/features/products";
import { Card, CardContent, CardHeader, CardTitle } from "@/features/shared/components/ui/card";
import { useTranslations } from "next-intl";

const Show = () => {
  const tProducts = useTranslations('Products');

  const productPromise = useProduct();

  return (
    <Card className="flex-1">
      <CardHeader>
        <CardTitle>{tProducts('show.title')}</CardTitle>
      </CardHeader>
      <CardContent>
        <Form productPromise={productPromise} />
      </CardContent>
    </Card>
  )
}

export default Show