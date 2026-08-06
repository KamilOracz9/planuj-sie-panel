"use client";

import { Form } from "@/features/channels";
import { Card, CardContent, CardHeader, CardTitle } from "@/features/shared/components/ui/card";
import { useTranslations } from "next-intl";

const Show = () => {
  const tChannels = useTranslations('Channels');

  return (
    <Card className="flex-1">
      <CardHeader>
        <CardTitle>{tChannels('show.title')}</CardTitle>
      </CardHeader>
      <CardContent>
        <Form />
      </CardContent>
    </Card>
  )
}

export default Show
