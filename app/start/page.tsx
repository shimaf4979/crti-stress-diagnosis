import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import Link from "next/link";
import { stressCategories } from "@/data/stress-data";

export default function StartPage() {
  return (
    <div className='container mx-auto px-4 py-16'>
      <div className='max-w-4xl mx-auto space-y-8'>
        <h1 className='text-3xl font-bold text-center mb-8'>
          あなたの悩みに最も近い項目を選んでください
        </h1>
        <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-6'>
          {stressCategories.map((category) => (
            <Link
              key={category.id}
              href={`/start/question?category=${category.id}`}
            >
              <Card className='hover:shadow-lg transition-shadow cursor-pointer h-full'>
                <CardHeader>
                  <CardTitle>{category.title}</CardTitle>
                  <CardDescription>{category.description}</CardDescription>
                </CardHeader>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
