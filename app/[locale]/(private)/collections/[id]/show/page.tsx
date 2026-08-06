"use client";

import { Form } from "@/features/collections";
import { Card, CardContent, CardHeader, CardTitle } from "@/features/shared/components/ui/card";
import { useTranslations } from "next-intl";

const Show = () => {
  const tCollections = useTranslations('Collections');

  return (
    <Card className="flex-1">
      <CardHeader>
        <CardTitle>{tCollections('show.title')}</CardTitle>
      </CardHeader>
      <CardContent>
        <Form />
      </CardContent>
    </Card>
  )
}

export default Show
