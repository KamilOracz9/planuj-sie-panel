"use client";

import { Form, useAttribute } from "@/features/attributes";
import { Card, CardContent, CardHeader, CardTitle } from "@/features/shared/components/ui/card";
import { useTranslations } from "next-intl";

const Show = () => {
  const tProducts = useTranslations('Products');

  const attributePromise = useAttribute();

  return (
    <Card className="flex-1">
      <CardHeader>
        <CardTitle>{tProducts('show.title')}</CardTitle>
      </CardHeader>
      <CardContent>
        <Form attributePromise={attributePromise} />
      </CardContent>
    </Card>
  )
}

export default Show