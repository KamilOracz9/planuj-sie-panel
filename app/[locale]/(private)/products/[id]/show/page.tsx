"use client";

import { Form } from "@/features/products";
import { Card, CardContent, CardHeader, CardTitle } from "@/features/shared/components/ui/card";
import { useTranslations } from "next-intl";

const Show = () => {
  const tProducts = useTranslations('Products');

  return (
    <Card className="flex-1">
      <CardHeader>
        <CardTitle>{tProducts('show.title')}</CardTitle>
      </CardHeader>
      <CardContent>
        <Form />
      </CardContent>
    </Card>
  )
}

export default Show