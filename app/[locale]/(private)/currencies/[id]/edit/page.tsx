"use client";

import { updateCurrency } from "@/app/actions/currency";
import { Form } from "@/features/currencies";
import { currencySchema } from "@/features/currencies/schemas";
import { Route } from "@/features/routing";
import { Card, CardContent, CardHeader, CardTitle } from "@/features/shared/components/ui/card";
import { useTranslations } from "next-intl";
import { redirect, useParams } from "next/navigation";
import { useState } from "react";
import * as z from "zod"

const Edit = () => {
  const params = useParams();

  const tCurrencies = useTranslations('Currencies');

  const [errors, setErrors] = useState<Record<string, string> | null>(null);

  function onSubmit(data: z.infer<typeof currencySchema>) {
    const currencyId = Number(params.id);

    if (isNaN(currencyId)) {
      return;
    }

    updateCurrency(data, currencyId).then((res) => {
      if (res.errors) {
        setErrors(res.errors);
      } else {
        redirect(Route.PRIVATE.CURRENCIES.LIST.PATHNAME);
      }
    })
  }

  return (
    <Card className="flex-1">
      <CardHeader>
        <CardTitle>{tCurrencies('show.title')}</CardTitle>
      </CardHeader>
      <CardContent>
        <Form
          onSubmit={onSubmit}
          errors={errors}
        />
      </CardContent>
    </Card>
  )
}

export default Edit
