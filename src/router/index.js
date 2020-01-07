import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/* Router Modules */

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
    noCache: true                if set true, the page will no be cached(default is false)
    affix: true                  if set true, the tag will affix in the tags-view
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
    path: '/redirect',
    component: Layout,
    hidden: true,
    children: [
      {
        path: '/redirect/:path*',
        component: () => import('@/views/redirect/index')
      }
    ]
  },
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },
  {
    path: '/auth-redirect',
    component: () => import('@/views/login/auth-redirect'),
    hidden: true
  },
  {
    path: '/retrieve',
    component: () => import('@/views/login/retrieve'),
    hidden: true
  },
  {
    path: '/authorize',
    component: () => import('@/views/login/authorize'),
    hidden: true
  },
  {
    path: '/home',
    component: () => import('@/views/home/index'),
    hidden: true
  },
  {
    path: '/establish',
    component: () => import('@/views/news/establish'),
    hidden: true
  },
  {
    path: '/404',
    component: () => import('@/views/error-page/404'),
    hidden: true
  },
  {
    path: '/401',
    component: () => import('@/views/error-page/401'),
    hidden: true
  },
  // 应急指挥
  {
    path: '/yingzhi',
    component: () => import('@/views/yingzhi/mudio'),
    hidden: true
  },
  {
    path: '/daping',
    component: () => import('@/views/yingzhi/daping'),
    hidden: true
  },
  {
    path: '/about',
    component: () => import('@/views/yingzhi/About'),
    hidden: true
  },
  {
    path: '/xinxi',
    component: () => import('@/views/yingzhi/xinxi'),
    hidden: true
  },
  {
    path: '/chabo',
    component: () => import('@/views/yingzhi/xinxifabu/chabo'),
    hidden: true
  },
  {
    path: '/fabu',
    component: () => import('@/views/yingzhi/xinxifabu/fabu'),
    hidden: true
  },
  {
    path: '/map2',
    component: () => import('@/views/yingzhi/map'),
    hidden: true
  },
  {
    path: '/dianwei',
    component: () => import('@/views/yingzhi/dianwei'),
    hidden: true
  },
  {
    path: '/xitong',
    component: () => import('@/views/yingzhi/xitong'),
    hidden: true
  },
  {
    path: '/jiagou',
    component: () => import('@/views/yingzhi/jiagou'),
    hidden: true
  },
  {
    path: '/paodao',
    component: () => import('@/views/yingzhi/paodao'),
    hidden: true
  },
  {
    path: '/guanli',
    component: () => import('@/views/yingzhi/guanli'),
    hidden: true
  },
  {
    path: '/more',
    component: () => import('@/views/yingzhi/more1'),
    hidden: true
  },
  {
    path: '/shipin',
    component: () => import('@/views/yingzhi/shipin'),
    hidden: true
  },
  {
    path: '/jilu',
    component: () => import('@/views/yingzhi/jilu'),
    hidden: true
  },
  {
    path: '/zhuce',
    component: () => import('@/views/yingzhi/zhuce'),
    hidden: true
  },
  {
    path: '/yd',
    component: () => import('@/views/yingzhi/yd'),
    hidden: true
  },
  {
    path: '/Equipment',
    component: () => import('@/views/yingzhi/Equipment'),
    hidden: true
  },
  {
    path: '/supervise',
    component: () => import('@/views/yingzhi/supervise'),
    hidden: true
  },
  {
    path: '/Monitor',
    component: () => import('@/views/yingzhi/Monitor'),
    hidden: true
  },
  {
    path: '/operate',
    component: () => import('@/views/yingzhi/operate'),
    hidden: true
  },
  {
    path: '/roadtest', // 生态廊道监管考核
    component: () => import('@/views/yingzhi/roadtest/index'),
    hidden: true
  },
  {
    path: '/wartertest', // 生态廊道水质监测
    component: () => import('@/views/yingzhi/wartertest/index'),
    hidden: true
  },
  {
    path: '/datacenter', // 大数据中心
    component: () => import('@/views/yingzhi/datacenter/index'),
    hidden: true
  },
  {
    path: '/equipmentstatistics', // 设备统计
    component: () => import('@/views/yingzhi/equipmentstatistics/index'),
    hidden: true
  }
]

/**
 * asyncRoutes
 * the routes that need to be dynamically loaded based on user roles
 */
export const asyncRoutes = [ // 默认显示页面和子页面
  /* / 数据中心
  {
    path: '/passenger',
    component: Layout,
    MenuIndex: '2',
    meta: { roles: ['ROLE_ADMIN', 'ROLE_USER'] },
    children: [
      {
        path: 'index',
        component: () => import('@/views/passenger/index'),
        name: 'passenger',
        meta: { title: '客流统计', icon: 'passenger', noCache: true, meta: { roles: ['ROLE_ADMIN', 'ROLE_USER'], index: '2' }, resources: 'passenger' }
      }
    ]
  },
  {
    path: '/traffic',
    component: Layout,
    MenuIndex: '2',
    meta: { roles: ['ROLE_ADMIN', 'ROLE_USER'] },
    children: [
      {
        path: 'index',
        component: () => import('@/views/traffic/index'),
        name: 'traffic',
        meta: { title: '车流统计', icon: 'traffic', noCache: true, meta: { roles: ['ROLE_ADMIN', 'ROLE_USER'], index: '2' }, resources: 'traffic' }
      }
    ]
  },
  {
    path: '/income',
    component: Layout,
    MenuIndex: '2',
    meta: { roles: ['ROLE_ADMIN', 'ROLE_USER'] },
    children: [
      {
        path: 'income',
        component: () => import('@/views/income/index'),
        name: 'Income',
        meta: { title: '收入统计', icon: 'income', noCache: true, meta: { roles: ['ROLE_ADMIN', 'ROLE_USER'], index: '2' }, resources: 'income' }
      }
    ]
  },
  {
    path: '/integral',
    component: Layout,
    MenuIndex: '2',
    meta: { roles: ['ROLE_ADMIN', 'ROLE_USER'] },
    children: [
      {
        path: 'integral',
        component: () => import('@/views/integral/index'),
        name: 'Integral',
        meta: { title: '会员统计', icon: 'integral', noCache: true, meta: { roles: ['ROLE_ADMIN', 'ROLE_USER'], index: '2' }, resources: 'integral' }
      }
    ]
  },
  {
    path: '/onecard',
    component: Layout,
    MenuIndex: '2',
    meta: { roles: ['ROLE_ADMIN', 'ROLE_USER'] },
    children: [
      {
        path: 'onecard',
        component: () => import('@/views/onecard/index'),
        name: 'onecard',
        meta: { title: '一卡通统计', icon: 'icononecard', noCache: true, meta: { roles: ['ROLE_ADMIN', 'ROLE_USER'], index: '2' }, resources: 'onecard' }
      }
    ]
  },
  {
    path: '/reservation',
    component: Layout,
    MenuIndex: '2',
    meta: { roles: ['ROLE_ADMIN', 'ROLE_USER'] },
    children: [
      {
        path: 'reservation',
        component: () => import('@/views/reservation/index'),
        name: 'reservation',
        meta: { title: '预定统计', icon: 'iconreservation', noCache: true, meta: { roles: ['ROLE_ADMIN', 'ROLE_USER'], index: '2' }, resources: 'reservation' }
      }
    ]
  },
  {
    path: '/xingqu',
    component: Layout,
    MenuIndex: '2',
    meta: { roles: ['ROLE_ADMIN', 'ROLE_USER'] },
    children: [
      {
        path: 'index',
        component: () => import('@/views/xingqu/index'),
        name: 'xingqu',
        meta: { title: '兴趣分析', icon: 'xingqu', noCache: true, meta: { roles: ['ROLE_ADMIN', 'ROLE_USER'], index: '2' }, resources: 'xingqu' }
      }
    ]
  },
  {
    path: '/gjanalysis',
    component: Layout,
    MenuIndex: '2',
    meta: {
      roles: ['ROLE_ADMIN', 'ROLE_USER'],
      icon: 'alarm'
    },
    children: [
      {
        path: 'index',
        component: () => import('@/views/gjanalysis/index'),
        name: 'index',
        meta: { title: '告警统计', noCache: true, meta: { roles: ['ROLE_ADMIN', 'ROLE_USER'], index: '2' }, resources: 'index' }
      }
    ]
  },
  {
    path: '/property',
    component: Layout,
    MenuIndex: '2',
    meta: { roles: ['ROLE_ADMIN', 'ROLE_USER'] },
    children: [
      {
        path: 'property',
        component: () => import('@/views/property/index'),
        name: 'Property',
        meta: { title: '资产统计', icon: 'property', noCache: true, meta: { roles: ['ROLE_ADMIN', 'ROLE_USER'], index: '2' }, resources: 'property' }
      }
    ]
  },
  {
    path: '/facilit',
    component: Layout,
    MenuIndex: '2',
    meta: {
      roles: ['ROLE_ADMIN', 'ROLE_USER'],
      icon: 'facilit'
    },
    children: [
      {
        path: 'linfenxi',
        component: () => import('@/views/facilit/linfenxi'),
        name: 'linfenxi',
        meta: { title: '设备统计', noCache: true, meta: { roles: ['ROLE_ADMIN', 'ROLE_USER'], index: '2' }, resources: 'linfenxi' }
      }
    ]
  },
  {
    path: '/energy',
    component: Layout,
    MenuIndex: '2',
    meta: { roles: ['ROLE_ADMIN'] },
    children: [
      {
        path: 'index',
        component: () => import('@/views/energy/index'),
        name: 'Energy',
        meta: { title: '能耗统计', icon: 'energy', noCache: true, meta: { roles: ['ROLE_ADMIN'], index: '2' }, resources: 'energy' }
      }
    ]
  },
  {
    path: '/maps',
    component: Layout,
    MenuIndex: '2',
    meta: {
      roles: ['ROLE_ADMIN', 'ROLE_USER'],
      icon: 'map'
    },
    children: [
      {
        path: 'linjingxi',
        component: () => import('@/views/maps/linjingxi'),
        name: 'linjingxi',
        meta: { title: '精细化地图', noCache: true, meta: { roles: ['ROLE_ADMIN', 'ROLE_USER'], index: '2' }, resources: 'linjingxi' }
      }
    ]
  },
  {
    path: '/analysis',
    component: Layout,
    MenuIndex: '2',
    meta: {
      roles: ['ROLE_ADMIN', 'ROLE_USER'],
      icon: 'analysis'
    },
    children: [
      {
        path: 'lintianqi',
        component: () => import('@/views/analysis/lintianqi'),
        name: 'lintianqi',
        meta: { title: '环境数据统计', noCache: true, meta: { roles: ['ROLE_ADMIN', 'ROLE_USER'], index: '2' }, resources: 'analysis' }
      }
    ]
  },
  // {
  //   path: '/parking',
  //   component: Layout,
  //   MenuIndex: '2',
  //   meta: { roles: ['ROLE_ADMIN', 'ROLE_USER'] },
  //   children: [
  //   ]
  // },
  // 系统管理
  {
    path: '/map',
    component: Layout,
    name: 'map',
    MenuIndex: '3',
    redirect: '/map/mapsets',
    meta: {
      title: '地图管理',
      icon: 'map',
      roles: ['ROLE_ADMIN', 'ROLE_USER']
    },
    children: [
      {
        path: 'mapsets',
        component: () => import('@/views/map/mapsets'),
        name: 'Mapsets',
        meta: { title: '地图管理', noCache: true, meta: { roles: ['ROLE_ADMIN', 'ROLE_USER'], index: '3' }, resources: 'mapsets' }
      },
      {
        path: 'mapinstall',
        component: () => import('@/views/map/mapinstall'),
        name: 'Mapinstall',
        meta: { title: '地图设置', noCache: true, meta: { roles: ['ROLE_ADMIN', 'ROLE_USER'], index: '3' }, resources: 'mapinstall' }
      },
      {
        path: 'placetagsa',
        component: () => import('@/views/map/placetagsa'),
        name: 'Placetagsa',
        meta: { title: '场所标记', noCache: true, meta: { roles: ['ROLE_ADMIN', 'ROLE_USER'], index: '3' }, resources: 'placetagsa' }
      },
      {
        path: 'attractionstags',
        component: () => import('@/views/map/attractionstags'),
        name: 'Attractionstags',
        meta: { title: '景点标记', noCache: true, meta: { roles: ['ROLE_ADMIN', 'ROLE_USER'], index: '3' }, resources: 'attractionstags' }
      },
      {
        path: 'equipment',
        component: () => import('@/views/map/equipment'),
        name: 'Equipment',
        meta: { title: '设备标记', noCache: true, meta: { roles: ['ROLE_ADMIN', 'ROLE_USER'], index: '3' }, resources: 'equipment' }
      },
      {
        path: 'play',
        component: () => import('@/views/map/play'),
        name: 'Play',
        meta: { title: '游玩线路', noCache: true, meta: { roles: ['ROLE_ADMIN', 'ROLE_USER'], index: '3' }, resources: 'play' }
      },
      {
        path: 'transportline',
        component: () => import('@/views/map/transportline'),
        name: 'Transportline',
        meta: { title: '车船线路', noCache: true, meta: { roles: ['ROLE_ADMIN', 'ROLE_USER'], index: '3' }, resources: 'transportline' }
      },
      {
        path: 'watchman',
        component: () => import('@/views/map/watchman'),
        name: 'Watchman',
        meta: { title: '巡更线路', noCache: true, meta: { roles: ['ROLE_ADMIN', 'ROLE_USER'], index: '3' }, resources: 'watchman' }
      }
    ]
  },
  {
    path: '/devmanagement',
    component: Layout,
    MenuIndex: '3',
    redirect: '/devmanagement/index',
    name: 'devmanagement',
    meta: {
      title: '设备管理',
      icon: 'devmanagement',
      roles: ['ROLE_ADMIN', 'ROLE_USER']
    },
    children: [
      {
        path: 'index',
        component: () => import('@/views/devmanagement/index'),
        name: 'Devmanagement',
        meta: { title: '设备总览', affix: true, meta: { roles: ['ROLE_ADMIN', 'ROLE_USER'], index: '3' }}
      },
      {
        path: 'tdcz',
        component: () => import('@/views/devmanagement/tdcz'),
        name: 'Devmanagement',
        meta: { title: '特定操作', activeMenu: '/devmanagement', affix: true, meta: { roles: ['ROLE_ADMIN', 'ROLE_USER'], index: '3' }}
      }// ,
      // {
      //   path: 'Journal',
      //   component: () => import('@/views/devmanagement/Journal'),
      //   name: 'Journal',
      //   meta: { title: '保修日志', activeMenu: '/devmanagement', noCache: true, meta: { roles: ['ROLE_ADMIN', 'ROLE_USER'], index: '3' }}
      // }
    ]
  },
  {
    path: '/video',
    component: Layout,
    MenuIndex: '3',
    // hidden: false,
    meta: { roles: ['ROLE_ADMIN', 'ROLE_USER'] },
    children: [
      {
        path: 'index',
        component: () => import('@/views/video/index'),
        name: 'Video',
        meta: { title: '视频监控管理', icon: 'video', noCache: true, meta: { roles: ['ROLE_ADMIN', 'ROLE_USER'], index: '3' }, resources: 'video' }
      }
    ]
  },
  {
    path: '/alarm',
    component: Layout,
    MenuIndex: '3',
    redirect: '/alarm/index',
    name: 'alarm',
    meta: {
      title: '告警管理',
      icon: 'alarm',
      roles: ['ROLE_ADMIN', 'ROLE_USER']
    },
    children: [
      {
        path: 'index',
        component: () => import('@/views/alarm/index'),
        name: 'alarm',
        meta: { title: '告警总览', affix: true, meta: { roles: ['ROLE_ADMIN', 'ROLE_USER'], index: '3' }}
      },
      {
        path: 'search',
        component: () => import('@/views/alarm/search'),
        name: 'alarm',
        meta: { title: '操作日志查询', activeMenu: '/alarm', affix: true, meta: { roles: ['ROLE_ADMIN', 'ROLE_USER'], index: '3' }}
      },
      {
        path: 'history',
        component: () => import('@/views/alarm/history'),
        name: 'alarm',
        meta: { title: '历史告警', activeMenu: '/alarm', affix: true, meta: { roles: ['ROLE_ADMIN', 'ROLE_USER'], index: '3' }}
      },
      {
        path: 'cjjl',
        component: () => import('@/views/alarm/cjjl'),
        name: 'alarm',
        meta: { title: '处警记录', activeMenu: '/alarm', affix: true, meta: { roles: ['ROLE_ADMIN', 'ROLE_USER'], index: '3' }}
      },
      {
        path: 'setting',
        component: () => import('@/views/alarm/setting'),
        name: 'alarm',
        meta: { title: '告警设置', activeMenu: '/alarm', affix: true, meta: { roles: ['ROLE_ADMIN', 'ROLE_USER'], index: '3' }}
      },
      {
        path: 'fsxx',
        component: () => import('@/views/alarm/fsxx'),
        hidden: true,
        meta: { title: '操作日志查询', activeMenu: '/alarm', affix: true, meta: { roles: ['ROLE_ADMIN', 'ROLE_USER'], index: '3' }}
      },
      {
        path: 'gjsz',
        component: () => import('@/views/alarm/gjsz'),
        hidden: true,
        meta: { title: '', activeMenu: '/gjsz', affix: true, meta: { roles: ['ROLE_ADMIN', 'ROLE_USER'], index: '3' }}
      }
    ]
  },
  {
    path: '/face',
    component: Layout,
    MenuIndex: '3',
    redirect: '/face/index',
    name: 'face',
    meta: {
      title: '人脸识别',
      icon: 'face',
      roles: ['ROLE_ADMIN', 'ROLE_USER']
    },
    children: [
      {
        path: 'index',
        component: () => import('@/views/face/index'),
        name: 'face',
        meta: { title: '人脸寻人', affix: true, meta: { roles: ['ROLE_ADMIN', 'ROLE_USER'], index: '3' }}
      },
      {
        path: 'bmd',
        component: () => import('@/views/face/bmd'),
        name: 'face',
        meta: { title: '白名单管理', activeMenu: '/face', affix: true, meta: { roles: ['ROLE_ADMIN', 'ROLE_USER'], index: '3' }}
      },
      {
        path: 'hmd',
        component: () => import('@/views/face/hmd'),
        name: 'face',
        meta: { title: '黑名单管理', activeMenu: '/face', affix: true, meta: { roles: ['ROLE_ADMIN', 'ROLE_USER'], index: '3' }}
      },
      {
        path: 'zjry',
        component: () => import('@/views/face/zjry'),
        hidden: true,
        meta: { title: '白名单管理/增加人员', activeMenu: '/zjry', affix: true, meta: { roles: ['ROLE_ADMIN', 'ROLE_USER'], index: '3' }}
      },
      {
        path: 'hadd',
        component: () => import('@/views/face/hadd'),
        hidden: true,
        meta: { title: '黑名单管理/增加人员', activeMenu: '/face', affix: true, meta: { roles: ['ROLE_ADMIN', 'ROLE_USER'], index: '3' }}
      }
    ]
  },
  {
    path: '/messagepush',
    component: Layout,
    MenuIndex: '3',
    hidden: true,
    meta: { roles: ['ROLE_ADMIN', 'ROLE_USER'] },
    children: [
      {
        path: 'index',
        component: () => import('@/views/messagepush/index'),
        name: 'Messagepush',
        meta: { title: '消息推送管理', icon: 'messagepush', noCache: true, meta: { roles: ['ROLE_ADMIN', 'ROLE_USER'], index: '3' }, resources: 'messagepush' }
      }
    ]
  },
  {
    path: '/patrol',
    component: Layout,
    MenuIndex: '3',
    redirect: '/patrol/luxian',
    meta: {
      title: '巡更管理',
      icon: 'patrol',
      roles: ['ROLE_ADMIN', 'ROLE_USER']
    },
    children: [
      {
        path: 'luxian',
        component: () => import('@/views/patrol/luxian'),
        name: 'Patrol',
        meta: { title: '巡更总览', noCache: true, meta: { roles: ['ROLE_ADMIN', 'ROLE_USER'], index: '3' }, resources: 'patrol' }
      },
      {
        path: 'index',
        component: () => import('@/views/patrol/index'),
        name: 'Patrol',
        meta: { title: '历史查询', noCache: true, meta: { roles: ['ROLE_ADMIN', 'ROLE_USER'], index: '3' }, resources: 'patrol' }
      }
    ]
  },
  {
    path: '/broadcast',
    component: Layout,
    MenuIndex: '3',
    redirect: '/broadcast/index',
    meta: { roles: ['ROLE_ADMIN', 'ROLE_USER'], title: '广播管理', icon: 'broadcast' },
    children: [
      {
        path: 'index',
        component: () => import('@/views/broadcast/index'),
        name: 'Broadcast',
        meta: { title: '今日广播', noCache: true, meta: { roles: ['ROLE_ADMIN', 'ROLE_USER'], index: '3' }, resources: 'broadcast' }
      },
      {
        path: 'yuyue',
        component: () => import('@/views/broadcast/yuyue'),
        name: 'Yuyue',
        meta: { title: '预约播放', noCache: true, meta: { roles: ['ROLE_ADMIN', 'ROLE_USER'], index: '3' }, resources: 'broadcast' }
      },
      {
        path: 'zhengli',
        component: () => import('@/views/broadcast/zhengli'),
        name: 'Zhengli',
        meta: { title: '文件管理', noCache: true, meta: { roles: ['ROLE_ADMIN', 'ROLE_USER'], index: '3' }, resources: 'broadcast' }
      }
    ]
  },
  {
    path: '/lyrical',
    component: Layout,
    MenuIndex: '3',
    hidden: true,
    meta: { roles: ['ROLE_ADMIN', 'ROLE_USER'] },
    children: [
      {
        path: 'index',
        component: () => import('@/views/lyrical/index'),
        name: 'Lyrical',
        meta: { title: '舆情管理', icon: 'lyrical', noCache: true, meta: { roles: ['ROLE_ADMIN', 'ROLE_USER'], index: '3' }, resources: 'lyrical' }
      }
    ]
  },
  {
    path: '/car',
    component: Layout,
    MenuIndex: '3',
    redirect: '/car/carmanage',
    name: 'Car',
    meta: {
      title: '车船管理',
      icon: 'car',
      meta: { roles: ['ROLE_ADMIN', 'ROLE_USER'] }
    },
    children: [
      {
        path: 'carmanage',
        component: () => import('@/views/car/carmanage'),
        name: 'CarManage',
        meta: { title: '车船总览', meta: { roles: ['ROLE_ADMIN', 'ROLE_USER'], index: '3' }, resources: 'carmanage' }
      },
      {
        path: 'list',
        component: () => import('@/views/car/list'),
        name: 'CarList',
        meta: { title: '数据统计', activeMenu: '/car', meta: { roles: ['ROLE_ADMIN', 'ROLE_USER'], index: '3' }, resources: 'list' }
      },
      {
        path: 'caralarm',
        component: () => import('@/views/car/caralarm'),
        name: 'CarAlarm',
        hidden: true,
        meta: { title: '报警信息', activeMenu: '/car', meta: { roles: ['ROLE_ADMIN', 'ROLE_USER'], index: '3' }, resources: 'caralarm' }
      },
      {
        path: 'cartrack',
        component: () => import('@/views/car/cartrack'),
        name: 'CarTrack',
        meta: { title: '历史轨迹', activeMenu: '/car', meta: { roles: ['ROLE_ADMIN', 'ROLE_USER'], index: '3' }, resources: 'cartrack' }
      }
    ]
  },
  {
    path: '/repair',
    component: Layout,
    MenuIndex: '3',
    redirect: '/repair/index',
    meta: { roles: ['ROLE_ADMIN', 'ROLE_USER'], title: '检修管理', icon: 'repair' },
    children: [
      {
        path: 'index',
        component: () => import('@/views/repair/index'),
        name: 'repair',
        meta: { title: '检修信息总览', noCache: true, meta: { roles: ['ROLE_ADMIN', 'ROLE_USER'], index: '3' }, resources: 'repair' }
      },
      {
        path: 'bxcx',
        component: () => import('@/views/repair/bxcx'),
        name: 'repair',
        meta: { title: '报修查询', noCache: true, meta: { roles: ['ROLE_ADMIN', 'ROLE_USER'], index: '3' }, resources: 'repair' }
      },
      {
        path: 'pdcx',
        component: () => import('@/views/repair/pdcx'),
        name: 'repair',
        meta: { title: '派单查询', noCache: true, meta: { roles: ['ROLE_ADMIN', 'ROLE_USER'], index: '3' }, resources: 'repair' }
      },
      {
        path: 'jxcx',
        component: () => import('@/views/repair/jxcx'),
        name: 'repair',
        meta: { title: '检修查询', noCache: true, meta: { roles: ['ROLE_ADMIN', 'ROLE_USER'], index: '3' }, resources: 'repair' }
      },
      {
        path: 'wxcx',
        component: () => import('@/views/repair/wxcx'),
        name: 'repair',
        meta: { title: '维修查询', noCache: true, meta: { roles: ['ROLE_ADMIN', 'ROLE_USER'], index: '3' }, resources: 'repair' }
      }
    ]
  },
  {
    path: '/Parkingadmin',
    component: Layout,
    MenuIndex: '3',
    redirect: '/Parkingadmin/parking',
    meta: { roles: ['ROLE_ADMIN', 'ROLE_USER'], title: '停车场管理', icon: 'parking' },
    children: [
      {
        path: 'parking',
        component: () => import('@/views/Parkingadmin/parking'),
        name: 'Parking',
        meta: { title: '停车场总览', noCache: true, meta: { roles: ['ROLE_ADMIN', 'ROLE_USER'], index: '3' }, resources: 'parking' }
      },
      {
        path: 'luxian',
        component: () => import('@/views/Parkingadmin/index'),
        name: 'Parkingadmin',
        meta: { title: '停车查询', activeMenu: '/Parkingadmin', noCache: true, meta: { roles: ['ROLE_ADMIN', 'ROLE_USER'], index: '3' }}
      }
    ]
  },
  {
    path: '/news',
    component: Layout,
    MenuIndex: '3',
    redirect: '/news/index',
    meta: { roles: ['ROLE_ADMIN', 'ROLE_USER'], icon: 'news', title: '信息发布管理' },
    children: [
      {
        path: 'index',
        component: () => import('@/views/news/index'),
        name: 'News',
        meta: { title: '今日发布信息', noCache: true, meta: { roles: ['ROLE_ADMIN', 'ROLE_USER'], index: '3' }, resources: 'news' }
      },
      {
        path: 'zjcb',
        component: () => import('@/views/news/zjcb'),
        name: 'Newszjcb',
        meta: { title: '增加插播节目', activeMenu: '/news', noCache: true, meta: { roles: ['ROLE_ADMIN', 'ROLE_USER'], index: '3' }, resources: 'news' }
      },
      {
        path: 'chakan',
        component: () => import('@/views/news/chakan'),
        name: 'Newchakan',
        meta: { title: '查看插播节目', activeMenu: '/news', noCache: true, meta: { roles: ['ROLE_ADMIN', 'ROLE_USER'], index: '3' }, resources: 'news' }
      },
      {
        path: 'establish',
        component: () => import('@/views/news/establish'),
        name: 'Establish',
        hidden: true,
        meta: { title: '增加插播节目', activeMenu: '/news', noCache: true, meta: { roles: ['ROLE_ADMIN', 'ROLE_USER'], index: '3' }, resources: 'newsindex' }
      },
      {
        path: 'guide',
        component: () => import('@/views/news/guide'),
        name: 'Guide',
        meta: { title: '乘车点站牌展示', activeMenu: '/news', noCache: true, meta: { roles: ['ROLE_ADMIN', 'ROLE_USER'], index: '3' }, resources: 'news' }
      }
    ]
  },
  {
    path: '/tourist',
    component: Layout,
    MenuIndex: '3',
    meta: { roles: ['ROLE_ADMIN'] },
    children: [
      {
        path: 'index',
        component: () => import('@/views/tourist/index'),
        name: 'Tourist',
        meta: { title: '游客信息管理', icon: 'tourist', noCache: true, meta: { roles: ['ROLE_ADMIN'], index: '3' }, resources: 'tourist' }
      }
    ]
  },
  // 系统设置
  {
    path: '/grmessage',
    component: Layout,
    MenuIndex: '4',
    meta: {
      title: '个人信息',
      icon: 'grmessage',
      roles: ['ROLE_ADMIN'] },
    children: [
      {
        path: 'index',
        component: () => import('@/views/grmessage/index'),
        name: 'grmessage',
        meta: { title: '个人信息', noCache: true, meta: { roles: ['ROLE_ADMIN'], index: '4' }, resources: 'grmessage' }
      }
    ]
  },
  {
    path: '/structure',
    component: Layout,
    MenuIndex: '4',
    // hidden: true,
    meta: {
      icon: 'structure',
      roles: ['ROLE_ADMIN']
    },
    children: [
      {
        path: 'index',
        component: () => import('@/views/structure/index'),
        name: 'Structure',
        meta: { title: '组织架构', noCache: true, meta: { roles: ['ROLE_ADMIN'], index: '4' }, resources: 'structure' }
      }// ,
      // {
      //   path: 'role',
      //   component: () => import('@/views/structure/role'),
      //   name: 'Role',
      //   hidden: true,
      //   meta: { title: '组织架构  /  角色权限', noCache: true, meta: { roles: ['ROLE_ADMIN'], index: '4' }, resources: 'role' }
      // },
      // {
      //   path: 'account',
      //   component: () => import('@/views/structure/account'),
      //   name: 'Account',
      //   hidden: true,
      //   meta: { title: '组织架构  /  账号', noCache: true, meta: { roles: ['ROLE_ADMIN'], index: '4' }, resources: 'account' }
      // }
    ]
  },
  {
    path: '/system',
    component: Layout,
    MenuIndex: '4',
    meta: {
      icon: 'system',
      roles: ['ROLE_ADMIN']
    },
    children: [
      {
        path: 'index',
        component: () => import('@/views/system/index'),
        name: 'System',
        meta: { title: '系统参数', noCache: true, meta: { roles: ['ROLE_ADMIN'], index: '4' }, resources: 'account' }
      }
    ]
  },
  {
    path: '/acquisition',
    component: Layout,
    MenuIndex: '4',
    // hidden: true,
    meta: { roles: ['ROLE_ADMIN'] },
    children: [
      {
        path: 'index',
        component: () => import('@/views/acquisition/index'),
        name: 'acquisition',
        meta: { title: '数据采集', icon: 'acquisition', noCache: true, meta: { roles: ['ROLE_ADMIN'], index: '4' }, resources: 'acquisition' }
      }
    ]
  },
  // // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }*/
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
