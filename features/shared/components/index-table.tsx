"use client"

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/features/shared/components/ui/table"
import { use, useState } from "react"
import { Button } from "@/features/shared/components/ui/button"
import { Edit, Eye, Trash } from "lucide-react"
import { useTranslations } from "next-intl"
import { Link } from "@/lib/i18n/navigation"
import { Pathnames } from "@/features/routing"

type PrivateRouteWithId = Extract<Pathnames, `${string}[id]${string}`>

interface IndexTableProps<T extends { id: string | number }> {
  dataPromise: Promise<T[]>
    deleteAction?: (id: T["id"]) => Promise<unknown>
  routes: {
    show: PrivateRouteWithId
    edit: PrivateRouteWithId
  }
    fields: Array<Exclude<keyof T, "id">>
}

const IndexTable = <T extends { id: string | number }>({ dataPromise, deleteAction, routes, fields }: IndexTableProps<T>) => {
    const tShared = useTranslations('Shared');

    const [items, setItems] = useState<T[]>(use(dataPromise));

    const handleDelete = async (itemId: T['id']) => {
        if (deleteAction) {
            deleteAction(itemId).then(() => {
                setItems(prev => prev.filter(item => item.id !== itemId));
            }).catch(err => {
                console.error('Failed to delete item:', err);
            });
        }
    }

    return (
        <Table>
            <TableHeader>
                <TableRow>
                    {fields.map((field) => (
                        <TableHead key={String(field)}>{tShared(`fields.${String(field)}`)}</TableHead>
                    ))}
                    <TableHead className="text-center w-20">{tShared('fields.actions')}</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {items.map((item) => (
                    <TableRow key={item.id}>
                        {fields.map((field) => (
                            <TableCell key={String(field)}>{String(item[field])}</TableCell>
                        ))}
                        <TableCell className="text-center">
                            <Button onClick={() => handleDelete(item.id)} variant="ghost" className="cursor-pointer">
                                <Trash className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" className="cursor-pointer" asChild>
                                <Link href={{ pathname: routes.show, params: { id: item.id } }} >
                                    <Eye className="h-4 w-4" />
                                </Link>
                            </Button>
                            <Button variant="ghost" className="cursor-pointer" asChild>
                                <Link href={{ pathname: routes.edit, params: { id: item.id } }} >
                                    <Edit className="h-4 w-4" />
                                </Link>
                            </Button>
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    )
}

export default IndexTable