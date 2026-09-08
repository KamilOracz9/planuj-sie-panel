"use client"

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/features/shared/components/ui/table"
import { User } from "../types"
import { use, useState } from "react"
import { Button } from "@/features/shared/components/ui/button"
import { Edit, Eye, Inbox, Trash } from "lucide-react"
import { deleteUser } from "@/app/actions/user"
import { useLocale, useTranslations } from "next-intl"
import { Link, useRouter } from "@/lib/i18n/navigation"
import { Route } from "@/features/routing"
import { formatDate } from "@/lib/utils"

interface IndexTableProps {
    usersPromise: Promise<User[]>
}

const IndexTable = ({ usersPromise }: IndexTableProps) => {
    const tShared = useTranslations('Shared');
    const locale = useLocale();
    const router = useRouter();

    const [users, setUsers] = useState<User[]>(use(usersPromise));

    const handleDelete = async (userId: User['id']) => {
        deleteUser(userId).then(res => {
            setUsers(prev => prev.filter(user => user.id !== res.id));
        }).catch(err => {
            console.error('Failed to delete user:', err);
        });
    }

    return (
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead>{tShared('fields.name')}</TableHead>
                    <TableHead>{tShared('fields.email')}</TableHead>
                    <TableHead>{tShared('fields.created_at')}</TableHead>
                    <TableHead className="text-center w-20">{tShared('fields.actions')}</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {users.length === 0 && (
                    <TableRow>
                        <TableCell colSpan={4} className="h-32 text-center text-muted-foreground">
                            <div className="flex flex-col items-center justify-center gap-2">
                                <Inbox className="size-6" />
                                <span className="text-sm">{tShared('messages.no-items-found')}</span>
                            </div>
                        </TableCell>
                    </TableRow>
                )}
                {users.map((user) => (
                    <TableRow
                        key={user.id}
                        className="cursor-pointer"
                        onClick={() => router.push({ pathname: Route.PRIVATE.USERS.EDIT.PATHNAME, params: { id: user.id } })}
                    >
                        <TableCell>{user.name}</TableCell>
                        <TableCell>{user.email}</TableCell>
                        <TableCell>{formatDate(user.created_at, locale)}</TableCell>
                        <TableCell className="text-center" onClick={(e) => e.stopPropagation()}>
                            <div className="flex items-center justify-center gap-1">
                                <Button onClick={() => handleDelete(user.id)} variant="ghost" size="icon-sm" className="text-muted-foreground hover:text-destructive">
                                    <Trash className="h-4 w-4" />
                                </Button>
                                <Button variant="ghost" size="icon-sm" asChild>
                                    <Link href={{ pathname: Route.PRIVATE.USERS.SHOW.PATHNAME, params: { id: user.id } }} >
                                        <Eye className="h-4 w-4" />
                                    </Link>
                                </Button>
                                <Button variant="ghost" size="icon-sm" asChild>
                                    <Link href={{ pathname: Route.PRIVATE.USERS.EDIT.PATHNAME, params: { id: user.id } }} >
                                        <Edit className="h-4 w-4" />
                                    </Link>
                                </Button>
                            </div>
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    )
}

export default IndexTable