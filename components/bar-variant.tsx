import {
    Bar,
    BarChart,
    CartesianGrid,
    ResponsiveContainer,
    Tooltip,
    XAxis,
} from 'recharts'

import { CustomTooltip } from '@/components/custom-tooltip'
import { format } from 'date-fns'
import { useTheme } from 'next-themes'

type BarVariantProps = {
    data: {
        date: string
        income: number
        expenses: number
    }[]
}

export const BarVariant = ({ data }: BarVariantProps) => {
    const { theme } = useTheme()
    return (
        <ResponsiveContainer width="100%" height={350}>
            <BarChart data={data}>
                <CartesianGrid
                    stroke={theme === 'dark' ? '#1E293B' : '#e2e8f0'}
                    strokeDasharray="3 3"
                />

                <XAxis
                    axisLine={false}
                    tickLine={false}
                    dataKey="date"
                    tickFormatter={(value) => format(value, 'dd MMM')}
                    style={{
                        fontSize: '12px',
                    }}
                    tickMargin={16}
                />

                <Tooltip
                    content={({ active, payload }) => (
                        <CustomTooltip active={active} payload={payload} />
                    )}
                />

                <Bar
                    dataKey="income"
                    fill="#3d82f6"
                    className="drop-shadow-sm"
                />
                <Bar
                    dataKey="expenses"
                    fill="#f43f5e"
                    className="drop-shadow-sm"
                />
            </BarChart>
        </ResponsiveContainer>
    )
}