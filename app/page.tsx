import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { ImageCarousel } from '@/components/ImageCarousel'

export default function Home() {
  return (
    <main>
      <div className="relative">
        <ImageCarousel />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="max-w-3xl mx-auto text-center space-y-8 px-4">
            <h1 className="text-6xl font-bold tracking-tight">
              <span className="text-white">Find your</span>
              <br />
              <span className="text-pink-500">REAL worries</span>
              <br />
              <span className="text-white">from questions</span>
            </h1>
            <p className="text-xl text-white">
              誰でも簡単に、数個の質問を答えるだけで、
              <br />
              あなたの悩みを特定させます。
            </p>
            <Link href="/start">
              <Button size="lg" className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-6 text-lg rounded-full">
                診断を始める
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </main>
  )
}

