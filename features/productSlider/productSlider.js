export const productSlider = () => {
  Promise.all([
    import('swiper/modules'),
    import('swiper'),
    import('swiper/css')
  ]).then(([{ Navigation, Thumbs }, Swiper]) => {

    try {
      const sliderThumbnails = new Swiper.default(".product__slider-thumbnails", {
        spaceBetween: 10,
        slidesPerView: 4,
        freeMode: true,
        watchSlidesProgress: true,
      });
    
      new Swiper.default(".product__slider-main", {
        spaceBetween: 10,
        navigation: {
          nextEl: ".product__arrow-next",
          prevEl: ".product__arrow-prev",
        },
        modules: [Navigation, Thumbs],
        thumbs: {
          swiper: sliderThumbnails,
        },
      });
    } catch (err) {

    }

  });
};