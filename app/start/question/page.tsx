"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { questions } from "@/data/stress-data";
import { Progress } from "@/components/ui/progress";
import Link from "next/link";

export default function QuestionPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, number>>({});

  const currentQuestion = questions[currentQuestionIndex];
  const progress = ((currentQuestionIndex + 1) / questions.length) * 100;

  const handleAnswer = (value: number) => {
    const newAnswers = { ...answers, [currentQuestion.id]: value };
    setAnswers(newAnswers);

    if (currentQuestionIndex + 1 < questions.length) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      router.push(`/result?answers=${JSON.stringify(newAnswers)}`);
    }
  };

  if (!currentQuestion) {
    return (
      <div className='container mx-auto px-4 py-16 text-center'>
        <h1 className='text-2xl font-bold mb-4'>
          申し訳ありません。質問が見つかりません。
        </h1>
        <Link href='/'>
          <Button>トップページに戻る</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className='container mx-auto px-4 py-16'>
      <div className='max-w-2xl mx-auto space-y-8'>
        <Progress value={progress} className='w-full' />
        <Card>
          <CardHeader>
            <CardTitle className='text-2xl'>
              質問 {currentQuestionIndex + 1} / {questions.length}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className='text-xl mb-6'>{currentQuestion.text}</p>
          </CardContent>
          <CardFooter className='flex flex-col space-y-4'>
            {currentQuestion.options.map((option) => (
              <Button
                key={option.text}
                onClick={() => handleAnswer(option.value)}
                variant='outline'
                className='w-full text-lg py-6'
              >
                {option.text}
              </Button>
            ))}
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
