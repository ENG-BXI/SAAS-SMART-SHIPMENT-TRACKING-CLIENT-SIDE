'use client';

import {TrendingUp} from 'lucide-react';
import {CartesianGrid, LabelList, Line, LineChart, XAxis} from 'recharts';

import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from '@/components/ui/card';
import {ChartContainer, ChartTooltip, ChartTooltipContent, type ChartConfig} from '@/components/ui/chart';

export const description = 'A line chart with a label';

const chartConfig = {
  desktop: {
    label: 'count',
    color: '#4072EE'
  }
} satisfies ChartConfig;

export function ChartLineLabel({chartData}: {chartData: {month: string; count: number}[]}) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className='flex gap-2 leading-none font-medium'>
          <TrendingUp className='h-4 w-4' />
          مخطط جميع الشركات النشطة
        </CardTitle>
        <CardDescription></CardDescription>
      </CardHeader>
      <CardContent className='h-100'>
        <ChartContainer className='max-h-full w-full' config={chartConfig}>
          <LineChart
            accessibilityLayer
            data={chartData}
            margin={{
              top: 20,
              left: 12,
              right: 12
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis dataKey='month' tickLine={false} axisLine={false} tickMargin={8} tickFormatter={value => value.slice(0, 3)} />
            <ChartTooltip cursor={false} content={<ChartTooltipContent indicator='line' />} />
            <Line
              dataKey='count'
              type='natural'
              stroke='var(--color-desktop)'
              strokeWidth={2}
              dot={{
                fill: 'var(--color-desktop)'
              }}
              activeDot={{
                r: 6
              }}
            >
              <LabelList position='top' offset={12} className='fill-foreground' fontSize={12} />
            </Line>
          </LineChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
