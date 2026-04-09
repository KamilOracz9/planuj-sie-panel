"use client"

import { createUser } from "@/app/actions/user";
import { Route } from "@/features/routing";
import { Card, CardContent, CardHeader, CardTitle } from "@/features/shared/components/ui/card"
import { Form } from "@/features/users";
import { useTranslations } from "next-intl";
import { redirect } from "next/navigation";
import { FormEvent, useState } from "react";

const Create = () => {
  const tUsers = useTranslations('Users');

  const [errors, setErrors] = useState<Record<string, string> | null>(null);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget as HTMLFormElement);

    createUser(formData).then((res) => {
      if(res.errors) {
        setErrors(res.errors);
      } else {
        redirect(Route.PRIVATE.USERS.LIST.PATHNAME);
      }
    })
  }

  return (
    <Card className="flex-1">
      <CardHeader>
        <CardTitle>{tUsers('create.title')}</CardTitle>
      </CardHeader>
      <CardContent>
          <Form handleSubmit={handleSubmit} errors={errors} />
      </CardContent>
    </Card>
  )
}

export default Create