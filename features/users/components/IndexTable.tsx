"use client"

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/features/shared/components/ui/table"
import { User } from "../types"
import { use, useState } from "react"
import { Button } from "@/features/shared/components/ui/button"
import { Edit, Eye, Trash } from "lucide-react"
import { deleteUser } from "@/app/actions/user"
import { useTranslations } from "next-intl"
import { Link } from "@/lib/i18n/navigation"
import { Route } from "@/features/routing"

interface IndexTableProps {
    usersPromise: Promise<User[]>
}

const IndexTable = ({ usersPromise }: IndexTableProps) => {
    const tUsers = useTranslations('Users');
    const tShared = useTranslations('Shared');

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
                    <TableHead>{tUsers('fields.name')}</TableHead>
                    <TableHead>{tUsers('fields.email')}</TableHead>
                    <TableHead>{tShared('fields.created_at')}</TableHead>
                    <TableHead className="text-center w-20">{tShared('fields.actions')}</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {users.map((user) => (
                    <TableRow key={user.id}>
                        <TableCell>{user.name}</TableCell>
                        <TableCell>{user.email}</TableCell>
                        <TableCell>{user.created_at}</TableCell>
                        <TableCell className="text-center">
                            <Button onClick={() => handleDelete(user.id)} variant="ghost" className="cursor-pointer">
                                <Trash className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" className="cursor-pointer" asChild>
                                <Link href={{ pathname: Route.PRIVATE.USERS.SHOW.PATHNAME, params: { id: user.id } }} >
                                    <Eye className="h-4 w-4" />
                                </Link>
                            </Button>
                            <Button variant="ghost" className="cursor-pointer" asChild>
                                <Link href={{ pathname: Route.PRIVATE.USERS.EDIT.PATHNAME, params: { id: user.id } }} >
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