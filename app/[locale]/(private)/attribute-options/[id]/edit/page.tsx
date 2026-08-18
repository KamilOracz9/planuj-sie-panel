"use client";

import { updateAttributeOption } from "@/app/actions/attribute-option";
import { AttributeOptionForm, useAttributeOption } from "@/features/attributes";
import { attributeOptionSchema } from "@/features/attributes/schemas";
import { Route } from "@/features/routing";
import { Card, CardContent, CardHeader, CardTitle } from "@/features/shared/components/ui/card";
import { useTranslations } from "next-intl";
import { redirect, useParams } from "next/navigation";
import { useState } from "react";
import * as z from "zod"

const Edit = () => {
  const params = useParams();

  const tAttributeOptions = useTranslations('AttributeOptions');

  const [errors, setErrors] = useState<Record<string, string> | null>(null);

  const { optionPromise, existingPricesPromise } = useAttributeOption();

  function onSubmit(data: z.infer<typeof attributeOptionSchema>) {
    const optionId = Number(params.id);

    if (isNaN(optionId)) {
      return;
    }

    updateAttributeOption(data, optionId).then((res) => {
      if (res.errors) {
        setErrors(res.errors);
      } else {
        redirect(Route.PRIVATE.ATTRIBUTE_OPTIONS.LIST.PATHNAME);
      }
    })
  }

  return (
    <Card className="flex-1">
      <CardHeader>
        <CardTitle>{tAttributeOptions('edit.title')}</CardTitle>
      </CardHeader>
      <CardContent>
        <AttributeOptionForm optionPromise={optionPromise} existingPricesPromise={existingPricesPromise} onSubmit={onSubmit} errors={errors} />
      </CardContent>
    </Card>
  )
}

export default Edit
