"use client"

import { useRef } from "react"
import Image from "next/image"
import Link from "next/link"

import Autoplay from "embla-carousel-autoplay"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"

export default function Home() {

  const plugin = useRef(
    Autoplay({ delay: 2000, stopOnInteraction: true })
  )

  const history = [
    {
      link: "/ywc17",
      image: "/assets/YWC17.png",
    },
    {
      link: "/ywc18",
      image: "/assets/YWC18.png",
    },
    {
      link: "/ywc19",
      image: "/assets/YWC19.jpg",
    },
  ]

  return (
    <main className="flex-1">

      <Carousel
        plugins={[plugin.current]}
        className="w-full h-[70vh]"
        onMouseEnter={plugin.current.stop}
        onMouseLeave={plugin.current.reset}
      >
        <CarouselContent>
          {history.map((year, index) => (
            <CarouselItem key={index}>
              <Link href={year.link}>
                <Image src={year.image} alt="image for background" width={1000} height={500} className="w-full h-[30vh] md:h-[70vh] object-cover" />
              </Link>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </main>
  );
}
