"use client";

import { Form } from "@/features/series";
import { Card, CardContent, CardHeader, CardTitle } from "@/features/shared/components/ui/card";
import { useTranslations } from "next-intl";

const Show = () => {
  const tSeries = useTranslations('Series');

  return (
    <Card className="flex-1">
      <CardHeader>
        <CardTitle>{tSeries('show.title')}</CardTitle>
      </CardHeader>
      <CardContent>
        <Form />
      </CardContent>
    </Card>
  )
}

export default Show
