'use client'

import { Button } from "@/components/ui/button"
import {Card,CardHeader,CardContent,CardTitle} from "@/components/ui/card"
import { useNewAccount } from "@/features/accounts/hooks/use-new-account"
import { useGetAccounts } from "@/features/accounts/api/use-get-account"
import { useBulkDeleteAccount } from "@/features/accounts/api/use-bulk-delete"

import { Loader2, Plus } from "lucide-react"
import { columns } from "./column"
import { DataTable } from "@/components/data-table"
import { Skeleton } from "@/components/ui/skeleton"


const AccountsPage = () => {
    const newAccount = useNewAccount()
    const deleteAccount=useBulkDeleteAccount()
    const accountsQuery = useGetAccounts()
    const account = accountsQuery.data || []
    const isDisabled=accountsQuery.isLoading || deleteAccount.isPending
    
    if (accountsQuery.isLoading) {
        return (
            <div className="max-w-screen-2xl mx-auto w-full pb-10 -mt-24">
                <Card className="border-none drop-shadow-sm">
                    <CardHeader>
                        <Skeleton className="h-8 w-48"/>
                    </CardHeader>
                    <CardContent>
                        <div className="h-[500px] w-full flex items-center justify-center">
                            <Loader2 className="size-6 text-slate-600 animate-spin"/>
                        </div>
                    </CardContent>
                </Card>
            </div>
        )
    }
    return (
        <div className="max-w-screen-2xl mx-auto w-full pb-10 -mt-24">
            <Card className="border-none drop-shadow-sm">
                <CardHeader className="gap-y-2 lg:flex-row lg:items-center lg:justify-between">
                    <CardTitle className="text-xl line-clamp-1">
                        Account page
                    </CardTitle>
                    <Button size="sm" onClick={newAccount.onOpen}>
                        <Plus className="size-4 mr-2"/>
                        Add new
                    </Button>
                </CardHeader>
                <CardContent>
                    <DataTable
                        disabled={ isDisabled}
                        filterKey="email"
                        columns={columns}
                        data={account}
                        onDelete={(row) => {
                            const ids = row.map((r) => r.original.id)
                            deleteAccount.mutate({ids})
                        }}
                    />
                </CardContent>
            </Card>
        </div>
    )
}

export default AccountsPage