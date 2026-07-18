"use client"

import { createAttribute, fetchAttributeTypesListForSelect } from "@/app/actions/attribute";
import { AttributeType, Form } from "@/features/attributes";
import { attributeSchema } from "@/features/attributes/schemas";
import { Route } from "@/features/routing";
import { Card, CardContent, CardHeader, CardTitle } from "@/features/shared/components/ui/card"
import { useLocale, useTranslations } from "next-intl";
import { redirect } from "next/navigation";
import { useEffect, useState } from "react";
import * as z from "zod"

const Create = () => {
  const locale = useLocale();
  const tAttributes = useTranslations('Attributes');

  const [errors, setErrors] = useState<Record<string, string> | null>(null);
  const [attributeTypesSelectPromise, setAttributeTypesSelectPromise] = useState<Promise<AttributeType[]> | undefined>(undefined);

  function onSubmit(data: z.infer<typeof attributeSchema>) {
    createAttribute(data).then((res) => {
      if (res.errors) {
        setErrors(res.errors);
      } else {
        redirect(Route.PRIVATE.ATTRIBUTES.LIST.PATHNAME);
      }
    })
  }

  useEffect(() => {
    setAttributeTypesSelectPromise(fetchAttributeTypesListForSelect({ locale }));
  }, [locale]);

  return (
    <Card className="flex-1">
      <CardHeader>
        <CardTitle>{tAttributes('create.title')}</CardTitle>
      </CardHeader>
      <CardContent>
        <Form onSubmit={onSubmit} errors={errors} attributeTypesSelectPromise={attributeTypesSelectPromise} />
      </CardContent>
    </Card>
  )
}

export default Create