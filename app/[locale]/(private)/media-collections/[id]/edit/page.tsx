"use client";

import { updateMediaCollection } from "@/app/actions/media-collection";
import { Form } from "@/features/media-collections";
import { mediaCollectionSchema } from "@/features/media-collections/schemas";
import { Route } from "@/features/routing";
import { Card, CardContent, CardHeader, CardTitle } from "@/features/shared/components/ui/card";
import { useTranslations } from "next-intl";
import { redirect, useParams } from "next/navigation";
import { useState } from "react";
import * as z from "zod"

const Edit = () => {
  const params = useParams();

  const tMediaCollections = useTranslations('MediaCollections');

  const [errors, setErrors] = useState<Record<string, string> | null>(null);

  function onSubmit(data: z.infer<typeof mediaCollectionSchema>) {
    const mediaCollectionId = Number(params.id);

    if (isNaN(mediaCollectionId)) {
      return;
    }

    updateMediaCollection(data, mediaCollectionId).then((res) => {
      if (res.errors) {
        setErrors(res.errors);
      } else {
        redirect(Route.PRIVATE.MEDIA_COLLECTIONS.LIST.PATHNAME);
      }
    })
  }

  return (
    <Card className="flex-1">
      <CardHeader>
        <CardTitle>{tMediaCollections('show.title')}</CardTitle>
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
