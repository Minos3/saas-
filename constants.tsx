import {
  LayoutDashboard,
  Settings,
  Smartphone,
  Layers,
  ShoppingBag,
  Package,
  CreditCard,
  FileText,
  Users,
  Box,
  Ticket
} from 'lucide-react';
import { MenuItem } from './types';

export const APP_NAME = "云商智汇 SAAS";

export const MENU_ITEMS: MenuItem[] = [
  {
    id: 'home',
    title: '首页概览',
    icon: LayoutDashboard,
    path: '/dashboard'
  },
  {
    id: 'system',
    title: '系统管理',
    icon: Settings,
    children: [
      { id: 'sys-role', title: '角色管理', path: '/system/roles' },
      { id: 'sys-staff', title: '员工管理', path: '/system/staff' },
      { id: 'sys-customer', title: '客户管理', path: '/system/customers' },
      { id: 'sys-params', title: '系统参数配置', path: '/system/params' },
      { id: 'sys-verify', title: '验证码管理', path: '/system/verify-codes' },
      { id: 'sys-skin', title: '微信皮肤配置', path: '/system/wechat-skin' },
      { id: 'sys-dynamic', title: '小程序动态配置', path: '/system/mini-dynamic' },
      { id: 'sys-export', title: '导出文档下载', path: '/system/exports' },
    ]
  },
  {
    id: 'homepage',
    title: '首页管理',
    icon: Smartphone,
    children: [
      { id: 'hp-splash', title: '开屏广告配置', path: '/homepage/splash' },
      { id: 'hp-config', title: '小程序首页配置', path: '/homepage/config' },
      { id: 'hp-waterfall', title: '首页瀑布流配置', path: '/homepage/waterfall' },
      { id: 'hp-hot', title: '热门搜索', path: '/homepage/hot-search' },
      { id: 'hp-recommend', title: '商品推荐', path: '/homepage/recommend' },
      { id: 'hp-flash', title: '秒杀UI配置', path: '/homepage/flash-ui' },
    ]
  },
  {
    id: 'subpage',
    title: '子页管理',
    icon: Layers,
    children: [
      { id: 'sp-comp', title: '二级页组件', path: '/subpage/components' },
      { id: 'sp-manage', title: '二级页管理', path: '/subpage/management' },
      { id: 'sp-ads', title: '个人中心轮播广告', path: '/subpage/profile-ads' },
      { id: 'sp-lottery', title: '抽奖活动', path: '/subpage/lottery' },
    ]
  },
  {
    id: 'order',
    title: '订单管理',
    icon: FileText,
    children: [
      { id: 'ord-list', title: '订单管理', path: '/orders/list' },
      { id: 'ord-refund', title: '退款记录', path: '/orders/refunds' },
      { id: 'ord-query', title: '订单查询', path: '/orders/query' },
      { id: 'ord-pay', title: '支付查询', path: '/orders/payments' },
      { id: 'ord-after', title: '售后退款', path: '/orders/after-sales' },
      { id: 'ord-pre', title: '售前退款', path: '/orders/pre-sales' },
    ]
  },
  {
    id: 'product',
    title: '商品管理',
    icon: ShoppingBag,
    children: [
      { id: 'prod-cat', title: '商品分类管理', path: '/product/categories' },
      { id: 'prod-arch', title: '商品档案管理', path: '/product/archives' },
      { id: 'prod-svc', title: '商品服务标签', path: '/product/services' },
      { id: 'prod-flash', title: '秒杀商品管理', path: '/product/flash-sales' },
      { id: 'prod-promo', title: '商品推广标签', path: '/product/promotions' },
      { id: 'prod-map', title: '分类对照管理', path: '/product/mapping' },
      { id: 'prod-group', title: '团购商品管理', path: '/product/group-buy' },
      { id: 'prod-black', title: '商品黑名单', path: '/product/blacklist' },
      { id: 'prod-rank', title: '商品排行设置', path: '/product/rankings' },
    ]
  },
  {
    id: 'prod-info',
    title: '商品信息管理',
    icon: Box,
    children: [
      { id: 'pi-new', title: '新品上架审核', path: '/product-info/new-audit' },
      { id: 'pi-edit', title: '商品信息修改审核', path: '/product-info/edit-audit' },
      { id: 'pi-price', title: '商品改价审核', path: '/product-info/price-audit' },
    ]
  },
  {
    id: 'card',
    title: '制卡管理',
    icon: CreditCard,
    children: [
      { id: 'card-list', title: '卡管理', path: '/cards/list' },
      { id: 'card-detail', title: '卡明细查询', path: '/cards/details' },
      { id: 'card-merch', title: '商户卡', path: '/cards/merchant' },
      { id: 'card-valid', title: '提货券有效期修改记录', path: '/cards/validity-logs' },
      { id: 'card-rule', title: '卡规则管理', path: '/cards/rules' },
    ]
  },
  {
    id: 'supplier',
    title: '供应商对账',
    icon: Users,
    children: [
      { id: 'sup-audit', title: '对账单审核', path: '/supplier/audit' },
      { id: 'sup-query', title: '对账单查询', path: '/supplier/query' },
    ]
  },
];
