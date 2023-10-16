import Navigo from 'navigo';
import { Header } from './modules/header/Header';
import { Main } from './modules/main/Main';
import { Footer } from './modules/footer/Footer';
import { Order } from './modules/Order/Order';
import { ProductList } from './modules/ProductList/ProductList';
import { ApiService } from './services/ApiService';
import { Catalog } from './modules/Catalog/Catalog';
import { FavoriteService, LocalStorageService } from './services/LocalStorageService';
import { Pagination } from './features/Pagination/Pagination';
import { Breadcrumbs } from './features/Breadcrumbs/Breadcrumbs';
import { ProductCard } from './modules/ProductCard/ProductCard';
import { productSlider } from './features/productSlider/productSlider';

//// const productSlider = () => {
////   Promise.all([
////     import('swiper/modules'),
////     import('swiper'),
////     import('swiper/css')
////   ]).then(([{ Navigation, Thumbs }, Swiper]) => {

////     const sliderThumbnails = new Swiper.default(".product__slider-thumbnails", {
////       spaceBetween: 10,
////       slidesPerView: 4,
////       freeMode: true,
////       watchSlidesProgress: true,
////     });

////     new Swiper.default(".product__slider-main", {
////       spaceBetween: 10,
////       navigation: {
////         nextEl: ".product__arrow-next",
////         prevEl: ".product__arrow-prev",
////       },
////       modules: [Navigation, Thumbs],
////       thumbs: {
////         swiper: sliderThumbnails,
////       },
////     });

////   });
//// };

export const router = new Navigo('/', {linksSelector: 'a[href^="/"]'});

const init = () => {
  const api = new ApiService();

  new Header().mount();

  const mainSection = new Main();
  mainSection.mount();

  new Footer().mount();

  //// productSlider();

  router
    .on('/', async () => {
      new Catalog().mount(new Main().element);

      const products = await api.getProducts();

      new ProductList().mount(new Main().element, products, 'Избранное', 'goods__title');
      router.updatePageLinks();
    },
    {
      leave(done) {
        new Catalog().unmount();
        new ProductList().unmount();
        done();
      },
      already(match) {
        match.route.handler(match);
      }
    })
    .on('/category', async ({ params: { slug, page = 1 } }) => {
      new Catalog().mount(new Main().element);
      new Breadcrumbs().mount(new Main().element, [{ text: slug }]);
      
      const { data: products, pagination } = await api.getProducts({ category: slug, page: page });
      
      new ProductList().mount(new Main().element, products, slug, 'goods__title');
      new Pagination().mount(new ProductList().containerElement).update(pagination);

      router.updatePageLinks();
    },
    {
      leave(done) {
        new Catalog().unmount();
        new Breadcrumbs().unmount();
        new ProductList().unmount();
        done();
      }
    })
    .on('/favorite', async ({ params }) => {
      new Catalog().mount(new Main().element);
      new Breadcrumbs().mount(new Main().element, [{ text: 'Избранное' }]);

      const favoriteList = new FavoriteService().get();
      const { data: products, pagination } = await api.getProducts({ list: favoriteList.join(','), page: params?.page || 1 });

      new ProductList().mount(new Main().element, products, 'Избранное', 'goods__title', 'Вы ничего еще не добавили в избранное:('); 
      new Pagination().mount(new ProductList().containerElement).update(pagination);
      router.updatePageLinks();
    },
    {
      leave(done) {
        new Catalog().unmount();
        new Breadcrumbs().unmount();
        new ProductList().unmount();
        done();
      },
      already(match) {
        match.route.handler(match);
      }
    })
    .on('/search', () => {
      
    })
    .on('/product/:id', async (obj) => {
      new Catalog().mount(new Main().element);

      const cardData = await api.getProductsById(obj.data.id)

      new Breadcrumbs().mount(new Main().element, [{ text: cardData.category, href: `/category?slug=${cardData.category}` }, { text: cardData.name }]);
      new ProductCard().mount(new Main().element, cardData);
      productSlider();
    },
    {
      leave(done) {
        new Catalog().unmount();
        new Breadcrumbs().unmount();
        new ProductCard().unmount();
        done();
      },
      already(match) {
        match.route.handler(match);
      }
    })
    .on('/cart', () => {
      
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
        new Main().clear();
        done();
      }
    });

  router.resolve();
};

init();