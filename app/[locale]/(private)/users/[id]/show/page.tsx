"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/features/shared/components/ui/card";
import { Form, useUser } from "@/features/users";
import { useTranslations } from "next-intl";

const Show = () => {
  const tUsers = useTranslations('Users');

  const userPromise = useUser();

  return (
    <Card className="flex-1">
      <CardHeader>
        <CardTitle>{tUsers('show.title')}</CardTitle>
      </CardHeader>
      <CardContent>
        <Form userPromise={userPromise} />
      </CardContent>
    </Card>
  )
}

export default Show