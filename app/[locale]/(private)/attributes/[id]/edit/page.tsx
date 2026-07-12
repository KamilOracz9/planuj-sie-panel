"use client";

import { updateAttribute } from "@/app/actions/attribute";
import { Form, useAttribute } from "@/features/attributes";
import { attributeSchema } from "@/features/attributes/schemas";
import { Route } from "@/features/routing";
import { Card, CardContent, CardHeader, CardTitle } from "@/features/shared/components/ui/card";
import { useTranslations } from "next-intl";
import { redirect, useParams } from "next/navigation";
import {  useState } from "react";
import * as z from "zod"

const Edit = () => {
  const params = useParams();

  const tAttributes = useTranslations('Attributes');

  const [errors, setErrors] = useState<Record<string, string> | null>(null);

  const attributePromise = useAttribute();

  function onSubmit(data: z.infer<typeof attributeSchema>) {
    const productId = Number(params.id);

    if (isNaN(productId)) {
      return;
    }

    updateAttribute(data, productId).then((res) => {
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
        <CardTitle>{tAttributes('edit.title')}</CardTitle>
      </CardHeader>
      <CardContent>
        <Form attributePromise={attributePromise} onSubmit={onSubmit} errors={errors} />
      </CardContent>
    </Card>
  )
}

export default Edit