"use client"

import { createSeries } from "@/app/actions/series";
import { Form } from "@/features/series";
import { seriesSchema } from "@/features/series/schemas";
import { Route } from "@/features/routing";
import { Card, CardContent, CardHeader, CardTitle } from "@/features/shared/components/ui/card"
import { useTranslations } from "next-intl";
import { redirect } from "next/navigation";
import { useState } from "react";
import * as z from "zod"

const Create = () => {
  const tSeries = useTranslations('Series');

  const [errors, setErrors] = useState<Record<string, string> | null>(null);

  function onSubmit(data: z.infer<typeof seriesSchema>) {
    createSeries(data).then((res) => {
      if (res.errors) {
        setErrors(res.errors);
      } else {
        redirect(Route.PRIVATE.SERIES.LIST.PATHNAME);
      }
    })
  }

  return (
    <Card className="flex-1">
      <CardHeader>
        <CardTitle>{tSeries('create.title')}</CardTitle>
      </CardHeader>
      <CardContent>
        <Form onSubmit={onSubmit} errors={errors} />
      </CardContent>
    </Card>
  )
}

export default Create
