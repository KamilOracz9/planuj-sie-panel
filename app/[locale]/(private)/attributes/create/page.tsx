"use client"

import { createAttribute } from "@/app/actions/attribute";
import { Form } from "@/features/attributes";
import { attributeSchema } from "@/features/attributes/schemas";
import { Route } from "@/features/routing";
import { Card, CardContent, CardHeader, CardTitle } from "@/features/shared/components/ui/card"
import { useTranslations } from "next-intl";
import { redirect } from "next/navigation";
import { useState } from "react";
import * as z from "zod"

const Create = () => {
  const tAttributes = useTranslations('Attributes');

  const [errors, setErrors] = useState<Record<string, string> | null>(null);

  function onSubmit(data: z.infer<typeof attributeSchema>) {
    createAttribute(data).then((res) => {
      if (res.errors) {
        setErrors(res.errors);
      } else {
        redirect(Route.PRIVATE.ATTRIBUTES.LIST.PATHNAME);
      }
    })
  }

  return (
    <Card className="flex-1">
      <CardHeader>
        <CardTitle>{tAttributes('create.title')}</CardTitle>
      </CardHeader>
      <CardContent>
        <Form onSubmit={onSubmit} errors={errors} />
      </CardContent>
    </Card>
  )
}

export default Create