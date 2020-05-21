import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },

  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },

  {
    path: '/',
    name: 'Dashboard',
    component: Layout,
    redirect: '/dashboard',
    children: [{
      path: 'dashboard',
      name: 'Dashboard',
      component: () => import('@/views/dashboard/index'),
      meta: {title: '首页', icon: 'dashboard'}
    }]
  },

  {
    path: '/permission',
    name: 'Permission',
    component: Layout,
    redirect: '/permission/organ',
    meta: {title: '权限', icon: 'example', module: 'system'},
    children: [
      {
        path: 'organ',
        name: 'Organ',
        component: () => import('@/views/system/organ/index'),
        meta: {title: '机构', icon: 'tree'}
      },
      {
        path: 'role',
        name: 'Role',
        component: () => import('@/views/system/role/index'),
        meta: {title: '角色', icon: 'table'}
      },
      {
        path: 'user',
        name: 'User',
        component: () => import('@/views/system/user/index'),
        meta: {title: '用户', icon: 'user'}
      }
    ]
  },

  {
    path: '/maintain',
    name: 'Maintain',
    component: Layout,
    redirect: '/maintain/log',
    meta: {title: '维护', icon: 'example', module: 'system'},
    children: [
      {
        path: 'log',
        name: 'Log',
        component: () => import('@/views/system/organ/index'),
        meta: {title: '日志', icon: 'tree'}
      },
      {
        path: 'cache',
        name: 'Cache',
        component: () => import('@/views/system/role/index'),
        meta: {title: '缓存', icon: 'table'}
      },
      {
        path: 'index',
        name: 'Index',
        component: () => import('@/views/system/user/index'),
        meta: {title: '索引', icon: 'user'}
      }
    ]
  },

  {
    path: '/operate',
    name: 'Operate',
    component: Layout,
    redirect: '/operate/school',
    meta: {title: '学校', icon: 'example', module: 'operate'},
    children: [
      {
        path: 'school',
        name: 'School',
        component: () => import('@/views/operate/school/index'),
        meta: {title: '学校', icon: 'tree'}
      },
      {
        path: 'class',
        name: 'Class',
        component: () => import('@/views/operate/class/index'),
        meta: {title: '班级', icon: 'table'}
      },
      {
        path: 'teacher',
        name: 'Teacher',
        component: () => import('@/views/operate/teacher/index'),
        meta: {title: '老师', icon: 'user'}
      }
    ]
  },

  // 404 page must be placed at the end !!!
  {path: '*', redirect: '/404', hidden: true}
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({y: 0}),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
