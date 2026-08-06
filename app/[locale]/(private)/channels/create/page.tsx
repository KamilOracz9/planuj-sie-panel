"use client"

import { createChannel } from "@/app/actions/channel";
import { Form } from "@/features/channels";
import { channelSchema } from "@/features/channels/schemas";
import { Route } from "@/features/routing";
import { Card, CardContent, CardHeader, CardTitle } from "@/features/shared/components/ui/card"
import { useTranslations } from "next-intl";
import { redirect } from "next/navigation";
import { useState } from "react";
import * as z from "zod"

const Create = () => {
  const tChannels = useTranslations('Channels');

  const [errors, setErrors] = useState<Record<string, string> | null>(null);

  function onSubmit(data: z.infer<typeof channelSchema>) {
    createChannel(data).then((res) => {
      if (res.errors) {
        setErrors(res.errors);
      } else {
        redirect(Route.PRIVATE.CHANNELS.LIST.PATHNAME);
      }
    })
  }

  return (
    <Card className="flex-1">
      <CardHeader>
        <CardTitle>{tChannels('create.title')}</CardTitle>
      </CardHeader>
      <CardContent>
        <Form onSubmit={onSubmit} errors={errors} />
      </CardContent>
    </Card>
  )
}

export default Create
