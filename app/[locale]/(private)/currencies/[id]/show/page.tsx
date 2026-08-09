"use client";

import { Form } from "@/features/currencies";
import { Card, CardContent, CardHeader, CardTitle } from "@/features/shared/components/ui/card";
import { useTranslations } from "next-intl";

const Show = () => {
  const tCurrencies = useTranslations('Currencies');

  return (
    <Card className="flex-1">
      <CardHeader>
        <CardTitle>{tCurrencies('show.title')}</CardTitle>
      </CardHeader>
      <CardContent>
        <Form />
      </CardContent>
    </Card>
  )
}

export default Show
