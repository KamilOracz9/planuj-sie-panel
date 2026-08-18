"use client";

import { AttributeOptionForm, useAttributeOption } from "@/features/attributes";
import { Card, CardContent, CardHeader, CardTitle } from "@/features/shared/components/ui/card";
import { useTranslations } from "next-intl";

const Show = () => {
  const tAttributeOptions = useTranslations('AttributeOptions');

  const { optionPromise, existingPricesPromise } = useAttributeOption();

  return (
    <Card className="flex-1">
      <CardHeader>
        <CardTitle>{tAttributeOptions('show.title')}</CardTitle>
      </CardHeader>
      <CardContent>
        <AttributeOptionForm optionPromise={optionPromise} existingPricesPromise={existingPricesPromise} />
      </CardContent>
    </Card>
  )
}

export default Show
