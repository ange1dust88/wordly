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
    color: "#b770e5",
  },
  unknown: {
    label: "Unknown",
    color: "#ef427e", 
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
    const total = known + unknown;
    const percentageKnown = (known / total) * 100;
  
    if (percentageKnown === 100) {
      setTitle("You're a professional! Excellent job!");
    } else if (percentageKnown >= 80) {
      setTitle("Great work! Keep up the good pace!");
    } else if (percentageKnown >= 50) {
      setTitle("You're doing well, keep pushing forward!");
    } else if (percentageKnown >= 30) {
      setTitle("Don't worry, keep trying, you can do it!");
    } else {
      setTitle("Keep going! You'll improve with practice!");
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
                <h3>🎉</h3>
            </div>
            <div className="result__main">

                <div className="result__main-header">
                    <h2 className="result__main-header-title">Your result</h2>
                    <h2 className="result__main-header-title">Next steps</h2>
                </div>
                <div className="result__main-chart">
                    <ChartContainer
                    config={chartConfig}
                    className="aspect-square max-h-[350px] min-h-[350px]" 
                    >
                    <PieChart height={350}>
                        <ChartTooltip
                        cursor={false}
                        content={<ChartTooltipContent />}
                        />
                        <Pie data={chartData} dataKey="value" nameKey="category" />
                    </PieChart>
                    </ChartContainer>
                </div>

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
