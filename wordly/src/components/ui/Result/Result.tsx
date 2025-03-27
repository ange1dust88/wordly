import './result.scss'
import { Pie, PieChart } from "recharts"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
import { useState, useEffect } from 'react'

const chartData = [
  { category: "Known", value: 0, fill: "var(--color-known)" },
  { category: "Unknown", value: 0, fill: "var(--color-unknown)" },
]

const chartConfig = {
  known: {
    label: "Known",
    color: "#05ce69",
  },
  unknown: {
    label: "Unknown",
    color: "#c71d1d", 
  },
} satisfies ChartConfig
  
interface ResultTypes {
  known: number;
  unknown: number;
  onRestart: () => void;
}

function Result({ known, unknown, onRestart }: ResultTypes) {
  chartData[0].value = known
  chartData[1].value = unknown
  

  const [title, setTitle] = useState<string>('Nice');

  const updateTitle = () => {
    if (known > unknown) {
      setTitle("Great job!");
    } else if (unknown > known) {
      setTitle("Keep going!");
    } else {
      setTitle("Keep it up!");
    }
  };


  useEffect(() => {
    updateTitle();
  }, [known, unknown]);

  return (
    <div className='result'>
        <div className="result__container">
            <div className="result__header">
                <h2 className="result__header-title">{title}</h2>
                <h2 className="result__header-title">Next steps</h2>
            </div>
            <div className="result__main">
                <ChartContainer
                config={chartConfig}
                className="mx-auto aspect-square max-h-[350px] min-h-[350px]" 
                >
                <PieChart height={350}>
                    <ChartTooltip
                    cursor={false}
                    content={<ChartTooltipContent />}
                    />
                    <Pie data={chartData} dataKey="value" nameKey="category" />
                </PieChart>
                </ChartContainer>

                <div className="result__main-extended">
                    <p className='right right-block'>Known  <span className='right'>{known}</span></p>
                    <p className='wrong wrong-block'>Unknown  <span className='wrong'>{unknown}</span></p>
                </div>

                <div className="result__main-navs">
                    <button 
                        className="result__main-navs-button"
                        onClick={onRestart}>
                        Restart</button>
                </div>
            </div>

        </div>
    </div>
  )
}

export default Result
