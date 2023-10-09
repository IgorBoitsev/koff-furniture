// import 'normalize.css';
// import './style.scss';
// import { Navigation, Thumbs } from 'swiper/modules';
// import Swiper from 'swiper';

// const { default: Navigo } = require('navigo');

import Navigo from 'navigo';
import { Header } from './modules/header/Header';
import { Main } from './modules/main/Main';
import { Footer } from './modules/footer/Footer';
import { Order } from './modules/Order/Order';

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

  new Header().mount();

  const mainSection = new Main();
  mainSection.mount();

  new Footer().mount();

  productSlider();

  const router = new Navigo('/', {linksSelector: 'a[href^="/"]'});

  router
    .on('/', () => {
      mainSection.clear();
      // mainSection.mount();
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
      mainSection.clear();
      // mainSection.unmount();
      // new Main().mount();
      console.log('mainSection.element: ', mainSection.element);
      new Order().mount(mainSection.element);
    })
    .on('/order', () => {
      
    })
    .notFound(() => {
      console.log(404);
    });

  router.resolve();
};

init();