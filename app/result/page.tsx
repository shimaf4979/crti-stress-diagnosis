"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import * as d3 from "d3";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { stressCategories, questions } from "@/data/stress-data";
import { useInView } from "react-intersection-observer";

const stressTypes = [
  {
    title: "自己探求の迷宮（Identity Labyrinth）",
    description:
      "自分の価値観や目標がわからない、自己肯定感が低いといった悩み。",
    examples: ["本当にやりたいことがわからない", "自分に自信がない"],
  },
  {
    title: "人間関係のパズル（Relationship Puzzle）",
    description: "他人との関係性における葛藤や摩擦。",
    examples: ["友達や同僚とうまくいかない", "恋愛がうまくいかない"],
  },
  {
    title: "社会的役割の重圧（Social Pressure）",
    description: "社会的な期待や役割からのプレッシャー。",
    examples: ["親や上司からの期待に応えられない", "他人の目が気になる"],
  },
  {
    title: "環境の枷（Environmental Trap）",
    description: "周囲の物理的・社会的環境に起因する制約。",
    examples: ["職場環境が悪い", "住む場所が不便で困っている"],
  },
  {
    title: "資金不足のジレンマ（Financial Dilemma）",
    description: "お金にまつわる問題や不安。",
    examples: ["収入が足りない", "借金が返せない", "投資に失敗した"],
  },
  {
    title: "時間管理の迷路（Time Management Maze）",
    description: "時間の使い方や不足に関する悩み。",
    examples: ["忙しすぎて余裕がない", "やりたいことが多すぎて時間が足りない"],
  },
  {
    title: "変化への恐怖（Fear of Change）",
    description: "変化や新しい挑戦に対する不安。",
    examples: ["新しい仕事に挑戦するのが怖い", "現状維持が楽だが進歩がない"],
  },
  {
    title: "未来の霧（Uncertain Future）",
    description: "未来への不安や将来設計に関する悩み。",
    examples: ["このままで幸せになれるのか", "老後が心配"],
  },
  {
    title: "比較の罠（Comparison Trap）",
    description: "他人との比較による自己評価の低下。",
    examples: [
      "SNSで他人の成功を見て落ち込む",
      "自分は周りより劣っている気がする",
    ],
  },
  {
    title: "持続可能性の葛藤（Sustainability Struggle）",
    description: "環境や社会的な影響に対する意識と行動のギャップ。",
    examples: [
      "環境に良いことをしたいが、生活が不便になるのが嫌だ",
      "仕事が社会に悪影響を与えていないか気になる",
    ],
  },
];

export default function ResultPage() {
  const searchParams = useSearchParams();
  const answers = JSON.parse(searchParams.get("answers") || "{}");
  const [selectedStressType, setSelectedStressType] = useState(stressTypes[0]);

  const totalScore = Object.values(answers).reduce(
    (sum: number, value: number) => sum + value,
    0
  );
  const maxPossibleScore = questions.length * 4; // 4 is the maximum score per question
  const stressPercentage = (totalScore / maxPossibleScore) * 100;

  const categoryScores = stressCategories.map((category) => {
    const categoryQuestions = questions.filter(
      (q) => q.category === category.id
    );
    const categoryScore = categoryQuestions.reduce(
      (sum, q) => sum + (answers[q.id] || 0),
      0
    );
    const maxCategoryScore = categoryQuestions.length * 4;
    return {
      category: category.title,
      score: (categoryScore / maxCategoryScore) * 100,
      averageScore: 50, // This is a placeholder. In a real app, you'd calculate this based on actual data.
    };
  });

  // Determine the stress type based on the highest category score
  useEffect(() => {
    const highestScoreCategory = categoryScores.reduce((prev, current) =>
      current.score > prev.score ? current : prev
    );
    const stressTypeIndex = Math.floor(highestScoreCategory.score / 20); // 0-4
    setSelectedStressType(stressTypes[stressTypeIndex]);
  }, [categoryScores]);

  const { ref: circleChartRef, inView: circleChartInView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const { ref: barChartRef, inView: barChartInView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  useEffect(() => {
    if (circleChartInView) {
      drawCircleChart();
    }
  }, [circleChartInView]);

  useEffect(() => {
    if (barChartInView) {
      drawBarChart();
    }
  }, [barChartInView]);

  const drawCircleChart = () => {
    const svg = d3.select("#circleChart");
    svg.selectAll("*").remove(); // Clear previous chart

    const width = 400;
    const height = 400;
    const radius = Math.min(width, height) / 2;

    svg
      .attr("width", width)
      .attr("height", height)
      .append("g")
      .attr("transform", `translate(${width / 2},${height / 2})`);

    const arc = d3
      .arc()
      .innerRadius(radius * 0.6)
      .outerRadius(radius)
      .startAngle(0);

    const background = svg
      .select("g")
      .append("path")
      .datum({ endAngle: 2 * Math.PI })
      .style("fill", "#ddd")
      .attr("d", arc as any);

    const foreground = svg
      .select("g")
      .append("path")
      .datum({ endAngle: 0 })
      .style("fill", "#7c3aed")
      .attr("d", arc as any);

    const percentageText = svg
      .select("g")
      .append("text")
      .attr("text-anchor", "middle")
      .attr("dy", "0.3em")
      .style("font-size", "2em")
      .style("fill", "#1a1a1a");

    foreground
      .transition()
      .duration(2000)
      .attrTween("d", (d: any) => {
        const interpolate = d3.interpolate(
          d.endAngle,
          2 * Math.PI * (stressPercentage / 100)
        );
        return (t) => {
          d.endAngle = interpolate(t);
          return arc(d as any) as string;
        };
      });

    percentageText
      .transition()
      .duration(2000)
      .tween("text", () => {
        const interpolate = d3.interpolate(0, stressPercentage);
        return (t) => {
          percentageText.text(`${Math.round(interpolate(t))}%`);
        };
      });
  };

  const drawBarChart = () => {
    const svg = d3.select("#barChart");
    svg.selectAll("*").remove(); // Clear previous chart

    const margin = { top: 20, right: 30, bottom: 40, left: 90 };
    const width = 600 - margin.left - margin.right;
    const height = 400 - margin.top - margin.bottom;

    svg
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);

    const x = d3.scaleLinear().domain([0, 100]).range([0, width]);

    const y = d3
      .scaleBand()
      .range([0, height])
      .domain(categoryScores.map((d) => d.category))
      .padding(0.1);

    svg.append("g").call(d3.axisLeft(y));

    svg
      .append("g")
      .attr("transform", `translate(0,${height})`)
      .call(d3.axisBottom(x));

    svg
      .selectAll("myRect")
      .data(categoryScores)
      .join("rect")
      .attr("x", x(0))
      .attr("y", (d) => y(d.category) as number)
      .attr("width", 0)
      .attr("height", y.bandwidth())
      .attr("fill", "#7c3aed")
      .transition()
      .duration(1000)
      .attr("width", (d) => x(d.score));

    svg
      .selectAll("myLine")
      .data(categoryScores)
      .join("line")
      .attr("x1", (d) => x(d.averageScore))
      .attr("x2", (d) => x(d.averageScore))
      .attr("y1", (d) => (y(d.category) as number) + y.bandwidth())
      .attr("y2", (d) => y(d.category) as number)
      .attr("stroke", "red")
      .attr("stroke-width", 2);
  };

  return (
    <div className='container mx-auto px-4 py-16'>
      <div className='max-w-3xl mx-auto space-y-12'>
        <div className='text-center space-y-4'>
          <h1 className='text-4xl font-bold'>診断結果</h1>
          <p className='text-xl text-gray-600'>あなたのストレスタイプ</p>
        </div>

        <div className='bg-white rounded-lg shadow-lg p-8 space-y-6'>
          <h2 className='text-2xl font-semibold'>{selectedStressType.title}</h2>
          <p className='text-gray-600'>{selectedStressType.description}</p>
          <ul className='list-disc list-inside'>
            {selectedStressType.examples.map((example, index) => (
              <li key={index} className='text-gray-600'>
                {example}
              </li>
            ))}
          </ul>
        </div>

        <div ref={circleChartRef} className='flex justify-center'>
          <svg id='circleChart' />
        </div>

        <div className='space-y-6'>
          <h2 className='text-2xl font-semibold'>カテゴリー別ストレスレベル</h2>
          <p className='text-gray-600'>赤線は一般的な平均値を示しています。</p>
          <div ref={barChartRef} className='flex justify-center'>
            <svg id='barChart' />
          </div>
        </div>

        <div className='bg-white rounded-lg shadow-lg p-8 space-y-6'>
          <h2 className='text-2xl font-semibold'>改善のアドバイス</h2>
          <ul className='space-y-4 text-lg'>
            <li className='flex items-start'>
              <span className='mr-4'>👉</span>
              定期的な休憩を取り、リラックスする時間を確保しましょう
            </li>
            <li className='flex items-start'>
              <span className='mr-4'>👉</span>
              信頼できる人に相談することで、ストレスを軽減できます
            </li>
            <li className='flex items-start'>
              <span className='mr-4'>👉</span>
              運動や趣味の時間を作り、気分転換を心がけましょう
            </li>
          </ul>
        </div>

        <div className='text-center'>
          <Link href='/'>
            <Button variant='outline' size='lg'>
              トップページに戻る
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
