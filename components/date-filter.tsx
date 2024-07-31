'use client'

import { format, startOfMonth, subDays } from 'date-fns'
import { ChevronDown } from 'lucide-react'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import qs from 'query-string'
import { useState } from 'react'
import { type DateRange } from 'react-day-picker'

import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import {
    Popover,
    PopoverClose,
    PopoverContent,
    PopoverTrigger,
} from '@/components/ui/popover'
import { useGetSummary } from '@/features/summary/api/use-get-summary'
import { cn, formatDateRange } from '@/lib/utils'

export const DateFilter = () => {
    const pathname = usePathname()
    const router = useRouter()
    const searchParams = useSearchParams()

    const accountId = searchParams.get('accountId')
    const from = searchParams.get('from') || ''
    const to = searchParams.get('to') || ''

    const defaultTo = new Date()
    const defaultFrom = startOfMonth(defaultTo)

    const paramState = {
        from: from ? new Date(from) : defaultFrom,
        to: to ? new Date(to) : defaultTo,
    }

    const [date, setDate] = useState<DateRange | undefined>(paramState)

    const pushToUrl = (dateRange: DateRange | undefined) => {
        const query = {
            from: format(dateRange?.from || defaultFrom, 'yyyy-MM-dd'),
            to: format(dateRange?.to || defaultTo, 'yyyy-MM-dd'),
            accountId,
        }
        console.log('query', query)

        const url = qs.stringifyUrl(
            {
                url: pathname,
                query,
            },
            { skipEmptyString: true, skipNull: true }
        )

        router.push(url)
    }

    const onReset = () => {
        setDate(undefined)
        pushToUrl(undefined)
    }

    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button
                    disabled={false}
                    size="sm"
                    variant="outline"
                    className="lg:w-auto w-full h-9 rounded-md px-3 font-normal bg-white/10 hover:bg-white/30 hover:text-white border-none focus:ring-offset-0 focus:ring-transparent outline-none text-white focus:bg-white/30 transition"
                >
                    <span>{formatDateRange(paramState)}</span>

                    <ChevronDown className="ml-2 size-4 opacity-50" />
                </Button>
            </PopoverTrigger>

            <PopoverContent className="lg:w-auto w-full p-0" align="start">
                <Calendar
                    disabled={false}
                    initialFocus
                    mode="range"
                    defaultMonth={date?.from}
                    selected={date}
                    onSelect={setDate}
                    numberOfMonths={2}
                />

                <div className="p-4 w-full flex items-center gap-x-2">
                    <PopoverClose asChild>
                        <Button
                            onClick={onReset}
                            disabled={!date?.from || !date?.to}
                            className="w-full"
                            variant="outline"
                        >
                            Reset
                        </Button>
                    </PopoverClose>

                    <PopoverClose asChild>
                        <Button
                            onClick={() => pushToUrl(date)}
                            disabled={!date?.from || !date?.to}
                            className="w-full"
                        >
                            Apply
                        </Button>
                    </PopoverClose>
                </div>
            </PopoverContent>
        </Popover>
    )
}