"use client"

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/features/shared/components/ui/table"
import { Brand } from "../types"
import { use, useState } from "react"
import { Button } from "@/features/shared/components/ui/button"
import { Edit, Eye, Trash } from "lucide-react"
import { useTranslations } from "next-intl"
import { Link } from "@/lib/i18n/navigation"
import { Route } from "@/features/routing"
import { deleteBrand } from "@/app/actions/brand"

interface IndexTableProps {
    brandsPromise: Promise<Brand[]>
}

const IndexTable = ({ brandsPromise }: IndexTableProps) => {
    const tShared = useTranslations('Shared');

    const [brands, setBrands] = useState<Brand[]>(use(brandsPromise));

    const handleDelete = async (brandId: Brand['id']) => {
        deleteBrand(brandId).then(res => {
            setBrands(prev => prev.filter(brand => brand.id !== res.id));
        }).catch(err => {
            console.error('Failed to delete user:', err);
        });
    }

    return (
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead>{tShared('fields.name')}</TableHead>
                    <TableHead>{tShared('fields.slug')}</TableHead>
                    <TableHead>{tShared('fields.created_at')}</TableHead>
                    <TableHead className="text-center w-20">{tShared('fields.actions')}</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {brands.map((brand) => (
                    <TableRow key={brand.id}>
                        <TableCell>{brand.name}</TableCell>
                        <TableCell>{brand.slug}</TableCell>
                        <TableCell>{brand.created_at}</TableCell>
                        <TableCell className="text-center">
                            <Button onClick={() => handleDelete(brand.id)} variant="ghost" className="cursor-pointer">
                                <Trash className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" className="cursor-pointer" asChild>
                                <Link href={{ pathname: Route.PRIVATE.BRANDS.SHOW.PATHNAME, params: { id: brand.id } }} >
                                    <Eye className="h-4 w-4" />
                                </Link>
                            </Button>
                            <Button variant="ghost" className="cursor-pointer" asChild>
                                <Link href={{ pathname: Route.PRIVATE.BRANDS.EDIT.PATHNAME, params: { id: brand.id } }} >
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