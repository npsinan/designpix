import React from "react"
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
  return (
    <div className="carousel-container">
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        spaceBetween={0}
        slidesPerView={1}
        navigation={{
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
        }}
        pagination={{
          el: ".swiper-pagination",
          clickable: true,
          bulletActiveClass: "swiper-pagination-bullet-active",
        }}
        autoplay={
          autoplay
            ? {
                delay: 5000,
                disableOnInteraction: false,
              }
            : false
        }
        effect={effect}
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
      <div className="swiper-button-prev carousel-nav-btn"></div>
      <div className="swiper-button-next carousel-nav-btn"></div>

      {/* Pagination dots */}
      <div className="swiper-pagination carousel-pagination"></div>
    </div>
  )
}

export default Carousel
