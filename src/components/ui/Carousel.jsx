import { THEME } from "@constants";
import { useTheme } from "@hooks";
import { cn } from "@utils";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { Swiper } from "swiper/react";

import "./Carousel.css";

const AUTO_PLAY_DELAY = 3000;
const CUSTOM_CAROUSEL_CLASS = "custom-carousel";

const Carousel = ({
  autoplay = false,
  breakpoints,
  children,
  className,
  loop = false,
  navigation = true,
  pagination = true,
  slidesPerView = 1,
  spaceBetween = 16,
  swiperProps,
}) => {
  const { theme } = useTheme();
  const modules = [];
  if (navigation) {
    modules.push(Navigation);
  }
  if (pagination) {
    modules.push(Pagination);
  }
  if (autoplay) {
    modules.push(Autoplay);
  }

  const defaultBreakpoints = {
    640: { slidesPerView: Math.min(2, slidesPerView) },
    768: { slidesPerView: Math.min(3, slidesPerView) },
    1024: { slidesPerView: slidesPerView },
  };

  return (
    <Swiper
      autoplay={
        autoplay
          ? { delay: AUTO_PLAY_DELAY, disableOnInteraction: false }
          : false
      }
      breakpoints={breakpoints || defaultBreakpoints}
      className={cn(
        CUSTOM_CAROUSEL_CLASS,
        theme === THEME.DARK && THEME.DARK,
        className,
      )}
      loop={loop}
      modules={modules}
      navigation={navigation}
      pagination={pagination ? { clickable: true } : false}
      slidesPerView={slidesPerView}
      spaceBetween={spaceBetween}
      {...swiperProps}
    >
      {children}
    </Swiper>
  );
};

export default Carousel;
