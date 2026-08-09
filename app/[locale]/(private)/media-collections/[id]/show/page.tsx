"use client";

import { Form } from "@/features/media-collections";
import { Card, CardContent, CardHeader, CardTitle } from "@/features/shared/components/ui/card";
import { useTranslations } from "next-intl";

const Show = () => {
  const tMediaCollections = useTranslations('MediaCollections');

  return (
    <Card className="flex-1">
      <CardHeader>
        <CardTitle>{tMediaCollections('show.title')}</CardTitle>
      </CardHeader>
      <CardContent>
        <Form />
      </CardContent>
    </Card>
  )
}

export default Show
