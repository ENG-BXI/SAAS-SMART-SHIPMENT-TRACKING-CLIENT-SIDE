'use client';

import {TrendingUp} from 'lucide-react';
import {CartesianGrid, LabelList, Line, LineChart, XAxis} from 'recharts';

import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from '@/components/ui/card';
import {ChartContainer, ChartTooltip, ChartTooltipContent, type ChartConfig} from '@/components/ui/chart';

export const description = 'A line chart with a label';

const chartData = [
  {month: 'January', desktop: 186, mobile: 80},
  {month: 'February', desktop: 305, mobile: 200},
  {month: 'March', desktop: 237, mobile: 120},
  {month: 'April', desktop: 73, mobile: 190},
  {month: 'May', desktop: 209, mobile: 130},
  {month: 'June', desktop: 214, mobile: 140},
  {month: 'July', desktop: 350, mobile: 140},
  {month: 'August', desktop: 150, mobile: 140},
  {month: 'September', desktop: 640, mobile: 140},
  {month: 'October', desktop: 100, mobile: 140},
  {month: 'November', desktop: 320, mobile: 140},
  {month: 'December', desktop: 50, mobile: 140}
];

const chartConfig = {
  desktop: {
    label: 'Desktop',
    color: '#4072EE'
  },
  mobile: {
    label: 'Mobile',
    color: '#4072EE'
  }
} satisfies ChartConfig;

export function ChartLineLabel() {
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
              dataKey='desktop'
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
