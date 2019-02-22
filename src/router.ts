import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export const route = (pathString: string, view: string, meta?: any) => {
  return {
    path: pathString,
    component: (resolve: ((value: any) => any) | null | undefined) =>
        import(`@/views/${view}`).then(resolve),
      meta: {
        title: meta.title
      }
  };
};

const router = new Router({
  // mode: 'history',

  routes: [
    {
      path: '*',
      meta: {
        title: '404',
      },
      redirect: {
        path: '/404',
      },
    },
    route('/404', 'NotFound.vue', { title: 'No Encontrado' }),
    route('/login', 'LoginPage.vue', { title: 'Inicio de sesión' }),
    route('/', 'HomePage.vue', { title: 'Dashboard' }),
    /*route('/customers', 'management/CustomersPage.vue'),
    route('/reservations', 'management/ReservationsPage.vue'),
    route('/cars', 'management/CarsPage.vue'),
    route('/users', 'management/UsersPage.vue'),
    route('/sales', 'management/SalesPage.vue'),*/

  ],
});

router.beforeEach((to, from, next) => {
  const publicPages = ['/login', '/404'];
  const authRequired = !publicPages.includes(to.path);
  const loggedIn = localStorage.getItem('user');
  if (authRequired && !loggedIn) {
    return next('/login');
  }
  next();
});

export default router;
