"use client"

import { createAttributeOption } from "@/app/actions/attribute-option";
import { AttributeOptionForm } from "@/features/attributes";
import { attributeOptionSchema } from "@/features/attributes/schemas";
import { Route } from "@/features/routing";
import { Card, CardContent, CardHeader, CardTitle } from "@/features/shared/components/ui/card"
import { useTranslations } from "next-intl";
import { redirect, useSearchParams } from "next/navigation";
import { useState } from "react";
import * as z from "zod"

const Create = () => {
  const tAttributeOptions = useTranslations('AttributeOptions');
  const searchParams = useSearchParams();
  const preselectedAttributeId = Number(searchParams.get('attribute_id')) || null;

  const [errors, setErrors] = useState<Record<string, string> | null>(null);

  function onSubmit(data: z.infer<typeof attributeOptionSchema>) {
    createAttributeOption(data).then((res) => {
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
        <CardTitle>{tAttributeOptions('create.title')}</CardTitle>
      </CardHeader>
      <CardContent>
        <AttributeOptionForm
          onSubmit={onSubmit}
          errors={errors}
          defaultAttributeId={preselectedAttributeId}
        />
      </CardContent>
    </Card>
  )
}

export default Create
