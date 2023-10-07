// import 'normalize.css';
// import './style.scss';
// import { Navigation, Thumbs } from 'swiper/modules';
// import Swiper from 'swiper';

// const { default: Navigo } = require('navigo');

import Navigo from 'navigo';

const productSlider = () => {
  Promise.all([
    import('swiper/modules'),
    import('swiper'),
    import('swiper/css')
  ]).then(([{ Navigation, Thumbs }, Swiper]) => {

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

  });
};


const init = () => {
  productSlider();

  const router = new Navigo('/', {linksSelector: 'a[href^="/"]'});

  router
    .on('/', () => {

    })
    .on('/category', () => {
      
    })
    .on('/favorite', () => {
      
    })
    .on('/search', () => {
      
    })
    .on('/product/:id', () => {
      
    })
    .on('/cart', () => {
      
    })
    .on('/order', () => {
      
    })
    .notFound(() => {
      console.log(404);
    });


  router.resolve();
};

init();