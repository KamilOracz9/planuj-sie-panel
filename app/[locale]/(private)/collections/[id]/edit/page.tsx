"use client";

import { updateCollection } from "@/app/actions/collection";
import { Form } from "@/features/collections";
import { collectionSchema } from "@/features/collections/schemas";
import { Route } from "@/features/routing";
import { Card, CardContent, CardHeader, CardTitle } from "@/features/shared/components/ui/card";
import { useTranslations } from "next-intl";
import { redirect, useParams } from "next/navigation";
import { useState } from "react";
import * as z from "zod"

const Edit = () => {
  const params = useParams();

  const tCollections = useTranslations('Collections');

  const [errors, setErrors] = useState<Record<string, string> | null>(null);

  function onSubmit(data: z.infer<typeof collectionSchema>) {
    const collectionId = Number(params.id);

    if (isNaN(collectionId)) {
      return;
    }

    updateCollection(data, collectionId).then((res) => {
      if (res.errors) {
        setErrors(res.errors);
      } else {
        redirect(Route.PRIVATE.COLLECTIONS.LIST.PATHNAME);
      }
    })
  }

  return (
    <Card className="flex-1">
      <CardHeader>
        <CardTitle>{tCollections('show.title')}</CardTitle>
      </CardHeader>
      <CardContent>
        <Form
          onSubmit={onSubmit}
          errors={errors}
        />
      </CardContent>
    </Card>
  )
}

export default Edit
