import Vue from 'vue'
import Router from 'vue-router'
import { Toast } from 'mint-ui';

Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/redirect',
      component: () => import('@/components/public/Redirect')
    },
    {
      path: '/home',
      name: 'home',
      component: () => import('@/components/home/Home')
    },
    {
      path: '/calendar',
      name: 'calendar',
      component: () => import('@/components/calendar/Calendar')
    },
    {
      path: '/my',
      name: 'my',
      component: () => import('@/components/my/My')
    },
    {
      path: '/integraldetails',
      name: 'integraldetails',
      component: () => import('@/components/my/IntegralDetails'),
      meta: {
        requiresAuth: true
     }
    },
    {
      path: '/suggest',
      component: () => import('@/components/my/Suggest')
    },
    {
      path: '/withdraw/:integral',
      name: 'withdraw',
      component: () => import('@/components/my/Withdraw'),
      meta: {
        requiresAuth: true
     }
    },
    {
      path: '/login',
      component: () => import('@/components/login/Login')
    },
    {
      path: '/register',
      component: () => import('@/components/login/Register')
    },
    {
      path: '/detail/:id',
      name: 'detail',
      component: () => import('@/components/home/Detail')
    },
    {
      path: '/privacy',
      name: 'privacy',
      component: () => import('@/components/my/Privacy')
    },
    {
      path: '*',
      redirect: '/redirect'
    }
  ]
});

//  路由权限控制 
router.beforeEach((to,from,next) => {
  // console.log(to.meta.requiresAuth)
  if(to.meta.requiresAuth){
    // 如果不为空 说明已经登录 直接放行
    if(localStorage.getItem("token")!= null){
      next();
    }else{
     Toast({
        message: '请先登录！',
        duration: 1000
      });
      next({path: "/login"});
    }
  }else{
    next();
  }
   });

export default router;
