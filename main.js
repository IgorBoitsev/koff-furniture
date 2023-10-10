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
import { ProductList } from './modules/ProductList/ProductList';
import { ApiService } from './services/ApiService';
import { Catalog } from './modules/Catalog/Catalog';
import { FavoriteService, LocalStorageService } from './services/LocalStorageService';

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
  const api = new ApiService();
  const router = new Navigo('/', {linksSelector: 'a[href^="/"]'});

  new Header().mount();

  const mainSection = new Main();
  mainSection.mount();

  new Footer().mount();

  api.getProductsCategories().then(data => {
    new Catalog().mount(new Main().element, data);
    router.updatePageLinks();
  });

  productSlider();


  router
    .on('/', async () => {
      const products = await api.getProducts();

      new ProductList().mount(new Main().element, products, 'Избранное', 'goods__title');
      router.updatePageLinks();
    },
    {
      leave(done) {
        new ProductList().unmount();
        done();
      },
      already() {
        console.log('already on main page');
      }
    })
    .on('/category', async ({ params: {slug} }) => {
      const products = await api.getProducts();

      const filterProducts = products.filter(pr => pr.category === slug);
      
      new ProductList().mount(new Main().element, filterProducts, slug, 'goods__title'); 
      router.updatePageLinks();
    },
    {
      leave(done) {
        new ProductList().unmount();
        done();
      }
    })
    .on('/favorite', async () => {
      const favoriteList = new FavoriteService().get();
      const query = favoriteList.join(',');
      const products = await api.getProducts(`list=${query}`);

      new ProductList().mount(new Main().element, products.data, 'Избранное', 'goods__title'); 
      router.updatePageLinks();
    },
    {
      leave(done) {
        new ProductList().unmount();
        done();
      }
    })
    .on('/search', () => {
      
    })
    .on('/product/:id', () => {
      
    })
    .on('/cart', () => {
      new LocalStorageService('LS').setLSItem('sdfgsdhwr');
    })
    .on('/order', () => {
      // mainSection.clear();
      // mainSection.unmount();
      // new Main().mount();
      // new Order().mount(mainSection.element);
    })
    .notFound(() => {
      new Main().setNotFoundpage();

      let t = 3;
      const leaveTimer = setInterval(() => {
        t--;
        if (t === -1) {
          clearInterval(leaveTimer);
          
          router.navigate('/');
        }
      }, 1000);
    },
    {
      leave(done) {
        console.log('leave notFound page');
        new Main().clear();
        done();
      }
    });

  router.resolve();
};

init();