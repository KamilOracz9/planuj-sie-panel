"use client";

import { updateUser } from "@/app/actions/user";
import { Route } from "@/features/routing";
import { Card, CardContent, CardHeader, CardTitle } from "@/features/shared/components/ui/card";
import { Form, User, useUser } from "@/features/users";
import { useTranslations } from "next-intl";
import { redirect, useParams } from "next/navigation";
import { FormEvent, useState } from "react";

const Edit = () => {
  const params = useParams();

  const tUsers = useTranslations('Users');

  const [errors, setErrors] = useState<Record<string, string> | null>(null);

  const userPromise = useUser();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget as HTMLFormElement);
    const userId = Number(params.id);

    if (isNaN(userId)) {
      return;
    }

    const data = Object.fromEntries(formData.entries()) as unknown as User;

    updateUser(data, userId).then((res) => {
      if (res.errors) {
        setErrors(res.errors);
      } else {
        redirect(Route.PRIVATE.USERS.LIST.PATHNAME);
      }
    })
  }

  return (
    <Card className="flex-1">
      <CardHeader>
        <CardTitle>{tUsers('show.title')}</CardTitle>
      </CardHeader>
      <CardContent>
        <Form userPromise={userPromise} handleSubmit={handleSubmit} errors={errors} />
      </CardContent>
    </Card>
  )
}

export default Edit