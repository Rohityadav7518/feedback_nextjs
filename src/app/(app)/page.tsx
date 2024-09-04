'use client'

import { Card, CardContent } from '@/components/ui/card'
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel'
import React from 'react'

function Home() {
  return (
    <main className=' flex-grow flex flex-col items-center  justify-center py-12 px-4 md:px-24'>

      <section className='mb-8 text-center md:mb-12'>
        <h1 className=' text-3xl font-bold md:text-5xl'> Dive Into World of Anonymous  Conversation </h1>
        <p>  Explore Mystery Messages Where Your Privacy Remain Anonymous  </p>
      </section>
      <Carousel className="w-full max-w-xs">
        <CarouselContent>
          {Array.from({ length: 5 }).map((_, index) => (
            <CarouselItem key={index}>
              <div className="p-1">
                <Card>
                  <CardContent className="flex aspect-square items-center justify-center p-6">
                    <span className="text-4xl font-semibold">{index + 1}</span>
                  </CardContent>
                </Card>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </main >
  )
}

export default Home