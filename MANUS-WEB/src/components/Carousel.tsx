import React, { useRef } from "react"
import { Swiper as SwiperClass } from "swiper"
import { Swiper, SwiperSlide } from "swiper/react"
import { Navigation, Pagination, Autoplay } from "swiper/modules"

// Import Swiper styles
import "swiper/css"
import "swiper/css/navigation"
import "swiper/css/pagination"
import "./carousel-styles.css"

interface CarouselSlide {
  id: number
  image: string
  title: string
  description: string
}

interface CarouselProps {
  slides: CarouselSlide[]
  autoplay?: boolean
  effect?: "slide" | "fade" | "cube" | "coverflow" | "flip"
}

export function Carousel({
  slides,
  autoplay = true,
  effect = "slide",
}: CarouselProps) {
  const swiperRef = useRef<SwiperClass | null>(null)

  return (
    <div className="carousel-wrapper">
      <Swiper
        ref={swiperRef}
        modules={[Navigation, Pagination, Autoplay]}
        spaceBetween={0}
        slidesPerView={1}
        navigation={{
          nextEl: ".carousel-next",
          prevEl: ".carousel-prev",
          disabledClass: "carousel-disabled",
        }}
        pagination={{
          el: ".carousel-dots",
          clickable: true,
          bulletActiveClass: "active",
        }}
        autoplay={
          autoplay
            ? {
                delay: 5000,
                disableOnInteraction: false,
              }
            : false
        }
        loop={true}
        className="carousel-swiper"
      >
        {slides.map((slide) => (
          <SwiperSlide key={slide.id} className="carousel-slide">
            <img
              src={slide.image}
              alt={slide.title}
              className="carousel-image"
            />
            <div className="carousel-overlay" />
            <div className="carousel-content">
              <h3 className="carousel-title">{slide.title}</h3>
              <p className="carousel-description">{slide.description}</p>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Navigation buttons */}
      <button
        className="carousel-button carousel-prev"
        onClick={() => swiperRef.current?.slidePrev()}
        aria-label="Previous slide"
      >
        ‹
      </button>
      <button
        className="carousel-button carousel-next"
        onClick={() => swiperRef.current?.slideNext()}
        aria-label="Next slide"
      >
        ›
      </button>

      {/* Pagination dots */}
      <div className="carousel-dots"></div>
    </div>
  )
}

export default Carousel
