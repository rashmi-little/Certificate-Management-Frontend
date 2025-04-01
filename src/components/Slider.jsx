import { Swiper, SwiperSlide } from "swiper/react"
import { Autoplay, EffectFade } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-fade";
import "./Slider.css"

const Slider = () => {
  return (
    <div className="w-full h-full">
        <Swiper 
          slidesPerView={1}
          effect="fade"
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
          }}
          fadeEffect={{ crossFade: true }} 
          modules={[Autoplay, EffectFade]}
          className="h-full w-full"
        >
            <SwiperSlide className="slide">Slide1</SwiperSlide>
            <SwiperSlide className="slide">Slide2</SwiperSlide>
            <SwiperSlide className="slide">Slide3</SwiperSlide>
        </Swiper>
    </div>
  )
}

export default Slider